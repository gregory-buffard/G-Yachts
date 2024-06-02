"use client";

import IBrokerino from "@/types/brokerino";
import { useEffect, useState } from "react";
import {
  Progress,
  Input,
  Button,
  CheckboxGroup,
  Checkbox,
  Image as NextuiImage,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { createBrokerino, fetchBrokerino } from "@/actions/brokerino";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { useViewContext } from "@/context/view";
import codes from "@/data/CountryCodes.json";

interface IPogress {
  info: number;
  langs: number;
  avatar: number;
}

export const Edit = ({ data }: { data: IBrokerino }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(),
    [phone, setPhone] = useState<{ prefix: string; number: string }[]>(
      data.phone,
    );

  return (
    <form
      className={"w-full flex flex-col justify-center items-center gap-[4vh]"}
    >
      <h1>Edit your profile</h1>
      <div
        className={"w-full flex flex-col justify-center items-center gap-[2vh]"}
      >
        <NextuiImage
          isBlurred={true}
          src={data.avatar}
          alt={data.name}
          className={"size-[18vh] peer"}
        />
        <input type={"file"} className={"w-[18vh]"} />
      </div>

      <div
        className={"w-full flex flex-col justify-start items-center gap-[2vh]"}
      >
        <Input
          variant={"flat"}
          isRequired={true}
          defaultValue={data.name}
          type={"text"}
          name={"name"}
          label={"Name"}
          classNames={{
            inputWrapper:
              "bg-stone-200 group-data-[focus=true]:bg-default-200/50",
            input: "text-base",
          }}
        />
        <Input
          variant={"flat"}
          isRequired={true}
          defaultValue={data.position}
          type={"text"}
          name={"name"}
          label={"Position"}
          classNames={{
            inputWrapper:
              "bg-stone-200 group-data-[focus=true]:bg-default-200/50",
            input: "text-base",
          }}
        />
        <Input
          variant={"flat"}
          isRequired={true}
          defaultValue={data.email}
          type={"email"}
          name={"name"}
          label={"Email"}
          classNames={{
            inputWrapper:
              "bg-stone-200 group-data-[focus=true]:bg-default-200/50",
            input: "text-base",
          }}
        />
        <Button
          variant={"flat"}
          className={
            "w-full text-base bg-stone-200 hover:bg-stone-200/50 focus:bg-stone-200/50"
          }
          onPress={onOpen}
        >
          Contact card
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} backdrop={"blur"}>
          <ModalContent>
            <>
              <ModalHeader>Manage your numbers</ModalHeader>
              <ModalBody
                className={"flex flex-col justify-center items-center"}
              >
                {phone.map((num, i) => (
                  <div
                    key={i}
                    className={"w-full flex justify-between items-center"}
                  >
                    <Select
                      className={"w-1/4 text-base"}
                      name={`code${i}`}
                      isRequired={true}
                      value={num.prefix}
                    >
                      {codes.map((country, i) => (
                        <SelectItem key={country.name} className={"text-base"}>
                          {country.dial_code}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      isRequired={true}
                      name={`phone${i}`}
                      defaultValue={num.number}
                      className={
                        "w-2/3 flex justify-start items-center text-base"
                      }
                    />
                    <Button
                      variant={"flat"}
                      color={"danger"}
                      isIconOnly={true}
                      onPress={() =>
                        setPhone((prev) =>
                          prev.filter((_, index) => i !== index),
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 32 32"
                        className={"fill-red-500 h-[1.5rem]"}
                      >
                        <path d="M26.285,7.517c-1.431-0.427-2.868-0.743-4.306-0.991c0.026-0.451,0.027-0.913-0.01-1.282 c-0.118-1.16-0.894-2.16-1.976-2.548c-2.577-0.924-5.414-0.923-7.987,0c-1.083,0.388-1.858,1.388-1.977,2.548 c-0.032,0.32-0.036,0.813-0.016,1.297c-1.437,0.251-2.873,0.57-4.304,1.001C5.182,7.701,4.882,8.26,5.041,8.788 C5.172,9.221,5.568,9.5,5.999,9.5c0.095,0,0.192-0.014,0.288-0.042C6.518,9.389,6.749,9.34,6.98,9.276 c-1.02,4.766-1.462,11.209,0.056,16.677c0.749,2.693,1.493,2.979,4.226,3.65c1.084,0.267,2.909,0.4,4.735,0.4 c1.829,0,3.658-0.134,4.746-0.401c2.728-0.67,3.472-0.956,4.221-3.649c1.52-5.476,1.077-11.928,0.056-16.7 c0.231,0.064,0.463,0.112,0.693,0.181c0.527,0.155,1.087-0.144,1.244-0.672C27.115,8.231,26.814,7.674,26.285,7.517z M19.03,14.242 c-0.135-0.535,0.191-1.078,0.728-1.212c0.535-0.137,1.078,0.191,1.212,0.728c0.704,2.814,0.704,5.67,0,8.484 C20.856,22.697,20.449,23,20.001,23c-0.08,0-0.162-0.01-0.243-0.03c-0.536-0.134-0.862-0.677-0.728-1.212 C19.653,19.265,19.653,16.735,19.03,14.242z M12.97,21.758c0.135,0.535-0.191,1.078-0.728,1.212C12.161,22.99,12.079,23,11.999,23 c-0.448,0-0.855-0.303-0.969-0.758c-0.704-2.814-0.704-5.67,0-8.484c0.133-0.536,0.674-0.864,1.212-0.728 c0.536,0.134,0.862,0.677,0.728,1.212C12.347,16.735,12.347,19.265,12.97,21.758z M15,22v-8c0-0.553,0.447-1,1-1s1,0.447,1,1v8 c0,0.553-0.447,1-1,1S15,22.553,15,22z M12.021,5.445c0.04-0.396,0.3-0.737,0.661-0.866c2.139-0.768,4.495-0.768,6.638,0 c0.36,0.129,0.62,0.47,0.66,0.865c0.022,0.22,0.024,0.51,0.013,0.8c-2.661-0.304-5.327-0.301-7.988,0.01 C11.997,5.949,12,5.645,12.021,5.445z"></path>
                      </svg>
                    </Button>
                  </div>
                ))}
                <Button
                  variant={"flat"}
                  color={"success"}
                  className={"w-full text-base"}
                  onPress={() =>
                    setPhone((prev) => [...prev, { prefix: "", number: "" }])
                  }
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      className={"h-[1.5rem] fill-green-500"}
                    >
                      <path d="M16,3C8.83,3,3,8.83,3,16c0,7.17,5.83,13,13,13s13-5.83,13-13C29,8.83,23.17,3,16,3z M21,17h-4v4c0,0.552-0.448,1-1,1	s-1-0.448-1-1v-4h-4c-0.552,0-1-0.448-1-1s0.448-1,1-1h4v-4c0-0.552,0.448-1,1-1s1,0.448,1,1v4h4c0.552,0,1,0.448,1,1	S21.552,17,21,17z"></path>
                    </svg>
                  }
                >
                  Add number
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button variant={"flat"} color={"primary"} onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </div>
      <div className={"w-full flex justify-between items-center"}>
        <Button variant={"flat"} color={"danger"} type={"reset"}>
          Reset
        </Button>
        <Button variant={"flat"} color={"primary"} type={"submit"}>
          Confirm changes
        </Button>
      </div>
    </form>
  );
};

const Create = ({ id }: { id: IBrokerino["kindeID"] }) => {
  const [pogress, setPogress] = useState<IPogress>({
      info: 0,
      langs: 0,
      avatar: 0,
    }),
    [check, setCheck] = useState<boolean>(false),
    { pending } = useFormStatus();

  const validate = () => {
    const inputs = {
      name: document.querySelector("input[name=name]") as HTMLInputElement,
      position: document.querySelector(
        "input[name=position]",
      ) as HTMLInputElement,
      email: document.querySelector("input[name=email]") as HTMLInputElement,
      prefix: document.querySelector(
        "select[name=prefix]",
      ) as HTMLSelectElement,
      tel: document.querySelector("input[name=tel]") as HTMLInputElement,
    };
    if (
      inputs.name &&
      inputs.position &&
      inputs.email &&
      inputs.prefix &&
      inputs.tel
    )
      setCheck(true);
    else setCheck(false);
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
        action={async (formData) => {
          const data = formData;
          const reader = new FileReader();
          reader.readAsDataURL(formData.get("avatar") as Blob);
          reader.onload = async () => {
            await createBrokerino(data, id, reader.result as string).then(
              () => {
                setPogress((prev) => ({ ...prev, avatar: 100 }));
                setTimeout(() => window.location.reload(), 3000);
              },
            );
          };
        }}
      >
        <div
          className={
            "w-11/12 mx-auto h-[90%] absolute z-30 inset-0 md:px-[20vw] lg:px-[32vw] bg-stone-50 rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
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
              isDisabled={pending}
              type={"text"}
              label={"Full Name"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"position"}
              isDisabled={pending}
              type={"text"}
              label={"Position"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <Input
              name={"email"}
              isDisabled={pending}
              type={"email"}
              label={"Email"}
              isRequired={true}
              radius={"lg"}
              isClearable={true}
              onChange={validate}
            />
            <div
              className={"w-full flex justify-between items-center gap-[2vw]"}
            >
              <Select
                className={"w-1/3"}
                name={"prefix"}
                onChange={validate}
                isDisabled={pending}
                isRequired={true}
                classNames={{
                  base: "h-full",
                  trigger: "h-full",
                  mainWrapper: "h-full",
                  innerWrapper: "h-full",
                }}
              >
                {codes.map((country, i) => (
                  <SelectItem key={i} value={country.dial_code}>
                    {country.dial_code}
                  </SelectItem>
                ))}
              </Select>
              <Input
                name={"tel"}
                isDisabled={pending}
                type={"text"}
                label={"Phone numbers"}
                isRequired={true}
                radius={"lg"}
                isClearable={true}
                onChange={validate}
                className={"w-2/3"}
              />
            </div>
          </div>
          <div className={"w-full flex justify-end"}>
            <Button
              type={"button"}
              isDisabled={pending}
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
            "w-11/12 mx-auto h-[90%] absolute z-20 inset-0 md:px-[20vw] lg:px-[32vw] bg-stone-50 rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
          }
          style={{
            transform: `translateX(${pogress.langs === 100 ? "-150%" : "0"})`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <h2 className={"w-full"}>Select your languages</h2>
          <CheckboxGroup
            name={"langs"}
            className={"w-full"}
            isDisabled={pending}
            isRequired={true}
          >
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
              isDisabled={pending}
              onPress={() => setPogress((prev) => ({ ...prev, info: 0 }))}
            >
              Back
            </Button>
            <Button
              type={"button"}
              variant={"flat"}
              color={"primary"}
              isDisabled={pending}
              onPress={() => setPogress((prev) => ({ ...prev, langs: 100 }))}
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
            transform: `translateX(${pogress.avatar === 100 ? "-150%" : "0"})`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <h2 className={"w-full"}>Choose your avatar</h2>
          <input
            type={"file"}
            className={"w-full"}
            name={"avatar"}
            accept={"image/png, image/jpeg, image/jpg, image/webp"}
          />
          <div className={"w-full flex justify-between"}>
            <Button
              type={"button"}
              isDisabled={pending}
              variant={"flat"}
              onPress={() => setPogress((prev) => ({ ...prev, langs: 0 }))}
            >
              Back
            </Button>
            <Button
              type={"submit"}
              variant={"flat"}
              isDisabled={pending}
              color={"success"}
            >
              Done!
            </Button>
          </div>
        </div>
        <div
          className={
            "w-11/12 mx-auto h-[90%] absolute z-0 inset-0 px-[4vw] rounded-3xl flex flex-col justify-center items-center gap-[4vh]"
          }
          style={{
            transform: `translateX(0)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <h1>Welcome abord, captain!</h1>
        </div>
      </form>
    </section>
  );
};

const Brokerino = ({
  data,
  id,
}: {
  data: IBrokerino | null;
  id: IBrokerino["kindeID"];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return data ? (
    <>
      <Button
        isIconOnly={true}
        variant={"bordered"}
        className={
          "h-[6vh] w-[6vh] absolute right-[1vw] top-[1vw] bg-stone-50 rounded-2xl object-cover object-center"
        }
        onPress={onOpen}
      >
        <Image src={data.avatar} width={256} height={256} alt={data.name} />
      </Button>
      <Modal isOpen={true} onClose={onClose} backdrop={"blur"}>
        <ModalContent>
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <Edit data={data} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Create id={id} />
  );
};

export default Brokerino;
