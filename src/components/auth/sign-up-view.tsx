import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./sign-up-form";
import { InteractiveGridPattern } from "../interactive-grid";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignUpViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="text-large relative z-20 flex items-center font-medium">
          <h1 className="font-switzer tracking-tight">swappr</h1>{" "}
        </div>
        <InteractiveGridPattern
          className={cn(
            "mask-[radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[0%] h-full skew-y-12",
          )}
        />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Swappr platform aims to create a secure and transparent system for
              buying and swapping phones by implementing a phone rating
              calculator to accurately represent device conditions, addressing
              prevalent fraud in the Nigerian market. The system will utilize
              diagnostic tools, user verification through KYC, and AI-driven
              fraud prevention in future updates.
            </p>
            <footer className="text-sm">Cheers 🍻</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <div className="flex w-full max-w-md flex-col items-center justify-center space-y-6">
          <SignUpForm />
          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="hover:text-primary font-medium underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
