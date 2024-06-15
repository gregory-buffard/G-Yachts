export interface IArticle {
    id: string;
    title: string;
    image: {
        url: string;
    };
    date: string;
    content: ArticleContentBlock[];
    category: {
        title: string;
        id: string;
    };
}

export interface ArticleContentBlock {
    type: string;
    children: ArticleContentBlock[];
}

export interface ArticleContentLink extends ArticleContentBlock {
    type: "link";
    url: string;
    linkType: "custom";
}

export interface ArticleContentUpload extends ArticleContentBlock {
    type: "upload";
    value: {
        id: string;
        filename: string;
        mimeType: string;
        width: number;
        height: number;
        url: string;
        alt?: string;
    };
}
