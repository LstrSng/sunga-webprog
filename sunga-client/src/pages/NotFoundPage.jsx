import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
      
      <div className="w-full rounded-[2rem] border border-zinc-200 bg-white px-8 py-12 shadow-sm">
        
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600">
          Error 404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-zinc-900 sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-700 sm:text-base">
          The page you’re looking for doesn’t exist or may have been moved.
          Please check the URL or navigate back to continue browsing.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            Back Home
          </Button>
          <Button to="/articles" variant="secondary">
            Browse Articles
          </Button>
        </div>

      </div>
    </div>
  );
}

export default NotFoundPage;