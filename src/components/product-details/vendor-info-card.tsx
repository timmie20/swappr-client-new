import { IconShieldCheckFilled, IconStar } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductVendor } from "@/types/product";
import { getInitials } from "@/lib/format";

interface VendorInfoCardProps {
  vendor: ProductVendor;
}

export function VendorInfoCard({ vendor }: VendorInfoCardProps) {
  const initials = getInitials(
    vendor.trading_name || vendor.business_name || "",
  );
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <p className="mb-3 text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase">
          Sold by
        </p>
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
            {initials}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-semibold text-[#1A1A1A]">
                {vendor.trading_name || vendor.business_name}
              </span>
              {vendor.is_verified && (
                <IconShieldCheckFilled
                  size={15}
                  className="text-primary shrink-0"
                />
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-[#6B7280]">
              {vendor.rating > 0 && (
                <span className="flex items-center gap-1">
                  <IconStar size={12} className="text-amber-500" />
                  {vendor.rating.toFixed(1)}
                </span>
              )}
              {!vendor.is_verified && (
                <Badge
                  variant="outline"
                  className="border-amber-300 bg-amber-50 text-[10px] text-amber-600"
                >
                  Unverified
                </Badge>
              )}
            </div>
          </div>

          <Button variant="outline" size="sm" className="shrink-0 rounded-full">
            View Store
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
