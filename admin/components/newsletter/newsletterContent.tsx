import { Button } from "@nextui-org/react";

export const NewsletterContent = ({
    content,
}: {
    content: string;
}) => {
    return (
        <div className="flex flex-col gap-4">
            <p>{content}</p>

            <div className="flex flex-row gap-2">
                <Button>Edit</Button>
                <Button>Send</Button>
            </div>
        </div>
    )
}