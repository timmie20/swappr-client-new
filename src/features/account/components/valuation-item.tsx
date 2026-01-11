import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatNaira } from "@/lib/format";
import { IconEye, IconTrash, IconDeviceMobile } from "@tabler/icons-react";

interface ValuationItemProps {
  valuation: {
    id: string;
    device: {
      brand: string;
      model: string;
      storage: number;
    };
    final_value: number;
    created_at: string;
    status: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "pending":
      return "bg-yellow-light/10 text-yellow-dark border-yellow-light/20";
    case "expired":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function ValuationItem({ valuation }: ValuationItemProps) {
  return (
    <div className="border-border border-b py-2 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        {/* Device Info */}
        <div className="flex flex-1 items-start gap-4">
          <Button size="icon-lg" variant="outline">
            <IconDeviceMobile className="text-app-primary size-6" />
          </Button>

          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-small font-semibold">
                {valuation.device.brand} {valuation.device.model}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {valuation.device.storage}GB
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${getStatusColor(valuation.status)}`}
                >
                  {valuation.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
              <div>
                <span className="text-muted-foreground">Estimated Value:</span>
                <span className="text-primary ml-2 text-lg font-bold">
                  {formatNaira(valuation.final_value)}
                </span>
              </div>
              <span className="text-muted-foreground hidden sm:inline">•</span>
              <span className="text-muted-foreground text-xs">
                {formatDate(valuation.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <IconEye className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-destructive hover:text-destructive-foreground shrink-0"
          >
            <IconTrash className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
