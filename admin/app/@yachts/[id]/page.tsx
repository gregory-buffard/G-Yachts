import { ObjectId } from "mongoose";
import { Photos } from "@/components/yachts/widgets";
import { fetchGallery, fetchYacht } from "@/actions/yachts";
import { IYacht } from "@/types/yacht";

const Yacht = async ({
  params,
}: {
  params: { id: ObjectId; featured: boolean };
}) => {
  const yacht: IYacht = await fetchYacht({ id: `${params.id}` });

  return (
    <section
      className={
        "containerize h-screen flex flex-col lg:flex-row lg:justify-start lg:items-start justify-center items-start gap-[2vh]"
      }
    >
      <Photos
        gallery={await fetchGallery({ route: `sales/${params.id}/gallery` })}
        featured={yacht.featured}
      />
    </section>
  );
};

export default Yacht;
