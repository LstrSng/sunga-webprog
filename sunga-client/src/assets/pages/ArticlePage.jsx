import Button from '../components/Button';

const articles = [
  {
    category: 'Branding',
    title: 'How visual identity shapes a memorable digital first impression',
    description:
      'A look at how logo systems, type choices, and visual tone influence trust from the very first screen.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Layouts',
    title: 'Building clean landing pages with stronger content hierarchy',
    description:
      'Why spacing, section pacing, and visual grouping are what make a homepage feel premium instead of crowded.',
    image:
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'UX Writing',
    title: 'Designing with narrative so each section feels intentional',
    description:
      'Good pages do not just look organized. They guide attention with rhythm, copy, and meaningful transitions.',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Creative Process',
    title: 'From rough wireframe to polished interface: what changes most',
    description:
      'The shift from placeholder blocks to real imagery and refined language is where visual confidence appears.',
    image:
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80',
  },
];

const ArticlePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm sm:px-8 lg:px-10 lg:py-12">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
          Journal & Insights
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
          Articles on branding, editorial layouts, and modern digital storytelling.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
          This lighter version gives the articles page a clean editorial feel
          with stronger visuals, better spacing, and a more polished card layout.
        </p>

        <div className="mt-8">
          <Button to="/" variant="primary">
            Back Home
          </Button>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
            Featured Articles
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
            A cleaner premium editorial grid
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article, index) => (
            <article
              key={article.title}
              className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50"
            >
              <img
                src={article.image}
                alt={article.title}
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {article.category} · 0{index + 1}
                </p>

                <h3 className="mt-3 text-lg font-semibold leading-7 text-zinc-900">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {article.description}
                </p>

                <Button className="mt-5" variant="primary">
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;