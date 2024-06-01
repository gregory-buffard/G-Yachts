import { getNewsletters } from "@/actions/newsletter"
import { NewsletterItem } from "./newsletterItem"
import { NewsletterI } from "@/types/newsletter";
import { useEffect, useState } from "react";

export const NewsletterList = ({
    newsletterItems,
    selectedItem,
    setSelectedItem
}: {
    newsletterItems: NewsletterI[];
    selectedItem: NewsletterI | null;
    setSelectedItem: (item: NewsletterI) => void;
}) => {
    return (
        <div className="flex flex-col gap-4">
            {newsletterItems.map(item => (
                <NewsletterItem
                    isSelected={selectedItem === item}
                    item={item}
                    onClick={() => setSelectedItem(item)}
                />
            ))}
        </div>
    )
}