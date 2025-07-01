import { Th } from "./Th";

type TrProps = { children: React.ReactNode; className?: string };

export function Tr({ children, className }: TrProps) {
  return <tr className={className}>{children}</tr>;
}

Tr.Th = Th;
