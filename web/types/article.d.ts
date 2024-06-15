export interface IArticle {
    id: string;
    title: string;
    image: {
        url: string;
    };
    date: string;
    content: object;
    category: {
        title: string;
        id: string;
    };
}
