// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   AnimatePresence,
//   LayoutGroup,
//   MotionConfig,
//   motion,
// } from "motion/react";

// import useMeasure from "react-use-measure";
// import Selector from "./selector";
// import { useQuestionStore } from "@/store/question-store";

// export default function DamagesSelector() {
//   const currentQuestion = useQuestionStore((s) => s.currentQuestion);
//   const setAnswer = useQuestionStore((s) => s.setAnswer);
//   const answers = useQuestionStore((s) => s.answers);
//   const filter = false; // Filter functionality is disabled

//   // Initialize values from saved answer or default to false
//   const initialValues = useMemo(() => {
//     const options =
//       currentQuestion?.options?.reduce<Record<string, boolean>>(
//         (acc, option) => ({
//           ...acc,
//           [option.text]: false,
//         }),
//         {},
//       ) || {};

//     // Load saved answer if exists
//     if (currentQuestion?.id && answers[currentQuestion.id]) {
//       try {
//         const savedAnswer = JSON.parse(answers[currentQuestion.id]);
//         if (Array.isArray(savedAnswer)) {
//           const loadedValues: Record<string, boolean> = { ...options };
//           savedAnswer.forEach((optionId: string) => {
//             const option = currentQuestion.options?.find(
//               (o) => o.id === optionId,
//             );
//             if (option) {
//               loadedValues[option.text] = true;
//             }
//           });
//           return loadedValues;
//         }
//       } catch {
//         // If parsing fails, return default options
//       }
//     }

//     return options;
//   }, [currentQuestion?.id, currentQuestion?.options, answers]);

//   const [values, setValues] = useState<Record<string, boolean>>(initialValues);

//   // Reset values when question changes
//   useEffect(() => {
//     setValues(initialValues);
//   }, [initialValues]);

//   // Save to store whenever values change
//   useEffect(() => {
//     if (!currentQuestion?.id || !currentQuestion.options) return;

//     // Get selected option IDs
//     const selectedOptions = Object.entries(values)
//       .filter(([, isSelected]) => isSelected)
//       .map(([text]) => {
//         const option = currentQuestion.options?.find((o) => o.text === text);
//         return option?.id;
//       })
//       .filter(Boolean) as string[];

//     // Save as JSON string (consistent with multiple type)
//     if (selectedOptions.length > 0) {
//       setAnswer(currentQuestion.id, JSON.stringify(selectedOptions));
//     }
//   }, [values, currentQuestion?.id, currentQuestion?.options, setAnswer]);

//   const [ref, { height }] = useMeasure();

//   return (
//     <div className="w-full">
//       <MotionConfig
//         transition={{
//           duration: 0.7,
//           type: "spring",
//           bounce: filter ? 0 : undefined,
//         }}
//       >
//         <motion.div
//           initial={{ height: "auto" }}
//           animate={{ height: height > 0 ? height : undefined }}
//         >
//           <motion.ul
//             ref={ref}
//             className="mt-4 flex w-full flex-wrap items-center justify-center gap-3 px-2"
//           >
//             <LayoutGroup>
//               <AnimatePresence initial={false} mode="popLayout">
//                 {Object.entries(values)
//                   .filter(([, value]) => !filter || value)
//                   .map(([key, value]) => (
//                     <Selector
//                       key={key}
//                       component={key}
//                       isSelected={value}
//                       setValues={setValues}
//                       filter={filter}
//                     />
//                   ))}
//               </AnimatePresence>
//             </LayoutGroup>
//           </motion.ul>
//         </motion.div>
//       </MotionConfig>
//     </div>
//   );
// }

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
  const setAnswer = useQuestionStore((s) => s.setAnswer);
  const removeAnswer = useQuestionStore((s) => s.removeAnswer);
  const getAnswersForQuestion = useQuestionStore(
    (s) => s.getAnswersForQuestion,
  );

  // Initialize from saved answers (runs once per question due to key prop)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    if (!currentQuestion?.id) return new Set<string>();
    const savedAnswers = getAnswersForQuestion(currentQuestion.id);
    return new Set(savedAnswers);
  });

  const toggleOption = (optionId: string) => {
    if (!currentQuestion?.id) return;

    if (selectedIds.has(optionId)) {
      // Remove selection
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(optionId);
        return newSet;
      });
      removeAnswer(currentQuestion.id, optionId);
    } else {
      // Add selection
      setSelectedIds((prev) => new Set(prev).add(optionId));
      setAnswer(currentQuestion.id, optionId);
    }
  };

  const [ref, { height }] = useMeasure();

  return (
    <div className="w-full">
      <MotionConfig
        transition={{
          duration: 0.7,
          type: "spring",
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
                {currentQuestion?.options?.map((option) => (
                  <Selector
                    key={option.id}
                    component={option.text}
                    isSelected={selectedIds.has(option.id)}
                    onToggle={() => toggleOption(option.id)}
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
