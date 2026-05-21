// "use client";

// import { useCallback, useState } from "react";
// import { AnimatePresence } from "motion/react";

// import DeliveryDetails from "./delivery-details";
// import Payment from "./payment";
// import { CheckoutProgressIndicator } from "./step-progress";

// export default function Tab() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [direction, setDirection] = useState(1);

//   const goNext = useCallback(() => {
//     setDirection(1);
//     setCurrentStep(2);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const goBack = useCallback(() => {
//     setDirection(-1);
//     setCurrentStep(1);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const stepLabel = currentStep === 1 ? "Delivery & Contact" : "Payment";

//   return (
//     <div className="w-full">
//       <div className="mb-6 flex flex-col gap-1">
//         <p className="text-muted-foreground text-sm" aria-live="polite">
//           Step {currentStep} of 2 —{" "}
//           <span className="text-foreground font-medium">{stepLabel}</span>
//         </p>
//       </div>

//       <CheckoutProgressIndicator currentStep={currentStep} className="mb-6" />

//       <AnimatePresence mode="wait" custom={direction}>
//         {currentStep === 1 && (
//           <DeliveryDetails key="step-1" onNext={goNext} direction={direction} />
//         )}

//         {currentStep === 2 && (
//           <Payment key="step-2" onBack={goBack} direction={direction} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
