"use client";

import { createContext, useContext } from "react";
import { IArticle } from "@/types/article";

interface IContext {
    article: IArticle;
    locale: string;
}

const ArticleContext = createContext<IContext | undefined>(undefined);

export const ArticleProvider = ({
    article,
    locale,
    children,
}: {
    article: IArticle;
    locale: string;
    children: React.ReactNode;
}) => {
    const props = {
        article,
        locale,
    };

    return <ArticleContext.Provider value={props}>{children}</ArticleContext.Provider>;
};

export const useArticle = (): IContext => {
    const context = useContext(ArticleContext);
    if (context === undefined) {
        throw new Error("useArticle must be used within an ArticleProvider");
    }
    return context;
};
