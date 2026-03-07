import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/integrations/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const createProfileInDb = async (userId: string, email: string, name: string) => {
    const userRef = doc(db, "profiles", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        id: userId,
        display_name: name,
        email: email,
        created_at: new Date().toISOString()
      }, { merge: true });
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await createProfileInDb(user.uid, user.email || "", user.displayName || "");

      toast({
        title: "As-salamu alaykum!",
        description: "You have been signed in successfully with Google.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during Google sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update Firebase profile
        await updateProfile(user, { displayName });

        // Create Firestore profile
        await createProfileInDb(user.uid, user.email || "", displayName);

        toast({
          title: "Welcome to The Ummah Lab!",
          description: "Your account has been created successfully.",
        });
        navigate("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);

        toast({
          title: "As-salamu alaykum!",
          description: "You have been signed in successfully.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-display text-3xl">☪</span>
              </div>
              <CardTitle className="font-display text-2xl">
                {isSignUp ? "Create Your Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Begin your spiritual journey with The Ummah Lab"
                  : "Continue your spiritual journey"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required={isSignUp}
                      className="bg-background"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full glow-hover"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : isSignUp
                      ? "Create Account"
                      : "Sign In"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FcGoogle className="w-5 h-5" />
                Google
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-1 text-primary hover:underline font-medium"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
