import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ArticleList from "../../components/ArticleList";
import { fetchArticles } from "../../services/articleService";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError("");

      try {
        const nextArticles = await fetchArticles();
        setArticles(nextArticles.filter((article) => article.isActive !== false));
      } catch (err) {
        setError(err.message || "Unable to load articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-8 text-center shadow-sm shadow-zinc-950/5 sm:px-8 sm:py-10 lg:px-12">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
          Articles
        </p>
        <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-normal text-zinc-950 sm:text-5xl">
          Featured articles on design and user experience
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Browse short reads about interface design, visual hierarchy,
          typography, color, and better digital experiences.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-8 shadow-sm shadow-zinc-950/5 sm:px-8 lg:px-10">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Latest Articles
          </h2>
        </div>

        {loading && <p className="text-sm text-zinc-600">Loading articles...</p>}
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        {!loading && !error && <ArticleList articles={articles} />}
      </section>
    </div>
  );
};

export default ArticleListPage;
