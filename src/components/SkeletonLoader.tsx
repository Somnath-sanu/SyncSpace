import { Skeleton } from "./ui/skeleton";
import { Squirrel } from 'lucide-react';

export function SkeletonLoader() {
  return (
    <div className="animate-pulse cursor-wait">
      <Skeleton className="col-span-1 aspect-[100/127] min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
      <Squirrel className="size-10 animate-bounce"/>
      </Skeleton>
    </div>
  );
}
