import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-32 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        <div className="space-y-6">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        <div className="mt-8 text-center space-y-2">
          <Skeleton className="h-4 w-60 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}
