import { Suspense } from "react";
import OAuthCallbackPage from "@/components/auth/app-callback";

function CallbackContent() {
  return <OAuthCallbackPage />;
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
