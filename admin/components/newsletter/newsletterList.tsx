"use client";

import { ScrollShadow } from "@nextui-org/react";
import { NewsletterItem } from "./newsletterItem"
import { NewsletterI } from "@/types/newsletter";

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
        <div className="flex flex-row lg:flex-col gap-4">
            <ScrollShadow orientation="horizontal" className="lg:flex-col lg:hidden inline-flex flex-row gap-2">
                {newsletterItems.map(item => (
                    <NewsletterItem
                        isSelected={selectedItem === item}
                        item={item}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
            </ScrollShadow>

            <div className="lg:flex hidden lg:flex-col gap-3">
                {newsletterItems.map(item => (
                    <NewsletterItem
                        isSelected={selectedItem === item}
                        item={item}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
            </div>
        </div >
    )
}