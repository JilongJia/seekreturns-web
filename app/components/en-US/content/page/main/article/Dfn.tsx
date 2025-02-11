type DfnProps = { children: React.ReactNode; className?: string };

export function Dfn({ children, className }: DfnProps) {
  return <dfn className={className}>{children}</dfn>;
}
