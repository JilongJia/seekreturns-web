type EmProps = { children: React.ReactNode; className?: string };

export function Em({ children, className }: EmProps) {
  return <em className={className}>{children}</em>;
}
