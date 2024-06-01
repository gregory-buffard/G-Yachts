"use client";

import IBrokerino from "@/types/brokerino";
import { useEffect, useState } from "react";
import {
  Progress,
  Input,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { createBrokerino } from "@/actions/brokerino";

interface IPogress {
  info: number;
  langs: number;
  avatar: number;
}

const Create = ({ id }: { id: IBrokerino["kindeID"] }) => {
  const [pogress, setPogress] = useState<IPogress>({
      info: 0,
      langs: 0,
      avatar: 0,
    }),
    [tempForm, setForm] = useState<Omit<IBrokerino, "_id">>({
      kindeID: id,
      name: "",
      position: "",
      email: "",
      tel: [],
      langs: [],
    }),
    [check, setCheck] = useState<boolean>(false);

  const validate = () => {
    const inputs = {
      name: document.querySelector("input[name=name]") as HTMLInputElement,
      position: document.querySelector(
        "input[name=position]",
      ) as HTMLInputElement,
      email: document.querySelector("input[name=email]") as HTMLInputElement,
      tel: document.querySelector("input[name=tel]") as HTMLInputElement,
    };
    if (inputs.name && inputs.position && inputs.email && inputs.tel)
      setCheck(true);
    else setCheck(false);
  };

  const Screen = {
    Info: () => {
      const [check, setCheck] = useState<boolean>(false);

      const validate = () => {
        const inputs = {
          name: document.querySelector("input[name=name]") as HTMLInputElement,
          position: document.querySelector(
            "input[name=position]",
          ) as HTMLInputElement,
          email: document.querySelector(
            "input[name=email]",
          ) as HTMLInputElement,
          tel: document.querySelector("input[name=tel]") as HTMLInputElement,
        };
        if (inputs.name && inputs.position && inputs.email && inputs.tel)
          setCheck(true);
        else setCheck(false);
      };

      return (
        <div
          className={
            "w-11/12 mx-auto h-[90%] absolute z-20 inset-0 md:px-[20vw] lg:px-[32vw] bg-stone-50 rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
          }
          style={{
            transform: `translateX(${pogress.info === 100 ? "-150%" : "0"})`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <h2 className={"w-full"}>We&apos;ll need some basic details</h2>
          <div
            className={
              "w-full flex flex-col justify-center items-center gap-[2vh]"
            }
          >
            <Input
              name={"name"}
              type={"text"}
              label={"Full Name"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"position"}
              type={"text"}
              label={"Position"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"email"}
              type={"email"}
              label={"Email"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"tel"}
              type={"text"}
              label={"Phone numbers"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
          </div>
          <div className={"w-full flex justify-end"}>
            <Button
              type={"button"}
              variant={"flat"}
              color={"primary"}
              onPress={() => {
                if (check) setPogress((prev) => ({ ...prev, info: 100 }));
                else alert("Please fill all the fields.");
              }}
            >
              Next
            </Button>
          </div>
        </div>
      );
    },
    Langs: () => {
      const [check, setCheck] = useState<boolean>(false);

      return (
        <form
          className={
            "w-11/12 mx-auto h-[90%] absolute z-10 inset-0 md:px-[20vw] lg:px-[32vw] bg-stone-50 rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
          }
          style={{
            transform: `translateX(${pogress.langs === 100 ? "-150%" : "0"})`,
            transition: "transform 0.5s ease-in-out",
          }}
          action={(formData) =>
            setForm((prev) => ({ ...prev, langs: formData.get("langs") }))
          }
        >
          <h2 className={"w-full"}>Select your languages</h2>
          <CheckboxGroup name={"langs"} className={"w-full"}>
            <Checkbox value={"FR"}>&#127467;&#127479; Français</Checkbox>
            <Checkbox value={"EN"}>&#127468;&#127463; English</Checkbox>
            <Checkbox value={"ES"}>&#127466;&#127480; Español</Checkbox>
            <Checkbox value={"IT"}>&#127470;&#127481; Italiano</Checkbox>
            <Checkbox value={"RU"}>&#127479;&#127482; Русский</Checkbox>
            <Checkbox value={"JP"}>&#127471;&#127477; 日本語</Checkbox>
          </CheckboxGroup>
          <div className={"w-full flex justify-between"}>
            <Button
              type={"button"}
              variant={"flat"}
              color={"default"}
              onPress={() => setPogress((prev) => ({ ...prev, info: 0 }))}
            >
              Back
            </Button>
            <Button
              type={"submit"}
              variant={"flat"}
              color={"success"}
              /*onPress={() => {
                if (check) setPogress((prev) => ({ ...prev, info: 100 }));
                else alert("Please fill all the fields.");
              }}*/
            >
              Done!
            </Button>
          </div>
        </form>
      );
    },
    Avatar: () => {
      const [check, setCheck] = useState<boolean>(false);

      return (
        <div
          className={
            "w-11/12 mx-auto h-[90%] absolute z-0 inset-0 md:px-[20vw] lg:px-[32vw] bg-stone-50 rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
          }
          style={{
            transform: `translateX(${pogress.avatar === 100 ? "-150%" : "0"})`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <h2 className={"w-full"}>We&apos;ll need some basic details</h2>
          <div className={"w-full flex justify-between"}>
            <Button>Previous</Button>
            <Button
              variant={"flat"}
              color={"success"}
              onPress={() => {
                if (check) setPogress((prev) => ({ ...prev, info: 100 }));
                else alert("Please fill all the fields.");
              }}
            >
              Done!
            </Button>
          </div>
        </div>
      );
    },
  };

  return (
    <section
      className={
        "w-full h-[100dvh] absolute z-[60] bg-stone-100 flex flex-col justify-center items-center gap-[2vh]"
      }
    >
      <h1 className={"mt-[2vh] containerize text-center"}>
        Let&apos;s get you on board!
      </h1>
      <div
        className={"containerize flex justify-between items-center gap-[2vw]"}
      >
        <Progress
          size={"sm"}
          value={pogress.info}
          color={"success"}
          label={"Details"}
        />
        <Progress
          size={"sm"}
          value={pogress.langs}
          color={"success"}
          label={"Language"}
        />
        <Progress
          size={"sm"}
          value={pogress.avatar}
          color={"success"}
          label={"Avatar"}
        />
      </div>
      <form
        className={"w-full h-full max-h-full overflow-x-hidden relative"}
        action={(formData) => createBrokerino(formData, id)}
      >
        <div
          className={
            "w-11/12 mx-auto h-[90%] absolute z-20 inset-0 md:px-[20vw] lg:px-[32vw] bg-stone-50 rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
          }
          style={{
            transform: `translateX(${pogress.info === 100 ? "-150%" : "0"})`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <h2 className={"w-full"}>We&apos;ll need some basic details</h2>
          <div
            className={
              "w-full flex flex-col justify-center items-center gap-[2vh]"
            }
          >
            <Input
              name={"name"}
              type={"text"}
              label={"Full Name"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"position"}
              type={"text"}
              label={"Position"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"email"}
              type={"email"}
              label={"Email"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"tel"}
              type={"text"}
              label={"Phone numbers"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
          </div>
          <div className={"w-full flex justify-end"}>
            <Button
              type={"button"}
              variant={"flat"}
              color={"primary"}
              onPress={() => {
                if (check) setPogress((prev) => ({ ...prev, info: 100 }));
                else alert("Please fill all the fields.");
              }}
            >
              Next
            </Button>
          </div>
        </div>
        <div
          className={
            "w-11/12 mx-auto h-[90%] absolute z-10 inset-0 md:px-[20vw] lg:px-[32vw] bg-stone-50 rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
          }
          style={{
            transform: `translateX(${pogress.langs === 100 ? "-150%" : "0"})`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <h2 className={"w-full"}>Select your languages</h2>
          <CheckboxGroup name={"langs"} className={"w-full"}>
            <Checkbox value={"FR"}>&#127467;&#127479; Français</Checkbox>
            <Checkbox value={"EN"}>&#127468;&#127463; English</Checkbox>
            <Checkbox value={"ES"}>&#127466;&#127480; Español</Checkbox>
            <Checkbox value={"IT"}>&#127470;&#127481; Italiano</Checkbox>
            <Checkbox value={"RU"}>&#127479;&#127482; Русский</Checkbox>
            <Checkbox value={"JP"}>&#127471;&#127477; 日本語</Checkbox>
          </CheckboxGroup>
          <div className={"w-full flex justify-between"}>
            <Button
              type={"button"}
              variant={"flat"}
              color={"default"}
              onPress={() => setPogress((prev) => ({ ...prev, info: 0 }))}
            >
              Back
            </Button>
            <Button
              type={"submit"}
              variant={"flat"}
              color={"success"}
              /*onPress={() => {
                  if (check) setPogress((prev) => ({ ...prev, info: 100 }));
                  else alert("Please fill all the fields.");
                }}*/
            >
              Done!
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

const Brokerino = ({
  data,
  id,
}: {
  data: IBrokerino | boolean;
  id: IBrokerino["kindeID"];
}) => {
  return data === false ? (
    <Create id={id} />
  ) : (
    <div
      className={"size-[4vh] absolute right-[2vw] top-[2vw] bg-stone-50"}
    ></div>
  );
};

export default Brokerino;
