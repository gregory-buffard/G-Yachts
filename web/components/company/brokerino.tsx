import IBrokerino from "@/types/brokerino";
import Image from "next/image";
import { clsx } from "clsx";
import codes from "@/data/CountryCodes.json";

const Brokerino = ({ brokerino }: { brokerino: IBrokerino }) => (
  <div className={"w-full flex flex-col justify-between items-start"}>
    <div className={"flex flex-col justify-start items-stretch gap-[1vh] w-full"}>
      <Image
        src={brokerino.picture?.sizes.fhd.url || "/icons/user.svg"}
        width={brokerino.picture?.sizes.fhd.width || 128}
        height={brokerino.picture?.sizes.fhd.height || 128}
        alt={brokerino.picture?.alt || `${brokerino.name}'s picture`}
        className={clsx("object-cover object-center", {
          "md:min-size-[25vh] min-size-[25vh] size-[25vh] object-cover object-center": brokerino.picture,
          "size-[25vh]": !brokerino.picture,
        })}
      />
      <div className={"w-full flex flex-col justify-between items-start"}>
        <div className={"w-full flex justify-between items-start"}>
          <div className={"flex flex-col justify-start items-start h-max"}>
            <h3 className={"font-medium whitespace-break-spaces"}>
              {brokerino.name}
            </h3>
            <p className={"uppercase"}>{brokerino.position}</p>
          </div>
        </div>
        <div
          className={
            "flex flex-col justify-end items-start h-max text-rock-500"
          }
        >
          {brokerino.phones.map((phone) => {
            const country = codes.find(
              (code) => code.dial_code === phone.prefix.replace(/^./, "+"),
            );
            const code = country ? country.code : "";
            return <p key={phone.number}>{`${code}: ${phone.number}`}</p>;
          })}
          <p className={"break-words"}>{brokerino.email}</p>
        </div>
      </div>
    </div>
    <a></a>
  </div>
);

export default Brokerino;
