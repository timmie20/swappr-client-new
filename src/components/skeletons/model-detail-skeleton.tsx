import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function ModelDetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Skeleton className="h-4 w-32" />
      </div>

      <Card className="text-base">
        <CardHeader>
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Skeleton className="mb-3 h-4 w-48" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>

          <div>
            <Skeleton className="mb-3 h-4 w-36" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>

        <CardFooter>
          <Skeleton className="h-10 w-full rounded-4xl" />
        </CardFooter>
      </Card>
    </div>
  );
}
