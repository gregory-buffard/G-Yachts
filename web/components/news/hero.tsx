import { Link } from "@/navigation";
import { IArticle } from "@/types/article";
import { getLocale } from "next-intl/server";

const Hero = async ({
  article,
  categories,
}: {
  article: IArticle;
  categories: string[];
}) => {
  return (
    <div className="w-full h-[36dvh] md:h-screen mt-[24vh] md:mt-0">
      <div className="h-1/3 flex flex-col justify-end items-center">
        <Link
          href={{
            pathname: "/news",
          }}
        >
          <h1>
            Latest <span className="classic">news</span>
          </h1>
        </Link>
        <div className="flex flex-row flex-wrap justify-center gap-4 my-10 ">
          {categories.map((category, index) => (
            <Link
              href={{
                pathname: "/news",
                query: { category: category },
              }}
              shallow={true}
              key={index}
              className="uppercase text-xl transition-all hover:underline mx-5"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      <section
        className={
          "w-full px-[4vw] md:px-[8vw] h-2/3 bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
        }
        style={{
          backgroundImage: `url(${encodeURI(article.image.sizes.fhd.url)})`,
        }}
      >
        <h4>{article.category.title}</h4>
        <Link
          href={{
            pathname: "/news/[id]",
            params: { id: article.id },
          }}
        >
          <h1 className={"normal-case"}>{article.title}</h1>
        </Link>
      </section>
    </div>
  );
};

export default Hero;
