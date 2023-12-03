import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "IGotYou - About us";
  }, []);

  return (
    <div className="text-[#222222] pt-2">
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-6 px-12 mt-8">
        <h1 className="font-bold text-2xl text-[#222222]">About us,</h1>
        <div className="text-sm font-medium flex flex-col gap-3 w-[820px]">
          <p>
            At IGotYou, we believe that creativity knows no bounds, and artistic
            expression should be accessible to all. Our platform was born out of
            a passion for connecting people with talented multimedia artists and
            making the extraordinary achievable.
          </p>
          <p>
            {" "}
            Our mission is simple: to bridge the gap between customers seeking
            top-notch multimedia services and the artists who bring those
            visions to life. We've curated a diverse and dynamic community of
            photographers, videographers, graphic designers, and more, all
            sharing a common dedication to their craft and a commitment to
            turning your ideas into reality.
          </p>
          <p>
            What sets IGotYou apart is our belief in collaboration. We don't
            just facilitate transactions; we foster connections that inspire and
            create unforgettable moments. Whether you're a customer with a
            vision or an artist with a passion, IGotYou is the place where
            dreams become art and art becomes reality. Join us on this creative
            journey, and together, we'll redefine what's possible. Welcome to
            IGotYou, where innovation meets imagination.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
