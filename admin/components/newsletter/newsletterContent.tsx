import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import('./htmlEditor'), { ssr: false });

export const NewsletterContent = ({
    content,
}: {
    content: string;
}) => {
    return (
        <div className="flex flex-col gap-4">
            <MonacoEditor value={content} language="html" />

            <div className="flex flex-row gap-2">
                <Button>Edit</Button>
                <Button>Send</Button>
            </div>
        </div>
    )
}