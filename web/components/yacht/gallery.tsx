import Image from "next/image";
import { useYacht } from "@/context/yacht";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { replaceColor } from "lottie-colorify";
import galleryView from "@/public/imagery/optimized/yacht/gallery.json";
import { IYacht } from "@/types/yacht";

type TCarousel = {
  slides: IYacht["photos"]["gallery"];
  options?: EmblaOptionsType;
};

type TThumbnail = {
  selected: boolean;
  index: number;
  onClick: () => void;
};

const Thumb: React.FC<TThumbnail> = (props) => {
  const { selected, index, onClick } = props;
  const { yacht } = useYacht();
  const params = useParams();

  return (
    <div className={"flex justify-center items-center"}>
      <button
        onClick={onClick}
        type="button"
        className={`w-[24vw] md:w-[16vw] md:h-[16vh] h-[10vh] bg-cover bg-center mx-[0.5vw] ${selected ? "brightness-100 scale-100" : "brightness-50 scale-90"} hover:brightness-100 hover:scale-95 transition-[filter,_transform] duration-200 ease-in-out`}
        style={{
          backgroundImage: `url(${yacht.photos.gallery[index].image.url})`,
        }}
      />
    </div>
  );
};

const EmblaCarousel: React.FC<TCarousel> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, [
    WheelGesturesPlugin(),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
    {
      containScroll: "keepSnaps",
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );
  const params = useParams();

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="w-full flex flex-col justify-center gap-[2vh] overflow-clip">
      <div className="w-full" ref={emblaMainRef}>
        <div className="flex justify-start items-center w-full md:h-[64vh]">
          {slides.map((index) => (
            <Image
              key={index.image.url}
              width={500}
              height={500}
              src={`${index.image.url}`}
              alt={index.image.alt}
              className={"cursor-grab mx-[1vw] h-full w-auto"}
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex">
          {slides.map((_, i) => (
            <Thumb
              key={i}
              onClick={() => onThumbClick(i)}
              selected={i === selectedIndex}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Gallery = ({
  current,
  setCurrent,
}: {
  current: number | null;
  setCurrent: (current: number | null) => void;
}) => {
  const { yacht, changeView, view } = useYacht(),
    params = useParams(),
    lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <AnimatePresence mode={"sync"}>
      {view === "gallery" && current === null && (
        <motion.section
          key={"gallery"}
          initial={{ y: "100%" }}
          animate={{ y: "0" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={
            "w-full h-[100dvh] bg-white fixed inset-0 z-50 flex flex-col justify-start items-center pb-[1vw]"
          }
        >
          <div className={"w-[98vw] py-[3vh] flex justify-end items-center"}>
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
              "w-full px-[1vw] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1vw] overflow-y-scroll"
            }
          >
            {yacht.photos.gallery.map((photo, i) => (
              <Image
                key={i}
                onClick={() => setCurrent(i)}
                width={photo.image.width}
                height={photo.image.height}
                src={`${photo.image.url}`}
                alt={photo.image.alt}
                className={
                  "size-[49vw] md:size-[24vw] lg:size-[16vw] object-cover object-center hover:scale-95 transition-transform duration-200 ease-in-out hover:cursor-pointer"
                }
              />
            ))}
          </div>
        </motion.section>
      )}
      {view === "gallery" && current !== null && (
        <motion.section
          key={"photo"}
          initial={{ x: "100%" }}
          animate={{ x: "0" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={
            "w-full h-screen bg-black/75 backdrop-blur-2xl fixed inset-0 z-50 flex flex-col justify-center items-center"
          }
        >
          <div
            className={
              "absolute top-[2vh] containerize flex justify-between items-center"
            }
          >
            <Lottie
              onClick={() => setCurrent(null)}
              lottieRef={lottieRef}
              onMouseEnter={() => {
                lottieRef.current?.setSpeed(3);
                lottieRef.current?.play();
              }}
              onMouseLeave={() => lottieRef.current?.stop()}
              className={"size-[4vh] cursor-pointer"}
              autoplay={false}
              loop={false}
              animationData={replaceColor("#000000", "#FFFFFF", galleryView)}
            />
            <button
              type={"button"}
              onClick={() => {
                setCurrent(null);
                changeView("info");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 64 64"
                className={
                  "size-[4vh] hover:rotate-90 transition-transform duration-200 ease-in-out fill-white"
                }
              >
                <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
              </svg>
            </button>
          </div>
          <EmblaCarousel
            slides={yacht.photos.gallery}
            options={{ loop: true, startIndex: current }}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Gallery;
