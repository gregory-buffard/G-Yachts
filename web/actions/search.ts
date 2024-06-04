"use server";

import { IYacht, Yacht } from "@/models/yacht";
import { Charter, ICharter } from "@/models/charter";
import { Destination, IDestination } from "@/models/destination";
import { Article, IArticle } from "@/models/article";

export const searchAll = async (
    query: string,
    locale: string
): Promise<{
    yachts: IYacht[];
    charters: ICharter[];
    destinations: IDestination[];
    articles: IArticle[];
    pages: { title: string; url: string }[];
}> => {
    const limit = 3;

    // Search yachts
    const yachts = await Yacht.find({
        $or: [
            { builder: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { city: { $regex: query, $options: "i" } },
            { model: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
        ],
    }).limit(limit);

    // Search charters
    const charters = await Charter.find({
        $or: [
            { builder: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { city: { $regex: query, $options: "i" } },
            { model: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
        ],
    }).limit(limit);

    // Search destinations
    const destinations = await Destination.find({
        $or: [
            { country: { $regex: query, $options: "i" } },
            { region: { $regex: query, $options: "i" } },
            { continent: { $regex: query, $options: "i" } },
            { destination: { $regex: query, $options: "i" } },
        ],
    }).limit(limit);

    // Search articles
    const articlesQuery =
        locale === "fr"
            ? { "fr.headline": { $regex: query, $options: "i" } }
            : { "en.headline": { $regex: query, $options: "i" } };
    const articles = await Article.find(articlesQuery)
        .sort({
            date: -1,
        })
        .limit(limit);

    // Search pages
    const allPages = [
        { title: "Sales", url: "/sales" },
        { title: "Charters", url: "/charters" },
        { title: "Company", url: "/company" },
        { title: "Destinations", url: "/destinations" },
        { title: "Partners", url: "/partners" },
        { title: "News", url: "/news" },
        { title: "Recruitment", url: "/recruitment" },
    ];

    const pages = allPages.filter((page) => page.title.toLowerCase().includes(query.toLowerCase()));

    return {
        yachts: yachts,
        charters: charters,
        destinations: destinations,
        articles: articles,
        pages: pages,
    };
};
