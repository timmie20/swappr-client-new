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
import { useDebouncedProductSearch } from "@/hooks";
import Image from "next/image";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import Link from "next/link";
import {
  SEARCH_COLLECTION_BADGES,
  formatCollectionLabel,
} from "@/lib/search-collections";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchDialog({ open, onOpenChange }: DialogProps) {
  const router = useRouter();
  const { inputValue, setInputValue, results, isLoading, reset } =
    useDebouncedProductSearch();

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) reset();
  };

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange}>
      <Command className="min-w-full rounded-lg border" value={inputValue}>
        <div className="relative">
          <CommandInput
            placeholder="Search Product"
            value={inputValue}
            onValueChange={setInputValue}
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
              {SEARCH_COLLECTION_BADGES.map((cat) => (
                <Link key={cat} href={`/collections/${cat}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer px-3 py-1"
                  >
                    {formatCollectionLabel(cat)}
                  </Badge>
                </Link>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
