import React, { type Dispatch, type SetStateAction } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DamagesType } from "@/types";
import { IconCheck } from "@tabler/icons-react";

export default function Selector({
  component,
  setValues,
  isSelected,
  filter,
}: {
  component: string;
  setValues: Dispatch<SetStateAction<DamagesType>>;
  isSelected: boolean;
  filter: boolean;
}) {
  const onClickHandler = () => {
    if (!filter) {
      setValues((prev) => ({ ...prev, [component]: !isSelected }));
    }
  };

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <motion.button
        layout
        className={cn(
          "border-input bg-gray-light flex h-13 cursor-pointer items-center gap-2 border px-4 text-[15px] font-medium text-slate-500 sm:h-[54px] sm:text-lg",
          isSelected
            ? "border-tertiary text-tertiary border-2"
            : "hover:bg-accent hover:text-accent-foreground",
        )}
        style={{ borderRadius: 9999 }}
        onClick={onClickHandler}
      >
        <motion.span layout className="inline-block">
          {component}
        </motion.span>

        {isSelected && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <IconCheck />
          </motion.span>
        )}
      </motion.button>
    </motion.li>
  );
}
