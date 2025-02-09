"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./TableOfContents.module.css";

type Heading = {
  id: string;
  label: string;
  subHeadings?: Heading[];
};

type TableOfContentsProps = {
  className?: string;
};

function structureHeadings(headingElements: HTMLHeadingElement[]): Heading[] {
  const structuredHeadings: Heading[] = [];
  headingElements.forEach((headingElement) => {
    if (headingElement.tagName === "H2") {
      structuredHeadings.push({
        id: headingElement.id,
        label: headingElement.innerText,
      });
    } else if (headingElement.tagName === "H3") {
      const lastH2 = structuredHeadings[structuredHeadings.length - 1];
      if (lastH2) {
        if (!lastH2.subHeadings) lastH2.subHeadings = [];
        lastH2.subHeadings.push({
          id: headingElement.id,
          label: headingElement.innerText,
        });
      }
    }
  });
  return structuredHeadings;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [structuredHeadings, setStructuredHeadings] = useState<Heading[]>([]);
  const [currentHeadingId, setCurrentHeadingId] = useState<string | null>(null);

  const allHeadingElementsRef = useRef<HTMLHeadingElement[]>([]);
  const headingEntryRef = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    const mainArticle = document.querySelector("main article");
    if (!mainArticle) return;
    allHeadingElementsRef.current = Array.from(
      mainArticle.querySelectorAll("h2, h3"),
    ).filter(
      (headingElement) => !headingElement.closest(`.${styles.toc}`),
    ) as HTMLHeadingElement[];
    setStructuredHeadings(structureHeadings(allHeadingElementsRef.current));
  }, []);

  useEffect(() => {
    const getHeadingElementIndex = (id: string) => {
      return allHeadingElementsRef.current.findIndex(
        (headingElement) => headingElement.id === id,
      );
    };

    const handleIntersections = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingEntryRef.current[entry.target.id] = entry;
      });

      const visibleEntries: IntersectionObserverEntry[] = [];
      for (const id in headingEntryRef.current) {
        if (headingEntryRef.current[id].isIntersecting)
          visibleEntries.push(headingEntryRef.current[id]);
      }

      if (visibleEntries.length > 0) {
        visibleEntries.sort(
          (a, b) =>
            getHeadingElementIndex(a.target.id) -
            getHeadingElementIndex(b.target.id),
        );
        setCurrentHeadingId(visibleEntries[0].target.id);
      } else {
        const activeIndex = allHeadingElementsRef.current.findIndex(
          (headingElement) => headingElement.id === currentHeadingId,
        );
        if (activeIndex === -1) return;
        const activeHeadingElement = allHeadingElementsRef.current[activeIndex];
        if (activeHeadingElement.getBoundingClientRect().y <= 100) return;

        if (activeIndex > 0)
          setCurrentHeadingId(
            allHeadingElementsRef.current[activeIndex - 1].id,
          );
        else setCurrentHeadingId(null);
      }
    };

    const observer = new IntersectionObserver(handleIntersections, {
      root: null,
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0,
    });

    allHeadingElementsRef.current.forEach((headingElement) =>
      observer.observe(headingElement),
    );

    return () => {
      allHeadingElementsRef.current.forEach((headingElement) =>
        observer.unobserve(headingElement),
      );
      observer.disconnect();
    };
  }, [currentHeadingId]);

  return (
    <nav aria-labelledby="table-of-contents-heading" className={className}>
      <h2 id="table-of-contents-heading" className={styles.h2}>
        On this page
      </h2>
      <menu className={styles.primaryMenu}>
        {structuredHeadings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              aria-current={
                heading.id === currentHeadingId ? "true" : undefined
              }
              className={clsx(styles.primaryMenuItemLink, {
                [styles.current]: heading.id === currentHeadingId,
              })}
            >
              {heading.label}
            </Link>
            {heading.subHeadings && (
              <menu className={styles.secondaryMenu}>
                {heading.subHeadings.map((subHeading) => (
                  <li key={subHeading.id}>
                    <Link
                      href={`#${subHeading.id}`}
                      aria-current={
                        subHeading.id === currentHeadingId ? "true" : undefined
                      }
                      className={clsx(styles.secondaryMenuItemLink, {
                        [styles.current]: subHeading.id === currentHeadingId,
                      })}
                    >
                      {subHeading.label}
                    </Link>
                  </li>
                ))}
              </menu>
            )}
          </li>
        ))}
      </menu>
    </nav>
  );
}
