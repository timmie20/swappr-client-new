import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  IconFileDownload,
  IconLayoutBottombarInactive,
  IconChevronUp,
  IconChevronDown,
  IconDeviceMobile,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { formatNaira } from "@/lib/format";
import { ValuationResponse } from "@/types/api";

interface DetailsDrawerProps {
  result: ValuationResponse;
}

export default function DetailsDrawer({ result }: DetailsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          View Details <IconLayoutBottombarInactive />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Valuation Breakdown</DrawerTitle>
            <DrawerDescription>
              Detailed breakdown of your device&apos;s worth calculation
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[50vh] space-y-4 overflow-y-auto px-4 pb-6">
            {/* Device Info */}
            <div className="from-app-primary to-app-secondary relative rounded-xl bg-linear-to-r p-0.5">
              <Card className="bg-background rounded-[10px] p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="from-app-primary/10 to-app-secondary/10 rounded-lg bg-linear-to-r p-2">
                    <IconDeviceMobile className="text-app-primary size-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm font-semibold">
                      Device
                    </p>
                    <p className="font-switzer text-lg font-bold">
                      {result.device.brand} {result.device.model}
                    </p>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {result.device.storage}GB
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Base Price */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Base Price
                </span>
                <span className="font-switzer text-lg font-bold">
                  {formatNaira(result.base_price)}
                </span>
              </div>
              <Separator />
            </div>

            {/* Adjustments */}
            {result.adjustments.length > 0 && (
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm font-semibold">
                  Adjustments
                </p>
                <div className="space-y-2">
                  {result.adjustments.map((adjustment, index) => (
                    <Card
                      key={index}
                      className="p-3"
                      style={{
                        borderLeftColor:
                          adjustment.type === "add"
                            ? "hsl(var(--chart-2))"
                            : "hsl(var(--destructive))",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">
                            {adjustment.question}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {adjustment.answer}
                          </Badge>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {adjustment.type === "add" ? (
                            <IconChevronUp className="text-chart-2 size-4" />
                          ) : (
                            <IconChevronDown className="text-destructive size-4" />
                          )}
                          <span
                            className={`text-sm font-bold ${
                              adjustment.type === "add"
                                ? "text-chart-2"
                                : "text-destructive"
                            }`}
                          >
                            {/* {adjustment.type === "add" ? "+" : "-"} */}
                            {formatNaira(adjustment.impact)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <Card className="bg-muted/30 space-y-3 p-4">
              <p className="text-sm font-semibold">Summary</p>
              <div className="space-y-2 text-sm">
                {result.summary.total_additions >= 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <IconChevronUp className="text-chart-2 size-4" />
                      Total Additions
                    </span>
                    <span className="text-chart-2 font-semibold">
                      +{formatNaira(result.summary.total_additions)}
                    </span>
                  </div>
                )}
                {result.summary.total_deductions <= 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <IconChevronDown className="text-destructive size-4" />
                      Total Deductions
                    </span>
                    <span className="text-destructive font-semibold">
                      {formatNaira(result.summary.total_deductions)}
                    </span>
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold">Final Value</span>
                <span className="text-primary text-xl font-bold">
                  {formatNaira(result.final_value)}
                </span>
              </div>
            </Card>

            {/* Valuation ID */}
            <p className="text-muted-foreground text-center font-mono text-xs">
              ID: {result.valuation_id}
            </p>
          </div>

          <DrawerFooter>
            <Button className="cursor-pointer">
              Download <IconFileDownload />
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
