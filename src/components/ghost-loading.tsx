import { Lottie } from "./lottie";
import ghost from "@/lottie/ghost.json";

export default function GhostLoading({ desc }: { desc?: string }) {
  return (
    <div className="flex flex-col items-center text-center text-gray-500">
      <Lottie animationData={ghost} loop autoPlay className="size-40" />
      {desc && <p className="text-sm">{desc}</p>}
    </div>
  );
}
