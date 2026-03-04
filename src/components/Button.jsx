import Link from 'next/link';
import { clsx } from 'clsx';

export const Button = ({
  href,
  color = 'black',
  disabled,
  handleClick,
  children,
  customClasses,
  ...props
}) => {
  const classes = clsx(
    'font-semibold uppercase outline-none px-4 py-2',
    {
      // black
      'text-zinc-50 bg-zinc-950 ring-zinc-950 hover:bg-zinc-800 active:text-zinc-300 focus-visible:ring-2 ring-offset-2 ring-offset-zinc-50':
        color === 'black',
      'bg-zinc-500 text-zinc-600 cursor-default': color === 'black' && disabled,
      // white
      'text-zinc-950 bg-zinc-50 ring-zinc-50 hover:bg-zinc-200 active:text-zinc-700 focus-visible:ring-2 ring-offset-2 ring-offset-zinc-950':
        color === 'white',
      'bg-zinc-300 text-zinc-400 cursor-default': color === 'white' && disabled,
    },
    customClasses
  );

  if (href) {
    return (
      <Link href={disabled ? '' : href} onClick={handleClick} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} onClick={handleClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
