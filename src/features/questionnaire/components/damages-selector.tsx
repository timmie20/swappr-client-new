"use client";

import React, { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";

import useMeasure from "react-use-measure";
import Selector from "./selector";
import { useQuestionStore } from "@/store/question-store";

export default function DamagesSelector() {
  const currentQuestion = useQuestionStore((s) => s.currentQuestion);
  const filter = false; // Filter functionality is disabled

  const options =
    currentQuestion?.options?.reduce<Record<string, boolean>>(
      (acc, option) => ({
        ...acc,
        [option.text]: false,
      }),
      {},
    ) || {};

  const [values, setValues] = useState<Record<string, boolean>>(options);

  const [ref, { height }] = useMeasure();

  return (
    <div className="w-full">
      <MotionConfig
        transition={{
          duration: 0.7,
          type: "spring",
          bounce: filter ? 0 : undefined,
        }}
      >
        <motion.div
          initial={{ height: "auto" }}
          animate={{ height: height > 0 ? height : undefined }}
        >
          <motion.ul
            ref={ref}
            className="mt-4 flex w-full flex-wrap items-center justify-center gap-3 px-2"
          >
            <LayoutGroup>
              <AnimatePresence initial={false} mode="popLayout">
                {Object.entries(values)
                  .filter(([, value]) => !filter || value)
                  .map(([key, value]) => (
                    <Selector
                      key={key}
                      component={key}
                      isSelected={value}
                      setValues={setValues}
                      filter={filter}
                    />
                  ))}
              </AnimatePresence>
            </LayoutGroup>
          </motion.ul>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
