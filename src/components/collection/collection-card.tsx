import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TypographyH3 } from "../typography/h3";
import { TypographyMuted } from "../typography/muted";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Collection } from "@/types/collections";
import Link from "next/link";

type CardType = {
  item: Collection;
};

export default function CollectionCard({ item }: CardType) {
  return (
    <Card className="relative overflow-hidden pb-0">
      <CardHeader>
        <Badge className="text-small w-fit font-normal text-white uppercase">
          {item.badge}
        </Badge>
        <CardTitle>
          <TypographyH3>{item.name}</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyMuted>{item.description}</TypographyMuted>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Link href={`/collections/${item.slug}`}>
          <button className="text-yellow-dark cursor-pointer text-base font-medium underline">
            View Collection
          </button>
        </Link>

        <div className="mt-4 flex justify-end">
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={400}
            className="translate-y-6 object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
}
