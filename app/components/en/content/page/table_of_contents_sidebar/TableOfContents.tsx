"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./TableOfContents.module.css";

type SubHeadingsData = { id: string; label: string }[];

export type TableOfContentsData = {
  id: string;
  label: string;
  subHeadingsData?: SubHeadingsData;
}[];

type TableOfContentsProps = { data: TableOfContentsData; className?: string };

export function TableOfContents({ data, className }: TableOfContentsProps) {
  const [currentHeadingId, setCurrentHeadingId] = useState<string | null>(null);
  const allHeadingElementsRef = useRef<HTMLHeadingElement[]>([]);
  const headingEntryRef = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    allHeadingElementsRef.current = data.flatMap((h2) => {
      const h2Element = document.getElementById(h2.id) as HTMLHeadingElement;
      const h3Elements =
        h2.subHeadingsData?.map(
          (h3) => document.getElementById(h3.id) as HTMLHeadingElement,
        ) || [];

      return [h2Element, ...h3Elements].filter(Boolean);
    });
  }, [data]);

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

      const visibleEntries = Object.values(headingEntryRef.current).filter(
        (entry) => entry.isIntersecting,
      );

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
      <ul className={styles.primaryMenu}>
        {data.map((h2) => (
          <li key={h2.id}>
            <Link
              href={`#${h2.id}`}
              aria-current={h2.id === currentHeadingId ? "true" : undefined}
              className={clsx(styles.primaryMenuItemLink, {
                [styles.current]: h2.id === currentHeadingId,
              })}
            >
              {h2.label}
            </Link>
            {h2.subHeadingsData && (
              <ul className={styles.secondaryMenu}>
                {h2.subHeadingsData.map((h3) => (
                  <li key={h3.id}>
                    <Link
                      href={`#${h3.id}`}
                      aria-current={
                        h3.id === currentHeadingId ? "true" : undefined
                      }
                      className={clsx(styles.secondaryMenuItemLink, {
                        [styles.current]: h3.id === currentHeadingId,
                      })}
                    >
                      {h3.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
