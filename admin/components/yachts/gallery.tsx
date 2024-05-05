import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchGallery } from "@/actions/yachts";

const Gallery = ({
  data,
}: {
  data: { photos: string[]; featured: boolean };
}) => {
  const { id } = useParams(),
    [featured, setFeatured] = useState<boolean | null>(null);

  useEffect(() => {
    if (data.featured) {
      console.log("CONSOLE ID HERE", id[0]);
      fetchGallery({ type: "sales", id: `${id[0]}`, query: "featured" }).catch(
        (e) => {
          console.error(e);
        },
      );
    }
  }, []);

  return (
    <section className={"absolute inset-0 w-full h-screen bg-neutral-100 z-50"}>
      {data.photos.map((image, _) => (
        <button key={`${image}`}></button>
      ))}
    </section>
  );
};

export default Gallery;
