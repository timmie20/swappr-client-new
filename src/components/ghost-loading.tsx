import { Lottie } from "./lottie";
import ghost from "@/lottie/ghost.json";

export default function GhostLoading({ desc }: { desc?: string }) {
  return (
    <div className="my-10 flex flex-col items-center text-center text-gray-500">
      {/* <DotLottieReact
        src="https://lottie.host/16c76125-7858-408f-9fd5-ef5c35e9b36c/o8lccUwnQh.lottie"
        loop
        autoplay
        className="h-48"
      /> */}
      <Lottie animationData={ghost} loop autoPlay className="size-48" />
      {desc && <p className="text-sm">{desc}</p>}
    </div>
  );
}
