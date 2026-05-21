import articles from '../data/article-content';

const LOCAL_ARTICLES_KEY = 'localArticles';
export const DEFAULT_ARTICLE_IMAGE =
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80';

export const normalizeArticle = (article, index = 0) => ({
  id: article.id || article.name || article.slug || `article-${index + 1}`,
  name: article.name || article.slug || article.id || `article-${index + 1}`,
  slug: article.slug || article.name || article.id || `article-${index + 1}`,
  title: article.title || 'Untitled Article',
  image: article.image || DEFAULT_ARTICLE_IMAGE,
  content: Array.isArray(article.content)
    ? article.content
    : String(article.content || '')
        .split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
  isActive: article.isActive ?? true,
});

export const getStoredArticles = () => {
  try {
    const savedArticles = JSON.parse(localStorage.getItem(LOCAL_ARTICLES_KEY) || '[]');
    return Array.isArray(savedArticles) ? savedArticles : [];
  } catch {
    return [];
  }
};

export const saveStoredArticles = (nextArticles) => {
  localStorage.setItem(LOCAL_ARTICLES_KEY, JSON.stringify(nextArticles));
};

export const getAllArticles = () => {
  const articleMap = new Map();

  articles.map(normalizeArticle).forEach((article) => {
    articleMap.set(article.name, article);
  });

  getStoredArticles().map(normalizeArticle).forEach((article) => {
    const baseArticle = articleMap.get(article.name);
    const shouldKeepBaseImage =
      baseArticle?.image &&
      baseArticle.image !== DEFAULT_ARTICLE_IMAGE &&
      (!article.image || article.image === DEFAULT_ARTICLE_IMAGE);

    articleMap.set(article.name, {
      ...baseArticle,
      ...article,
      image: shouldKeepBaseImage ? baseArticle.image : article.image,
    });
  });

  return Array.from(articleMap.values());
};

export const upsertStoredArticle = (article) => {
  const normalizedArticle = normalizeArticle(article);
  const storedArticles = getStoredArticles();
  const existingArticleIndex = storedArticles.findIndex(
    (storedArticle) => normalizeArticle(storedArticle).name === normalizedArticle.name
  );

  const nextArticles =
    existingArticleIndex >= 0
      ? storedArticles.map((storedArticle, index) =>
          index === existingArticleIndex ? normalizedArticle : storedArticle
        )
      : [...storedArticles, normalizedArticle];

  saveStoredArticles(nextArticles);
  return normalizedArticle;
};
