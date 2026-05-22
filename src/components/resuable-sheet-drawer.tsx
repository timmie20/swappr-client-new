import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type Props = {
  title: string | React.ReactNode;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  showCloseButton?: boolean;
  direction?: "top" | "bottom" | "left" | "right";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ReusableSheetDrawer({
  title,
  description,
  trigger,
  children,
  showCloseButton = true,
  direction = "right",
  isOpen,
  onOpenChange,
}: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        side={direction}
        showCloseButton={showCloseButton}
        className="w-full! sm:max-w-md!"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
