import Button from "./Button";
import { DEFAULT_ARTICLE_IMAGE } from "../utils/localArticles";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => {
        const articleSlug = article.name || article.slug || article._id;
        const preview = article.content?.[0] || "";

        return (
          <article
            key={articleSlug}
            className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-zinc-50 p-4 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-zinc-950/10"
          >
            <div className="overflow-hidden rounded-2xl bg-zinc-200">
              <img
                src={article.image || DEFAULT_ARTICLE_IMAGE}
                alt={article.title}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = DEFAULT_ARTICLE_IMAGE;
                }}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Article {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              {article.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
              {preview.substring(0, 100)}...
            </p>

            <Button to={`/articles/${articleSlug}`} className="mt-auto pt-4">
              Read More
            </Button>
          </article>
        );
      })}
    </div>
  );
};

export default ArticleList;
