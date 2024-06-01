import { Button } from "@nextui-org/react";

export type Newsletter = {
    title: string;
    htmlContent: string;
}

export const NewsletterItem = ({
    item,
    onClick
}: {
    item: Newsletter;
    onClick: VoidFunction;
}) => {
    return (
        <Button
            type="button"
            variant="faded"
            className="flex flex-col gap-5"
            onClick={onClick}
        >
            <h2 className="font-normal text-base">{item.title}</h2>
        </Button>
    )
}