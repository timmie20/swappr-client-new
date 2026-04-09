"use client";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

interface GoogleSignUpButtonProps {
  redirect?: string;
}

export function GoogleSignUpButton({ redirect }: GoogleSignUpButtonProps = {}) {
  const [initiate, setInitiate] = useState(false);

  const signUpWithGoogle = async () => {
    try {
      setInitiate(true);
      // Redirect to backend Google OAuth endpoint
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      const url = new URL(`${apiUrl}/auth/google`);
      if (redirect) url.searchParams.set("redirect", redirect);
      window.location.href = url.toString();
    } catch (error) {
      console.error("Google OAuth error:", error);
      setInitiate(false);
    }
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold text-black uppercase transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-[0px] disabled:hover:translate-y-[0px] disabled:hover:rounded-2xl disabled:hover:shadow-none"
      onClick={signUpWithGoogle}
      disabled={initiate}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        width="30"
        viewBox="0 0 640 640"
      >
        <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
      </svg>

      {initiate ? (
        <>
          <Spinner /> <span className="ml-2">Please wait...</span>
        </>
      ) : (
        "Continue with Google"
      )}
    </button>
  );
}
