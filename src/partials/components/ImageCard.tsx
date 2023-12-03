import { Card, CardContent } from "@/components/ui/card";

type ProfileCardProps = {
  name: string;
  photoUrl: string;
};

function ImageCard({ name, photoUrl }: ProfileCardProps) {
  return (
    <>
      <div className={`card-container`}>
        <Card className="cursor-pointer flex flex-col justify-between border-none ">
          <CardContent className="p-0">
            <img
              className="object-cover w-[300px] h-[300px] hover:scale-105 transition rounded-2xl"
              loading="lazy"
              src={photoUrl}
            />
          </CardContent>
        </Card>
        <div className="text-[#222222] mt-3">
          <p className="text-md font-semibold">{name}</p>
        </div>
      </div>
    </>
  );
}

export default ImageCard;
