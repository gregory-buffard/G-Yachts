import { Button } from "@nextui-org/react";

interface IWidget {
  children: React.ReactNode;
  name: string;
  onClick: (e: any) => void;
  className?: string;
}

export const Small = ({ children, name, onClick, className }: IWidget) => {
  return (
    <div className={`size-[44vw] rounded-3xl ${className}`}>{children}</div>
  );
};

export const Medium = ({ children, name, onClick, className }: IWidget) => {
  return (
    <Button
      color={"default"}
      variant={"light"}
      onClick={onClick}
      radius={"none"}
      className={
        "w-[92vw] lg:w-[34vw] h-max flex flex-col justify-center items-center px-[4vw] lg:px-[1vw] pt-[4vw] lg:pt-[1vw] pb-[1vh] rounded-[1.75rem]"
      }
    >
      <div className={`w-full h-[44vw] lg:h-[16vw] rounded-3xl ${className}`}>
        {children}
      </div>
      <label className={"cursor-pointer my-[1vh]"}>{name}</label>
    </Button>
  );
};
