"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
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
    const [sending, setSending] = useState<boolean>(false);

    const [editValueContent, setEditValueContent] = useState<string>("");
    const [editValueSubject, setEditValueSubject] = useState<string>("");

    const onEditSubmit = async () => {
        if (item?._id) {
            setEditing(true);
            try {
                await updateNewsletterContent(
                    item._id,
                    editValueContent,
                    editValueSubject
                );
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
            setEditValueContent(item.htmlContent);
            setEditValueSubject(item.subject);
        }
    }, [item]);

    const sendNewsletter = async () => {
        setSending(true);

        // Implement the sending logic once it's done

        setSending(false);
    };

    if (!item) {
        return <p>Select a newsletter to view its content</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{item.title}</h1>

            <div className="flex flex-col gap-3">
                <Input
                    variant="bordered"
                    label="Subject"
                    value={item.subject}
                    onValueChange={setEditValueSubject}
                />
                <Textarea
                    variant="bordered"
                    label="HTML content..."
                    style={{ width: "700px", height: "350px" }}
                    value={editValueContent}
                    onValueChange={setEditValueContent}
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
