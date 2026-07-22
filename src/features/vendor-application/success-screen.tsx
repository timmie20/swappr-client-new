"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  MailCheck,
  ShieldCheck,
  Building2,
  Store,
  Rocket,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lottie } from "@/components/lottie";
import successCheckAnimation from "@/lottie/success-check.json";

const nextSteps = [
  {
    icon: MailCheck,
    label: "Verify your email, then log in",
    description:
      "We've sent a verification link to your email. Verify it, then log in to unlock your vendor dashboard — the rest of your onboarding happens there.",
  },
  {
    icon: Building2,
    label: "Verify your business",
    description:
      "Enter your CAC registration number (RC, BN, or IT) and we'll confirm it against the CAC registry in real time. Your registered address, state and city are pulled in automatically.",
  },
  {
    icon: ShieldCheck,
    label: "Verify your identity",
    description:
      "Provide your BVN or NIN — whichever you have. The name on it must match the first and last name on your Swappr account.",
  },
  {
    icon: Store,
    label: "Complete your store profile",
    description:
      "Add a store description, confirm your address, add a nearby landmark, set your operating hours and optionally upload a logo. Store photos can be added any time after you go live.",
  },
  {
    icon: Rocket,
    label: "Go live",
    description:
      "Approval is instant once your profile is submitted. You can start listing products, managing inventory, receiving orders and taking swap offers right away.",
  },
];

export function SuccessScreen() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-6 text-center"
    >
      {/* Animated checkmark */}
      <Lottie
        animationData={successCheckAnimation}
        loop
        autoplay
        className="size-24"
      />

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Vendor Account Created!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          You&apos;re not logged in yet — check your inbox for a verification
          email first. Once verified, log in and finish setting up from your
          vendor dashboard.
        </p>
      </div>

      {/* What happens next */}
      <Card className="w-full text-left">
        <CardContent className="flex flex-col gap-4 pt-2">
          <h3 className="text-sm font-semibold text-gray-800">
            What happens next
          </h3>
          <p className="text-xs text-gray-500">
            Onboarding takes just a few minutes and happens inside your vendor
            dashboard. Here&apos;s what Swappr will ask of you:
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
        </CardContent>
      </Card>

      <Button
        size="lg"
        onClick={() => router.push("/sign-in")}
        className="w-full gap-2 rounded-full"
      >
        <LogIn size={16} />
        Continue to Sign In
      </Button>
    </motion.div>
  );
}
