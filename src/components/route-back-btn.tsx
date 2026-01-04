import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function GoRack({ handleClick }: { handleClick?: () => void }) {
  const router = useRouter();

  const onClick = () => {
    if (handleClick) {
      handleClick();
    } else {
      router.back();
    }
  };
  return (
    <Button variant="ghost" onClick={onClick} className="mb-4">
      <IconArrowLeft className="h-5 w-5" />
      Back
    </Button>
  );
}
