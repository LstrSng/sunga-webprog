import Button from '../components/Button';

const features = [
  {
    title: 'Brand Identity Direction',
    description:
      'From logos to visual systems, every project begins with a strong concept and a refined visual attitude.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Editorial-Led Layouts',
    description:
      'Structured pages, stronger rhythm, and elegant spacing help every screen feel considered and premium.',
    image:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Experience-Focused Storytelling',
    description:
      'Design becomes more memorable when content, imagery, and hierarchy work together with intention.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
];

const stats = [
  { value: '12+', label: 'Brand Projects' },
  { value: '08', label: 'Design Systems' },
  { value: '24', label: 'Creative Concepts' },
  { value: '04', label: 'Core Services' },
];

const HomePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
        <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
              Creative Digital Studio
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
              Designing refined digital spaces with clarity, mood, and intent.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
              LS Studio creates polished brand and editorial-inspired interfaces
              that blend storytelling, modern structure, and strong visual rhythm.
              Every screen is designed to feel elevated and memorable.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                Explore Studio
              </Button>
              <Button to="/articles" variant="secondary">
                Read Articles
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80"
              alt="Modern workspace with creative design materials"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <p className="text-3xl font-bold tracking-tight text-zinc-900">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
              Featured Strengths
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              Built for elegant, image-rich storytelling
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-zinc-600">
            This version keeps the site bright and clean while still feeling more
            premium through refined spacing, strong hierarchy, and better image use.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {feature.description}
                </p>
                <Button className="mt-5" variant="primary">
                  View More
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;