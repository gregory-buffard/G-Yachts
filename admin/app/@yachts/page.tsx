import { fetchYachts } from "@/actions/yachts";
import Manage from "@/components/yachts/manage";

const Yachts = async () => {
  return (
    <section
      className={
        "containerize h-screen flex flex-col lg:flex-row lg:justify-start lg:items-start justify-center items-start gap-[2vh]"
      }
    >
      <h1 className={""}>Liste des yachts</h1>
      <div
        className={
          "w-full max-h-[64vh] overflow-y-auto flex flex-col justify-start items-center gap-[1vh]"
        }
      >
        {await fetchYachts().then((yachts) =>
          yachts.map((yacht, i) => <Manage key={i} data={yacht} />),
        )}
      </div>
    </section>
  );
};

export default Yachts;
