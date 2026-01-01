import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function GhostLoading() {
  return (
    <div className="my-10 flex flex-col items-center text-center text-gray-500">
      <DotLottieReact
        src="https://lottie.host/16c76125-7858-408f-9fd5-ef5c35e9b36c/o8lccUwnQh.lottie"
        loop
        autoplay
        className="h-48"
      />
      <p className="text-sm">No models available for this brand</p>
    </div>
  );
}
