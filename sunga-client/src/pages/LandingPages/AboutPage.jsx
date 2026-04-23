import Button from '../../components/Button';

const values = [
  {
    title: 'Intentional Design',
    text: 'Every visual decision is guided by hierarchy, mood, and a clear communication goal.',
  },
  {
    title: 'Human-Centered Storytelling',
    text: 'We shape layouts around how people actually read, browse, and connect with content.',
  },
  {
    title: 'Modern Visual Systems',
    text: 'From typography to spacing, consistency creates the premium feel behind every polished interface.',
  },
];

const gallery = [
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=80',
];

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
        <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-14">
          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200">
            <img
              src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80"
              alt="Designer workspace with sketches and laptop"
              className="h-full min-h-[340px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
              About The Studio
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
              A design practice shaped by clean structure and strong visual atmosphere.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
              LS Studio focuses on digital experiences that feel calm,
              confident, and editorial. The work combines visual storytelling,
              minimalist composition, and thoughtful content flow to create
              modern interfaces with presence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles" variant="secondary">
                Open Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <article
            key={value.title}
            className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-600">
              Studio Value
            </p>

            <h2 className="mt-3 text-xl font-semibold text-zinc-900">
              {value.title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-700">
              {value.text}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
            Process & Perspective
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
            How the studio approaches creative work
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <article className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="text-lg font-semibold text-zinc-900">
                Strategy First
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-700">
                Every project begins with message clarity, audience understanding,
                and a visual direction that supports both brand and usability.
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="text-lg font-semibold text-zinc-900">
                Design With Rhythm
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-700">
                Spacing, contrast, and layout flow are treated as storytelling
                tools, helping each page feel dynamic without becoming crowded.
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="text-lg font-semibold text-zinc-900">
                Refine for Impact
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-700">
                The final layer focuses on polish: typography, imagery, CTA
                treatment, and consistency across every section of the experience.
              </p>
            </article>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-zinc-50"
              >
                <img
                  src={image}
                  alt={`Studio gallery ${index + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;