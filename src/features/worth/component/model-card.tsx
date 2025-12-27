import AppleIcon from "@/components/apple-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { formatStorageCapacity, formatNaira } from "@/lib/format";
import { generateModelSlug } from "@/lib/utils";
import { Model } from "@/types/api";
import Link from "next/link";
import React from "react";

export default function ModelCard({ model }: { model: Model }) {
  // Find the variation with the lowest storage capacity
  const lowestVariation = model.variations?.reduce((lowest, current) => {
    if (!lowest || current.storage_capacity < lowest.storage_capacity) {
      return current;
    }
    return lowest;
  });

  const basePrice = lowestVariation?.price;

  // Generate slug from brand and model name, or use existing slug
  const slug =
    model.slug ||
    generateModelSlug(model.brand?.brand_name || "", model.model_name);

  return (
    <Card className="text-base">
      <CardHeader className="">
        <Button variant="outline" size="icon-sm">
          <AppleIcon />
        </Button>
        <CardTitle className="font-switzer text-lg font-bold">
          {model.model_name}
        </CardTitle>
        <CardDescription className="truncate">{model.desc}</CardDescription>
        {basePrice && (
          <CardDescription className="text-muted-foreground text-sm">
            Starting from{" "}
            <span className="text-foreground font-semibold">
              {formatNaira(basePrice)}
            </span>
          </CardDescription>
        )}{" "}
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {model.variations?.map((variation) => (
            <Badge
              key={variation.id}
              variant="outline"
              className="font-semibold"
            >
              {formatStorageCapacity(variation.storage_capacity)}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <CardAction className="w-full">
          <Button className="w-full" asChild>
            <Link href={`/check-worth/${slug}`}>Check worth</Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
