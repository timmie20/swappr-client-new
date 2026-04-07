"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessScreenProps {
  applicationId?: string;
}

const nextSteps = [
  {
    icon: Building2,
    label: "Verify your business CAC",
    description:
      "To confirm your business registration, we will use your CAC details (RC Number) to validate your legitimacy and ensure compliance with our platform standards.",
  },
  {
    icon: ShieldCheck,
    label: "Verify your government ID",
    description:
      "Submit a valid NIN, Driver's License, Voter's Card, or International Passport.",
  },
  {
    icon: Camera,
    label: "Upload store photos",
    description:
      "Add 2–5 clear photos of your store or business premises to complete your profile.",
  },
];

export function SuccessScreen({ applicationId }: SuccessScreenProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-6 text-center"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: 0.1,
        }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
      >
        <CheckCircle2 className="text-green-600" size={44} strokeWidth={1.5} />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Vendor Account Created!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          Your account is ready. Complete the steps below to verify your
          business and activate your vendor profile on Swappr.
        </p>
      </div>

      {/* What happens next */}
      <Card className="w-full text-left">
        <CardContent className="flex flex-col gap-4 pt-2">
          <h3 className="text-sm font-semibold text-gray-800">
            Complete your onboarding — next steps
          </h3>
          <p className="text-xs text-gray-500">
            These are required to activate your vendor account and start selling
            on Swappr.
          </p>
          <ol className="flex flex-col gap-4">
            {nextSteps.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <step.icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Application ID */}
          {applicationId && (
            <div className="mt-1 rounded-lg bg-gray-50 px-4 py-2.5 text-xs text-gray-500">
              Application ID:{" "}
              <span className="font-mono font-medium text-gray-700">
                #{applicationId}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        size="lg"
        onClick={() => router.push("/account")}
        className="w-full gap-2 rounded-full"
      >
        <LayoutDashboard size={16} />
        Go to Vendor Dashboard
      </Button>
    </motion.div>
  );
}
