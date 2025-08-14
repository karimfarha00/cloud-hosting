import { Article } from "../../utils/types";
import AddCommentForm from "../../components/comments/AddCommentForm";
import CommentItems from "../../components/comments/CommentItems";

const SingleArticlePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error("The Fetch Was Failed");
  }

  const article: Article = await response.json();

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-400">1/1/2024</div>
        <p className="text-gray-800 text-xl mt-5">{article.body}</p>
      </div>
      <AddCommentForm />
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      <CommentItems />
      <CommentItems />
      <CommentItems />
    </section>
  );
};

export default SingleArticlePage;
