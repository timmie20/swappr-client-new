import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function Selector({
  component,
  isSelected,
  onToggle,
}: {
  component: string;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <motion.span
        layout
        className={cn(
          "border-input bg-gray-light text-small flex h-13 cursor-pointer items-center gap-2 border px-4 font-medium text-slate-500 sm:h-13.5 sm:text-lg",
          isSelected
            ? "border-tertiary text-tertiary border-2"
            : "hover:bg-accent hover:text-accent-foreground",
        )}
        style={{ borderRadius: 9999 }}
        onClick={onToggle}
      >
        <motion.span layout className="inline-block">
          {component}
        </motion.span>

        {isSelected && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Button size="icon-sm" variant="destructive">
              <IconCheck />
            </Button>
          </motion.span>
        )}
      </motion.span>
    </motion.li>
  );
}
