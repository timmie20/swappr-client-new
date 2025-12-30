"use client";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { OAuthStrategy } from "@clerk/types";

export function GoogleSignInButton() {
  const { signUp } = useSignUp();

  if (!signUp) return null;

  const signInWith = async (strategy: OAuthStrategy) => {
    await signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/auth/sign-in/sso-callback", // ✅ Correct
      redirectUrlComplete: "/auth/sign-in/callback", // ✅ Change to your callback page
    });
  };

  return (
    <Button onClick={() => signInWith("oauth_google")}>
      Continue with Google
    </Button>
  );
}
