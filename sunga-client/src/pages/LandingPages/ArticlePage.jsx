import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import articles from "../../data/article-content.js";

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(a => a.name === name);

  if (!article) {
    return (
      <div>
        <h1>Article not found</h1>
        <Button to="/articles">Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6 overflow-hidden rounded-xl">
        <img
          src={article.image}
          alt={article.title}
          className="w-full aspect-[4/3] object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold text-zinc-900">
        {article.title}
      </h1>

      <div className="mt-4 space-y-4">
        {article.content.map((p, i) => (
          <p key={i} className="text-zinc-700">
            {p}
          </p>
        ))}
      </div>

      <Button to="/articles" className="mt-6">
        Back to Articles
      </Button>
    </div>
  );
}

export default ArticlePage;