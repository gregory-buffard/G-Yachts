import { Button, Textarea } from "@nextui-org/react";
import { Newsletter } from "./newsletterItem";

export const NewsletterContent = ({
    item,
}: {
    item: Newsletter;
}) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{item.title}</h1>

            <Textarea
                style={{ width: "700px", height: "350px" }}
                value={item.htmlContent}
            />

            <div className="flex flex-row gap-2">
                <Button>Edit</Button>
                <Button>Send</Button>
            </div>
        </div>
    )
}