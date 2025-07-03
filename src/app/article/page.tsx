import ArticleItem from "../components/articles/ArticleItem";
import { Article } from "@/app/utils/types";

const ArticlePage = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if(!response.ok){
    throw new Error("Failed To Fetch Articles");

  }
  const DataArticles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <div className="flex items-center justify-center flex-wrap gap-7">
        {DataArticles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ArticlePage;

