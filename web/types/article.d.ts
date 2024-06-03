export interface IArticle {
    _id: string;
    heroImage: string;
    date: number;
    en: IArticleContent;
    fr: IArticleContent;
}

interface IArticleContent {
    headline: string;
    category: string;
    article: string;
}
