import { Metadata, ResolvingMetadata } from "next";

const generateMetadata = async ({ params }) => {
  return {
    title: params.title,
    description: params.description,
    keywords: params.keywords,
    image: params.image,
  };
};

export default generateMetadata;
