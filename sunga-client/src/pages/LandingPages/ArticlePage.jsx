import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import { DEFAULT_ARTICLE_IMAGE } from "../../utils/localArticles";
import { fetchArticle } from "../../services/articleService";

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError("");

      try {
        const nextArticle = await fetchArticle(name);
        setArticle(nextArticle.isActive !== false ? nextArticle : null);
      } catch (err) {
        setError(err.message || "Article not found");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm shadow-zinc-950/5">
        <p className="text-sm font-medium text-zinc-600">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm shadow-zinc-950/5">
        <h1 className="text-3xl font-bold text-zinc-950">{error || "Article not found"}</h1>
        <Button to="/articles" className="mt-6">Back</Button>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
      <div className="overflow-hidden bg-zinc-100">
        <img
          src={article.image || DEFAULT_ARTICLE_IMAGE}
          alt={article.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = DEFAULT_ARTICLE_IMAGE;
          }}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="px-6 py-8 sm:px-8 lg:px-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">
          Article
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-normal text-zinc-950 sm:text-5xl">
          {article.title}
        </h1>

        <div className="mt-6 space-y-5 text-base leading-8 text-zinc-700">
          {(article.content || []).map((p, i) => (
            <p key={i}>
              {p}
            </p>
          ))}
        </div>

        <Button to="/articles" className="mt-8">
          Back to Articles
        </Button>
      </div>
    </article>
  );
}

export default ArticlePage;
