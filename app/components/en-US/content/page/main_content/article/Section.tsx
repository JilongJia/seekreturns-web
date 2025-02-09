type SectionProps = {
  ariaLabelledby: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ ariaLabelledby, children, className }: SectionProps) {
  return (
    <section aria-labelledby={ariaLabelledby} className={className}>
      {children}
    </section>
  );
}
