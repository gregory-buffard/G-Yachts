"use server"

import FeaturedContent from "@/components/dashboard/featured";
import AddNew from "@/components/dashboard/addNew";
import {fetchFeatured} from "@/actions/yachts";

const Dashboard = async () => {
    const data = await fetchFeatured();
  return (
      <section
          className={
              "w-full h-full flex flex-col lg:flex-row lg:justify-start lg:items-start justify-center items-center"
          }
      >
          <div className={"flex justify-center items-center gap-[4vw]"}>
              <FeaturedContent data={data}/>
          </div>
          <div className={"flex justify-center items-center gap-[4vw]"}>
              <AddNew/>
          </div>
      </section>
  );
};

export default Dashboard;
