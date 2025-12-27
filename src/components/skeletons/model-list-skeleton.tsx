import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ModelsListSkeleton() {
  return (
    <>
      <div className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="text-base">
            <CardHeader className="">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full rounded-4xl" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
