import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ValuationItem } from "./components/valuation-item";
import { EmptyState } from "@/components/empty-state";
import { IconDeviceMobile } from "@tabler/icons-react";

// Dummy data for valuation history
const dummyValuations = [
  {
    id: "val_001",
    device: {
      brand: "Apple",
      model: "iPhone 15 Pro Max",
      storage: 256,
    },
    final_value: 850000,
    created_at: "2026-01-08T10:30:00Z",
    status: "completed",
  },
  {
    id: "val_002",
    device: {
      brand: "Samsung",
      model: "Galaxy S24 Ultra",
      storage: 512,
    },
    final_value: 720000,
    created_at: "2026-01-07T14:20:00Z",
    status: "completed",
  },
  {
    id: "val_003",
    device: {
      brand: "Apple",
      model: "iPhone 14 Pro",
      storage: 128,
    },
    final_value: 620000,
    created_at: "2026-01-05T09:15:00Z",
    status: "completed",
  },
  {
    id: "val_004",
    device: {
      brand: "Google",
      model: "Pixel 8 Pro",
      storage: 256,
    },
    final_value: 450000,
    created_at: "2026-01-03T16:45:00Z",
    status: "completed",
  },
];

export default function Drafts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Valuation History</CardTitle>
        <CardDescription>
          View and manage your device valuation checks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dummyValuations.length == 0 ? (
            <EmptyState
              icon={<IconDeviceMobile className="size-6" />}
              title="No valuations yet"
              description="Start by checking the worth of your device"
            />
          ) : (
            dummyValuations.map((valuation) => (
              <ValuationItem key={valuation.id} valuation={valuation} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
