export type MainContentProps = {
  pathname: string;
  className?: string;
};

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

export function Main({ children, className }: MainProps) {
  return <main className={className}>{children}</main>;
}
