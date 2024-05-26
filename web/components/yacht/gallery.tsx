import Image from "next/image";
import { useYacht } from "@/context/yacht";
import { useParams } from "next/navigation";
import { useState } from "react";

const Gallery = ({
  current,
}: {
  current?: (typeof yacht.photos.gallery)[number] | null;
}) => {
  const { yacht, changeView } = useYacht(),
    params = useParams(),
    [selected, setSelected] = useState<typeof current>(current);

  return (
    <section
      className={
        "w-full h-[100dvh] bg-white fixed inset-0 z-50 flex flex-col justify-start items-center pb-[1vw]"
      }
    >
      <div className={"containerize py-[2vh] flex justify-end items-center"}>
        <button type={"button"} onClick={() => changeView("info")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
            className={
              "lg:size-[1.5vw] size-[3vh] hover:rotate-90 transition-transform duration-200 ease-in-out"
            }
          >
            <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
          </svg>
        </button>
      </div>
      <div
        className={
          "w-full px-[1vw] grid grid-cols-2 gap-[1vw] overflow-y-scroll"
        }
      >
        {yacht.photos.gallery.map((photo) => (
          <Image
            key={photo}
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_API}/images/yachts/${params.id}/${photo}`}
            alt={yacht.name}
            className={"w-[49vw] h-[49vw] object-cover object-center"}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
