import { SignIn } from "@clerk/nextjs";

export default function SignInView() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <SignIn />
    </div>
  );
}
