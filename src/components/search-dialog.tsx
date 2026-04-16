"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useProductSearch } from "@/hooks";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import Link from "next/link";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CATEGORY_BADGES = [
  "iphones",
  "androids",
  "ipads",
  "macbooks",
  "laptops",
  "tablets",
  "audios",
  "gaming-consoles",
];

export function SearchDialog({ open, onOpenChange }: DialogProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const router = useRouter();

  // Stable debounced setter across renders (lodash keeps internal timer state)
  const debouncedSetQueryRef = useRef(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 500),
  );

  // Cancel any pending debounce on unmount
  useEffect(() => {
    const debounced = debouncedSetQueryRef.current;
    return () => {
      debounced.cancel();
    };
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    const trimmed = value.trim();
    if (trimmed.length < 2) {
      debouncedSetQueryRef.current.cancel();
      setDebouncedQuery(trimmed);
      return;
    }

    debouncedSetQueryRef.current(trimmed);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      debouncedSetQueryRef.current.cancel();
      setInputValue("");
      setDebouncedQuery("");
    }
  };

  const { data: results = [], isLoading } = useProductSearch(debouncedQuery);

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange}>
      <Command className="min-w-full rounded-lg border" value={inputValue}>
        <div className="relative">
          <CommandInput
            placeholder="Search Product"
            value={inputValue}
            onValueChange={handleInputChange}
          />

          {isLoading && (
            <Spinner className="absolute top-1/2 right-3 -translate-y-1/2" />
          )}
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* <CommandGroup heading="Recently Viewed">
            <CommandItem value="recently-viewed" disabled>
              View your recently viewed products
            </CommandItem>
          </CommandGroup> */}

          <CommandGroup heading="Searched">
            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/products/${product.slug}`)}
              >
                <CommandItem value={`${product.title} ${product.brand}`}>
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="mr-2 rounded-sm object-cover"
                    priority
                  />
                  <span className="truncate">{product.title}</span>
                  <CommandShortcut className="truncate">
                    {product.brand}
                  </CommandShortcut>
                </CommandItem>
              </div>
            ))}
          </CommandGroup>

          <CommandGroup heading="Search by Collections">
            <div className="flex flex-wrap items-center gap-2 px-2 py-1">
              {CATEGORY_BADGES.map((cat) => {
                const label = cat
                  .replace(/-/g, " ")
                  .replace(/^\w/, (c) =>
                    cat.startsWith("i") ? c : c.toUpperCase(),
                  )
                  .replace(/^(i)(\w)/, (_, i, next) => i + next.toUpperCase());

                return (
                  <Link key={cat} href={`/collections/${cat}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer px-3 py-1"
                    >
                      {label}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
