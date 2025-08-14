import ArticleItem from "../components/articles/ArticleItem";
import { Article } from "@/app/utils/types";
import type { Metadata } from "next";
import SearchArticleInput from "../components/articles/SearchArticleInput";
import Pagination from "../components/articles/Pagination";

const ArticlePage = async () => {
  //delay 10 second 
  await new Promise((resolve)=>setTimeout(resolve, 10000));
  
  
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    { next: { revalidate: 20 } }
  );
  if(!response.ok){
    throw new Error("Failed To Fetch Articles");

  }
  const DataArticles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      
      <div className="flex items-center justify-center flex-wrap gap-7">
        {DataArticles.slice(0, 6).map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ArticlePage;
export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles Page for Cloud Hosting Project",
};
