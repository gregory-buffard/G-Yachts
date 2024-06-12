import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import {unlink} from "node:fs";
import {useState} from "react";

export const ClassicLine = ({name, value, setYacht}: {
    name: string,
    value: string,
    setYacht: (e: string) => void
}) => {

    return (
        <div className={"flex rounded-2xl mx-2 my-5 px-2 py-3 bg-black/10 justify-around items-start"}>
            <p className={"w-1/3 self-center"}>{name}</p>
                <Input aria-label={name} isDisabled={name === "_id"} value={value} onValueChange={(e) => setYacht(e)} className={"w-1/3"}/>
        </div>
    )
}

export const NumberLine = ({name, value, setYacht}: { name: string, value: number, setYacht: (e: number) => void }) => {
    const [val, setVal] = useState<string>(value.toString());
    return (
        <div className={"flex rounded-2xl mx-2 my-5 px-2 py-3 bg-black/10 justify-around items-start"}>
            <p className={"w-1/3 self-center"}>{name}</p>
            <Input aria-label={name} value={val} onChange={(e) => {
                const { value } = e.target;
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                    if (value.endsWith(".")) {
                        setVal(value);
                    } else {
                        setVal(value);
                        setYacht(parseFloat(value));
                    }
                }
            }} className={"w-1/3"}/>
        </div>
    )
}

export const BooleanLine = ({name, value, setYacht}: { name: string, value: boolean, setYacht: (e: boolean) => void }) => {

        return (
            <div className={"flex rounded-2xl mx-2 my-5 px-2 py-3 bg-black/10 justify-around items-start"}>
                <p className={"w-1/3 self-center"}>{name}</p>
                <Select aria-label={name} className={"w-1/3"} disallowEmptySelection defaultSelectedKeys={[value ? "true" : "false"]} onChange={(e) => setYacht(e.target.value === "true")}
                >
                    <SelectItem key={"true"} value={"true"}>
                        true
                    </SelectItem>
                    <SelectItem key={"false"} value={"false"}>
                        false
                    </SelectItem>
                </Select>
            </div>
        )
}

