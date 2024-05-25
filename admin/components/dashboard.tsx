import FeaturedContent from "@/components/dashboard/featured";
import {Image} from "@nextui-org/react";
import addnew from "@/public/addNew.webp";
import {Medium} from "@/components/widgetsProviders";

const Dashboard = ({setActive}:{setActive:any}) => {
  return (
      <section
          className={
              "w-full h-full flex flex-col lg:flex-row lg:justify-start lg:items-start justify-center items-center"
          }
      >
          <div className={"flex justify-center items-center gap-[4vw]"}>
              <FeaturedContent setActive={setActive}/>
          </div>
          <div className={"flex justify-center items-center gap-[4vw]"}>
              <Medium
                  onClick={() => {setActive("new")} }
                  name={"Add new"}
                  className={"overflow-hidden shadow-inner bg-neutral-200 group"}
              >
                      <div
                          className={
                              "w-full h-[44vw] lg:h-[16vw] bg-cover bg-center rounded-3xl flex justify-start items-start py-[2vw] lg:py-[1vw] px-[2vw] lg:px-[1vw]"
                          }
                          style={{
                              backgroundImage: `url(${addnew.src})`,
                          }}
                      >
                      </div>
              </Medium>
          </div>
      </section>
  );
};

export default Dashboard;
