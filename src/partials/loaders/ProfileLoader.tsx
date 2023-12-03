import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProfileLoader() {
  return (
    <section className="flex gap-24 px-40 mt-14">
      <div className="flex flex-col gap-7 justify-between">
        <Card className="flex flex-col justify-center items-center gap-5 w-[342px] px-28 py-5 shadow-2xl">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </Card>
        <Card className="w-[342px]">
          <CardHeader className="text-[#222222] text-xl font-semibold">
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-[250px]" />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-[700px] shadow-lg">
          <CardHeader className="text-[#222222] text-4xl font-semibold">
            <Skeleton className="h-8 w-[250px]" />
          </CardHeader>
          <CardContent className="text-[#222222] font-medium px-6 py-2">
            <Skeleton className="h-2 w-[650px]" />
            <Skeleton className="mt-2 h-2 w-[50px]" />
          </CardContent>
          <CardFooter className="mt-2 text-[#3c3b3b]">
            <div className="w-full grid grid-cols-2 gap-2 ">
              <Skeleton className="h-12 w-[250px]" />
              <Skeleton className="h-12 w-[250px]" />
              <Skeleton className="h-12 w-[250px]" />
              <Skeleton className="h-12 w-[250px]" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default ProfileLoader;
