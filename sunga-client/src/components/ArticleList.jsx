import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
        >
          <div className="overflow-hidden rounded-[1.25rem]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-zinc-500">
            Article {String(index + 1).padStart(2, "0")}
          </p>

          <h3 className="mt-2 text-lg font-semibold text-zinc-900">
            {article.title}
          </h3>

          <p className="mt-3 text-sm text-zinc-600">
            {article.content[0].substring(0, 100)}...
          </p>

          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;