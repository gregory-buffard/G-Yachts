interface IArticle {
    _id?: string;
    heroImage: string;
    en:{
        headline: string;
        category: string;
        article: string;
    },
    fr:{
        headline: string;
        category: string;
        article: string;
    },
    date:string;
}

export default IArticle;
