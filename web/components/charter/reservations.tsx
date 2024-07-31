import { ICharter } from "@/types/charter";
import Calendar from "react-calendar";

const Reservations = ({ data }: { data: ICharter["reservations"] }) => {
  return (
    <section className={"w-full flex flex-col justify-center items-start"}>
      <h2>Availability</h2>
      <Calendar className={"w-full"} />
    </section>
  );
};

export default Reservations;
