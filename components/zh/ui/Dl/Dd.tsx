import { P } from "./P";

type DdProps = { children: React.ReactNode; className?: string };

export function Dd({ children, className }: DdProps) {
  return <dd className={className}>{children}</dd>;
}

Dd.P = P;
