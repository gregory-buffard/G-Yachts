import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchGallery } from "@/actions/yachts";
import { Badge } from "@nextui-org/react";

const Gallery = ({
  data,
}: {
  data: { photos: string[]; featured: boolean };
}) => {
  const { id } = useParams(),
    [featured, setFeatured] = useState<string | null>(null);

  useEffect(() => {
    if (data.featured) {
      fetchGallery({ type: "sales", id: `${id}`, query: "featured" })
        .then((d) => setFeatured(d[0]))
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  useEffect(() => {
    console.log(featured);
  }, [featured]);

  return (
    <section
      className={
        "absolute inset-0 h-max bg-neutral-100 z-50 overflow-y-auto containerize grid grid-cols-2 gap-[2vw]"
      }
    >
      {data.photos.map((image, _) => (
        <Badge
          key={`${image}`}
          isInvisible={image !== featured}
          shape={"rectangle"}
        >
          <button
            className={"size-[45vw] bg-cover bg-center rounded-3xl"}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></button>
        </Badge>
      ))}
    </section>
  );
};

export default Gallery;
