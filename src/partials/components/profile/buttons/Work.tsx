import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { WorkSchema, ZodWorkSchema } from "@/zod/workSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BackpackIcon } from "@radix-ui/react-icons";
import { QueryState, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { useParams } from "react-router-dom";

type TData = {
  user: {
    email: string;
    username: string;
    userStatus: string;
    work?: string;
    address?: string;
    funFact?: string;
    school: string;
  };
};

function Work() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<WorkSchema>({
    defaultValues: {
      work: "",
    },
    resolver: zodResolver(ZodWorkSchema),
  });
  const queryClient = useQueryClient();
  const { mutate } = useUpdateUserProfile();
  const { id } = useParams();
  const data = queryClient.getQueryData<QueryState<TData>>(["profile", id]);

  function handleWorkSubmit(data: WorkSchema) {
    mutate({ work: data.work });
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`hover:bg-[#e9e9e9] border w-full font-medium ${
          data?.data?.user.work ? "text-xs" : "text-sm"
        }
           shadow-md flex justify-start items-center pl-4 pr-6 py-8 rounded`}
      >
        <span className="mr-2">
          <BackpackIcon color="black" width={25} height={25} />
        </span>
        <p className="text-zinc-500">
          {data?.data?.user.work
            ? `My work: ${data?.data?.user.work}`
            : "My work"}
        </p>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#222222]">
            {data?.data?.user.work ? "Your current work" : "What's your work?"}
          </DialogTitle>
        </DialogHeader>
        {data?.data?.user.work ? (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">{data?.data?.user.work}</p>
            <div className="flex gap-2 items-center pt-2">
              <Button
                onClick={() => mutate({ work: "" })}
                className="bg-[#222222] text-white font-medium rounded-full"
                size={"lg"}
                variant={"secondary"}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleWorkSubmit)} className="mt-4">
            <Label className="text-sm font-medium" htmlFor="work">
              Your work
            </Label>
            <Input
              {...register("work")}
              type="text"
              id="work"
              className="mb-2"
            />
            {errors.work && <ErrorMessage message={errors.work.message} />}
            <div className="flex gap-2 items-center pt-2">
              <Button
                className="bg-[#222222] text-white font-medium rounded-full"
                size={"lg"}
                variant={"secondary"}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Work;
