import { NewsletterI } from "@/types/newsletter";
import { Button } from "@nextui-org/react";
import { twMerge } from 'tailwind-merge';

export const NewsletterItem = ({
    item,
    onClick,
    isSelected
}: {
    item: NewsletterI;
    onClick: VoidFunction;
    isSelected?: boolean;
}) => {
    return (
        <Button
            type="button"
            variant="faded"
            className={twMerge([
                "flex flex-col gap-5 p-3 min-w-max text-left",
                isSelected ? "bg-gray-200" : "",
                "whitespace-normal",
                "overflow-visible",
            ])}
            onClick={onClick}
        >
            <h2 className="font-normal text-base">{item.title}</h2>
        </Button>
    )
}
