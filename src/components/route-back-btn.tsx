import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function GoRack() {
  const router = useRouter();
  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
      <IconArrowLeft className="h-5 w-5" />
      Back
    </Button>
  );
}
