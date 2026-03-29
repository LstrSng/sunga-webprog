import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'bg-amber-300 text-zinc-950 hover:bg-amber-200 border-amber-300 shadow-sm',
  secondary:
    'bg-white text-zinc-900 hover:bg-zinc-100 border-zinc-300',
  ghost:
    'bg-transparent text-zinc-900 hover:bg-zinc-100 border-transparent',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-200',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;