import { Featured } from "@/components/dashboard/widgets";

const Dashboard = () => {
  return (
    <section
      className={
        "w-full h-full flex flex-col lg:flex-row lg:justify-start lg:items-start justify-center items-center"
      }
    >
      <div className={"flex justify-center items-center gap-[4vw]"}>
        <Featured />
      </div>
    </section>
  );
};

export default Dashboard;
