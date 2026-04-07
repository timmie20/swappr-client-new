"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "motion/react";
import { TypographyH1 } from "./typography/h1";
import { TypographyMuted } from "./typography/muted";
import { TypographyP } from "./typography/p";

type MailProps = {
  title: string;
  description: string;
  note?: string;
};

export default function MailSuccess({ title, description, note }: MailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center space-y-4 text-center"
    >
      <DotLottieReact
        src="/assets/icons/sent-message.json"
        loop
        autoplay
        className="size-40"
      />
      <TypographyH1>{title}</TypographyH1>
      <TypographyP className="text-muted-foreground max-w-md">
        {description}
      </TypographyP>
      <TypographyMuted className="text-sm">{note}</TypographyMuted>
    </motion.div>
  );
}
