"use client";

import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { updateNewsletterContent } from "@/actions/newsletter";
import { NewsletterI } from "@/types/newsletter";

export const NewsletterContent = ({
    item,
    onUpdate,
}: {
    item: NewsletterI | null;
    onUpdate: VoidFunction;
}) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>("");

    const onEditSubmit = async () => {
        if (item?._id) {
            setEditing(true);
            try {
                await updateNewsletterContent(item._id, editValue);
            } catch (error) {
                console.error("Failed to update newsletter:", error);
            } finally {
                setEditing(false);
                onUpdate();
            }
        }
    };

    useEffect(() => {
        if (item) {
            setEditValue(item.htmlContent);
        }
    }, [item]);

    const sendNewsletter = async () => {
        // Implement your send newsletter logic here
    };

    if (!item) {
        return <p>Select a newsletter to view its content</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{item.title}</h1>

            <div className="flex flex-col gap-3">
                <Textarea
                    label="HTML content..."
                    style={{ width: "700px", height: "350px" }}
                    value={editValue}
                    onValueChange={setEditValue}
                />

                <div className="flex flex-row gap-2">
                    <Button onClick={onEditSubmit} isLoading={editing}>
                        {editing ? 'Saving...' : 'Edit'}
                    </Button>

                    <Button onClick={sendNewsletter}>Send</Button>
                </div>
            </div>
        </div>
    );
};
