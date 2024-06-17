import { ArticleContentBlock, ArticleContentLink, ArticleContentUpload } from "@/types/article";
import { clsx } from "clsx";

export const ContentRenderer = ({ blocks }: { blocks: ArticleContentBlock[] }) => {
    return <div className="text-justify">{blocks.map((block, index) => renderNode(block))}</div>;
};

const renderNode = (node: ArticleContentBlock) => {
    switch (node.type) {
        case "h1":
            return <h1>{node.children.map(renderLeaf)}</h1>;
        case "h2":
            return <h2 className="mb-4">{node.children.map(renderLeaf)}</h2>;
        case "h3":
            return <h3 className="mb-4">{node.children.map(renderLeaf)}</h3>;
        case "blockquote":
            return (
                <blockquote className="border-l-2 border-gray-500 pl-4 my-2">
                    {node.children.map(renderLeaf)}
                </blockquote>
            );
        case "ol":
            return <ol className="list-decimal">{node.children.map(renderNode)}</ol>;
        case "ul":
            return <ul className="list-disc">{node.children.map(renderNode)}</ul>;
        case "li":
            return <li>{node.children.map(renderLeaf)}</li>;
        case "link":
            return (
                <a
                    className="underline"
                    href={(node as ArticleContentLink).url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {node.children.map(renderLeaf)}
                </a>
            );
        case "upload":
            const media: ArticleContentUpload = node as ArticleContentUpload;
            return (
                <img
                    src={media.value.url}
                    alt={media.value.alt}
                    className="w-full object-cover my-4"
                />
            );
        default:
            return <p>{node.children.map(renderLeaf)}</p>;
    }
};

const renderLeaf = (leaf: any) => {
    if (!leaf.type)
        return (
            <span
                className={clsx({
                    "font-bold": leaf.bold,
                    italic: leaf.italic,
                    underline: leaf.underline,
                    "line-through": leaf.strikethrough,
                })}>
                {leaf.text}
            </span>
        );
    return renderNode(leaf);
};
