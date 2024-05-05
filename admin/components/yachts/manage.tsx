"use client";

import Link from "next/link";
import { IYacht } from "@/types/yacht";
import { ObjectId } from "mongoose";
import { Button, Chip } from "@nextui-org/react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { flatten } from "lottie-colorify";
import context from "@/public/assets/UI/context.json";
import { useRef } from "react";

interface IManage
  extends Pick<
    IYacht,
    "name" | "price" | "builder" | "yearBuilt" | "featured"
  > {
  _id: ObjectId;
}

const Manage = ({ data }: { data: IManage }) => {
  const contextRef = useRef<LottieRefCurrentProps>(null);
  return (
    <Link
      href={`/${data._id}`}
      className={
        "w-full px-[4vw] py-[0.5vh] flex justify-between items-center bg-neutral-200 rounded-2xl lg:hover:scale-95 transition-transform duration-200 ease-in-out"
      }
    >
      <div className={"flex justify-start items-center gap-[2vw]"}>
        <p>{`${data.name}`}</p>
        {data.featured ? (
          <Chip
            color={"warning"}
            variant={"flat"}
            className={"w-[8vw] p-0 fill-amber-500"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 72 72"
              className={"size-full"}
            >
              <path d="M 36 13 C 32.134 13 29 16.134 29 20 C 29 22.146277 29.967419 24.065556 31.488281 25.349609 L 26.412109 32.123047 C 26.113109 32.522047 25.565906 32.641391 25.128906 32.400391 L 20.908203 30.074219 C 20.962494 29.722905 21 29.366519 21 29 C 21 25.134 17.866 22 14 22 C 10.134 22 7 25.134 7 29 C 7 32.11539 9.0362443 34.752433 11.849609 35.660156 L 14.669922 46 L 57.330078 46 L 60.150391 35.660156 C 62.963756 34.752433 65 32.11539 65 29 C 65 25.134 61.866 22 58 22 C 54.134 22 51 25.134 51 29 C 51 29.366519 51.037506 29.722905 51.091797 30.074219 L 46.871094 32.400391 C 46.434094 32.641391 45.888844 32.522047 45.589844 32.123047 L 40.511719 25.349609 C 42.032581 24.065556 43 22.146277 43 20 C 43 16.134 39.866 13 36 13 z M 15.769531 50 L 16.140625 51.369141 C 17.200625 55.269141 20.770312 58 24.820312 58 L 47.179688 58 C 51.229687 58 54.799375 55.269141 55.859375 51.369141 L 56.230469 50 L 15.769531 50 z"></path>
            </svg>
          </Chip>
        ) : null}
      </div>
      <Button
        isIconOnly={true}
        variant={"light"}
        className={""}
        onMouseEnter={() => {
          const ref = contextRef.current!;
          ref.setSpeed(2);
          ref.play();
          setTimeout(() => ref.stop(), 600);
        }}
      >
        <Lottie
          lottieRef={contextRef}
          loop={false}
          autoplay={false}
          animationData={flatten([115, 115, 115], context)}
          className={"size-[1.5rem]"}
        />
      </Button>
    </Link>
  );
};

export default Manage;
