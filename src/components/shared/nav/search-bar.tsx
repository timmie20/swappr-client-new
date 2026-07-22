"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useDebouncedProductSearch } from "@/hooks";
import {
  SEARCH_COLLECTION_BADGES,
  formatCollectionLabel,
} from "@/lib/search-collections";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

export function NavSearchBar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { inputValue, setInputValue, results, isLoading, reset } =
    useDebouncedProductSearch();

  const hasQuery = inputValue.trim().length > 1;

  const close = () => {
    setOpen(false);
    reset();
  };

  const goToProduct = (slug: string) => {
    close();
    router.push(`/products/${slug}`);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) setOpen(true);
        else close();
      }}
    >
      <PopoverAnchor asChild>
        <div className="hidden min-w-40 flex-1 lg:block">
          <div className="relative">
            <Icons.search
              size={17}
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
            />
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search phones, laptops, accessories"
              className="bg-background focus:ring-primary/20 w-full rounded-full border py-2.5 pr-9 pl-10 text-sm outline-none focus:ring-2"
            />
            {isLoading && (
              <Spinner className="absolute top-1/2 right-3.5 -translate-y-1/2 size-4" />
            )}
          </div>
        </div>
      </PopoverAnchor>

      <PopoverContent
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-(--radix-popover-trigger-width) max-h-[70vh] overflow-y-auto p-3"
      >
        {hasQuery && (
          <div className="mb-3">
            <p className="text-muted-foreground mb-1.5 px-1 text-xs font-medium tracking-wide uppercase">
              Products
            </p>
            {results.length === 0 ? (
              <p className="text-muted-foreground px-1 py-3 text-center text-sm">
                {isLoading ? "Searching…" : "No results found."}
              </p>
            ) : (
              <div className="flex flex-col gap-0.5">
                {results.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goToProduct(product.slug)}
                    className="hover:bg-muted flex w-full items-center gap-3 rounded-xl p-2 text-left"
                  >
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.title}
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {product.title}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {product.brand}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <p className="text-muted-foreground mb-1.5 px-1 text-xs font-medium tracking-wide uppercase">
            Search by collections
          </p>
          <div className="flex flex-wrap gap-2 px-1">
            {SEARCH_COLLECTION_BADGES.map((cat) => (
              <Link key={cat} href={`/collections/${cat}`} onClick={close}>
                <Badge variant="outline" className="cursor-pointer px-3 py-1">
                  {formatCollectionLabel(cat)}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
