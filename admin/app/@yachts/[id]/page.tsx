import { Photos } from "@/components/yachts/widgets";
import { fetchYacht } from "@/actions/yachts";
import { YachtProvider } from "@/context/yacht";

const Yacht = async ({ params }: { params: { id: string } }) => {
  const yacht = await fetchYacht({ id: params.id });

  return (
    <section
      className={
        "containerize h-screen flex flex-col lg:flex-row lg:justify-start lg:items-start justify-center items-start gap-[2vh]"
      }
    >
      <YachtProvider yacht={yacht}>
        <Photos />
      </YachtProvider>
    </section>
  );
};

export default Yacht;
