import { cn } from '@/lib/utils';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  children: React.ReactNode;
}

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  children,
  className,
  style,
  ...rest
}: RevealProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      data-reveal
      className={cn(className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}
