export interface IArticle {
  id: string;
  slug: string;
  title: string;
  image: {
    alt: string;
    sizes: {
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
      fhd: {
        url: string;
        width: number;
        height: number;
      };
    };
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
  children: {
    text: string;
    type: ArticleContentBlock["type"];
    children: ArticleContentBlock["children"];
  }[];
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
