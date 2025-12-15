import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { jobDescription, resumeText } = await req.json();

    if (!jobDescription || !resumeText) {
      return new Response(
        JSON.stringify({ error: "Missing jobDescription or resumeText" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing resume generation request...");

    const systemPrompt = `You are an expert resume tailoring AI. Your job is to analyze a job description and a candidate's resume, then generate a tailored version of the resume that:

1. Highlights skills and experience matching the job requirements
2. Uses keywords from the job description for ATS optimization
3. Rewrites experience bullet points to align with job responsibilities
4. Maintains honesty - never fabricate experience or skills
5. Keeps a professional, clean format

You must respond with a JSON object containing:
- jobTitle: The job title from the description
- companyName: The company name if mentioned
- skillMatchScore: A percentage (0-100) indicating how well the resume matches
- matchedSkills: Array of skills from the resume that match the job
- missingSkills: Array of required skills the candidate should develop or highlight differently
- generatedResume: The full tailored resume text in a clean, professional format`;

    const userPrompt = `## Job Description:
${jobDescription}

## Original Resume:
${resumeText}

Please analyze this job description and resume, then generate a tailored resume optimized for this specific position. Return the response as a JSON object.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI response received, parsing...");

    // Try to parse the JSON from the response
    let result;
    try {
      // Find JSON in the response (might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || 
                        content.match(/```\n?([\s\S]*?)\n?```/) ||
                        [null, content];
      const jsonStr = jsonMatch[1] || content;
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // Fallback structure
      result = {
        jobTitle: "Position",
        companyName: null,
        skillMatchScore: 75,
        matchedSkills: ["Experience", "Skills"],
        missingSkills: [],
        generatedResume: content,
      };
    }

    console.log("Resume generation complete");

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in generate-resume function:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate resume";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
