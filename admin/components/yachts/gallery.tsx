import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchGallery, changeFeatured } from "@/actions/yachts";
import {
  Badge,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";

const Card = ({ data }: { data: { photo: string; featured: boolean } }) => {
  const { id } = useParams(),
    [featured, setFeatured] = useState<string | null>(null),
    { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (data.featured) {
      fetchGallery({ type: "sales", id: `${id}`, query: "featured" })
        .then((d) => setFeatured(d[0]))
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  return (
    <form>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={"center"}
        className={"pt-[4vh]"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Image
                  isBlurred={true}
                  className={"w-full h-auto"}
                  src={`http://51.75.16.185/images/yachts/sales/${id}/gallery/${data.photo}`}
                />
              </ModalBody>
              <ModalFooter>
                {data.photo !== featured ? (
                  <Button
                    color={"warning"}
                    variant={"flat"}
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 72 72"
                        className={"size-[1.5rem] fill-amber-500"}
                      >
                        <path d="M 36 13 C 32.134 13 29 16.134 29 20 C 29 22.146277 29.967419 24.065556 31.488281 25.349609 L 26.412109 32.123047 C 26.113109 32.522047 25.565906 32.641391 25.128906 32.400391 L 20.908203 30.074219 C 20.962494 29.722905 21 29.366519 21 29 C 21 25.134 17.866 22 14 22 C 10.134 22 7 25.134 7 29 C 7 32.11539 9.0362443 34.752433 11.849609 35.660156 L 14.669922 46 L 57.330078 46 L 60.150391 35.660156 C 62.963756 34.752433 65 32.11539 65 29 C 65 25.134 61.866 22 58 22 C 54.134 22 51 25.134 51 29 C 51 29.366519 51.037506 29.722905 51.091797 30.074219 L 46.871094 32.400391 C 46.434094 32.641391 45.888844 32.522047 45.589844 32.123047 L 40.511719 25.349609 C 42.032581 24.065556 43 22.146277 43 20 C 43 16.134 39.866 13 36 13 z M 15.769531 50 L 16.140625 51.369141 C 17.200625 55.269141 20.770312 58 24.820312 58 L 47.179688 58 C 51.229687 58 54.799375 55.269141 55.859375 51.369141 L 56.230469 50 L 15.769531 50 z"></path>
                      </svg>
                    }
                  >
                    <p className={"text-amber-500"}>Définir en vedette</p>
                  </Button>
                ) : null}
                <Button
                  color={"danger"}
                  variant={"flat"}
                  onPress={onClose}
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 72 72"
                      className={"size-[1.5rem] fill-red-500"}
                    >
                      <path d="M 32.5 9 C 28.364 9 25 12.364 25 16.5 L 25 18 L 17 18 C 14.791 18 13 19.791 13 22 C 13 24.209 14.791 26 17 26 L 17.232422 26 L 18.671875 51.916016 C 18.923875 56.449016 22.67875 60 27.21875 60 L 44.78125 60 C 49.32125 60 53.076125 56.449016 53.328125 51.916016 L 54.767578 26 L 55 26 C 57.209 26 59 24.209 59 22 C 59 19.791 57.209 18 55 18 L 47 18 L 47 16.5 C 47 12.364 43.636 9 39.5 9 L 32.5 9 z M 32.5 16 L 39.5 16 C 39.775 16 40 16.224 40 16.5 L 40 18 L 32 18 L 32 16.5 C 32 16.224 32.225 16 32.5 16 z M 36 28 C 37.104 28 38 28.896 38 30 L 38 47.923828 C 38 49.028828 37.104 49.923828 36 49.923828 C 34.896 49.923828 34 49.027828 34 47.923828 L 34 30 C 34 28.896 34.896 28 36 28 z M 27.392578 28.001953 C 28.459578 27.979953 29.421937 28.827641 29.460938 29.931641 L 30.085938 47.931641 C 30.123938 49.035641 29.258297 49.959047 28.154297 49.998047 C 28.131297 49.999047 28.108937 50 28.085938 50 C 27.012938 50 26.125891 49.148359 26.087891 48.068359 L 25.462891 30.068359 C 25.424891 28.964359 26.288578 28.040953 27.392578 28.001953 z M 44.607422 28.001953 C 45.711422 28.039953 46.575109 28.964359 46.537109 30.068359 L 45.912109 48.068359 C 45.874109 49.148359 44.986063 50 43.914062 50 C 43.891062 50 43.868703 49.999047 43.845703 49.998047 C 42.741703 49.960047 41.876063 49.035641 41.914062 47.931641 L 42.539062 29.931641 C 42.577062 28.827641 43.518422 27.979953 44.607422 28.001953 z"></path>
                    </svg>
                  }
                >
                  <p className={"text-red-500"}>Effacer</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Badge
        isInvisible={data.photo !== featured}
        shape={"rectangle"}
        color={"warning"}
        variant={"shadow"}
        className={
          "size-[8vw] border-none fill-amber-600 bg-amber-500/50 backdrop-blur-2xl"
        }
        content={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 72 72"
            className={"size-full"}
          >
            <path d="M 36 13 C 32.134 13 29 16.134 29 20 C 29 22.146277 29.967419 24.065556 31.488281 25.349609 L 26.412109 32.123047 C 26.113109 32.522047 25.565906 32.641391 25.128906 32.400391 L 20.908203 30.074219 C 20.962494 29.722905 21 29.366519 21 29 C 21 25.134 17.866 22 14 22 C 10.134 22 7 25.134 7 29 C 7 32.11539 9.0362443 34.752433 11.849609 35.660156 L 14.669922 46 L 57.330078 46 L 60.150391 35.660156 C 62.963756 34.752433 65 32.11539 65 29 C 65 25.134 61.866 22 58 22 C 54.134 22 51 25.134 51 29 C 51 29.366519 51.037506 29.722905 51.091797 30.074219 L 46.871094 32.400391 C 46.434094 32.641391 45.888844 32.522047 45.589844 32.123047 L 40.511719 25.349609 C 42.032581 24.065556 43 22.146277 43 20 C 43 16.134 39.866 13 36 13 z M 15.769531 50 L 16.140625 51.369141 C 17.200625 55.269141 20.770312 58 24.820312 58 L 47.179688 58 C 51.229687 58 54.799375 55.269141 55.859375 51.369141 L 56.230469 50 L 15.769531 50 z"></path>
          </svg>
        }
      >
        <button
          onClick={onOpen}
          className={
            "size-[45vw] bg-cover bg-center rounded-3xl lg:hover:scale-105 transition-transform duration-500 ease-in-out"
          }
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/sales/${id}/gallery/${data.photo})`,
          }}
        ></button>
      </Badge>
    </form>
  );
};

const Gallery = ({
  data,
}: {
  data: { photos: string[]; featured: boolean };
}) => {
  return (
    <section
      className={
        "absolute inset-0 h-max bg-neutral-100 z-50 overflow-y-auto containerize grid grid-cols-2 gap-[2vw]"
      }
    >
      {data.photos.map((photo) => (
        <Card key={photo} data={{ photo: photo, featured: data.featured }} />
      ))}
    </section>
  );
};

export default Gallery;
