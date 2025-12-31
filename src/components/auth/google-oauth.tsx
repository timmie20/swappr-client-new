"use client";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { OAuthStrategy } from "@clerk/types";

export function GoogleSignUpButton() {
  const { signUp } = useSignUp();

  if (!signUp) return null;

  const signUpWith = async (strategy: OAuthStrategy) => {
    await signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/auth/sign-up/sso-callback", // ✅ Correct
      redirectUrlComplete: "/auth/sign-up/callback", // ✅ Change to your callback page
    });
  };

  return (
    <Button
      onClick={() => signUpWith("oauth_google")}
      className="w-full"
      variant="outline"
      size="lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        width="30"
        viewBox="0 0 640 640"
      >
        <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
      </svg>
      Continue with Google
    </Button>
  );
}
