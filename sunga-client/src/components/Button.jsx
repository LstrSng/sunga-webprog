import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'bg-zinc-950 text-white hover:bg-zinc-800 border-zinc-950 shadow-sm shadow-zinc-950/10',
  secondary:
    'bg-white text-zinc-900 hover:bg-zinc-100 border-zinc-300 shadow-sm shadow-zinc-950/5',
  ghost:
    'bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 border-transparent',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
  ...props
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
