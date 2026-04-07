"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckSquare, Square, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StepAgreementProps {
  onNext: () => void;
}

const requirements = [
  "Valid CAC (Corporate Affairs Commission) business registration",
  "Sell tech gadgets only — phones, tablets, accessories, etc.",
  "Business must be located in Lagos, Nigeria",
  "Must have a physical store or verifiable business address",
];

const whatYouNeed = [
  "Your CAC-registered business name and RC number",
  "Your business address, contact number and other relevant details",
  "A valid email address and secure password for your vendor account",
];

const nextSteps = [
  "Verify your business CAC (Corporate Affairs Commission) certificate",
  "Verify your government-issued ID (NIN, Driver's License, Voter's Card, or Passport)",
  "Upload 2–5 clear photos of your store or business premises",
];

const terms = [
  "7% commission is charged only on successfully completed sales",
  "All payments are processed through Swappr's secure escrow system",
  "You must maintain accurate, up-to-date product listings at all times",
  "Swappr reserves the right to suspend accounts that violate platform policies",
];

interface SectionProps {
  title: string;
  items: string[];
  accent?: "blue" | "orange";
}

function Section({ title, items, accent = "blue" }: SectionProps) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <span
              className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                accent === "orange" ? "bg-orange-400" : "bg-blue-500"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StepAgreement({ onNext }: StepAgreementProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">
            Please read through the requirements before continuing
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Scrollable content */}
          <div className="flex max-h-85 flex-col gap-6 overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible">
            <Section title="Eligibility Requirements" items={requirements} />
            <Section title="What You'll Need to Apply" items={whatYouNeed} />
            <Section
              title="After Your Application — Next Steps"
              items={nextSteps}
              accent="orange"
            />
            <Section title="Terms & Conditions" items={terms} />
          </div>

          {/* Agreement checkbox */}
          <button
            type="button"
            onClick={() => setAgreed((v) => !v)}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition-colors hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            aria-pressed={agreed}
            aria-label="I have read and agree to the vendor terms and conditions"
          >
            <span className="mt-0.5 shrink-0 text-blue-500">
              {agreed ? (
                <CheckSquare size={18} />
              ) : (
                <Square size={18} className="text-gray-400" />
              )}
            </span>
            <span className="text-sm text-gray-700">
              I have read and agree to the{" "}
              <span className="font-medium text-blue-600">
                vendor terms and conditions
              </span>
              , and confirm that I meet the eligibility requirements.
            </span>
          </button>

          <Button
            type="button"
            size="lg"
            disabled={!agreed}
            onClick={onNext}
            className="w-full gap-2 rounded-full"
          >
            Continue
            <ArrowRight size={16} />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
