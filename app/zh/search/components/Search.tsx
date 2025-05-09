"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useSearchBox, useHits, Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import type { Hit as AlgoliaHit } from "instantsearch.js";

import styles from "./Search.module.css";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
);

function SearchBox() {
  const { query, refine } = useSearchBox();
  const [isComposing, setIsComposing] = useState(false);
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
    if (!isComposing) {
      refine(value);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    setIsComposing(false);
    refine(e.currentTarget.value);
  };

  return (
    <form
      aria-label="全站搜索"
      role="search"
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="search-input" className={styles.label}>
        搜索
      </label>
      <input
        id="search-input"
        className={styles.input}
        type="search"
        placeholder="搜索……"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </form>
  );
}

function Hits() {
  const { items } = useHits<AlgoliaHit>();

  return (
    <section aria-labelledby="search-results">
      <h1 id="search-results" className={styles.h1}>
        搜索结果
      </h1>
      <ol className={styles.ol}>
        {items.map((hit) => (
          <li key={hit.objectID} className={styles.li}>
            <Link href={hit.pathname} className={styles.link}>
              <article className={styles.article}>
                <div className={styles.sectionName}>{hit.section}</div>
                <div className={styles.content}>
                  <h2 className={styles.h2}>{hit.title}</h2>
                  <p className={styles.p}>{hit.description}</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Search() {
  const indexName = "informational_pages";

  return (
    <InstantSearchNext<
      Record<typeof indexName, { query?: string }>,
      { q?: string }
    >
      indexName={indexName}
      searchClient={searchClient}
      routing={{
        router: {
          cleanUrlOnDispose: false,
          windowTitle(routeState) {
            const query = routeState.q;
            return query
              ? `“${query}” 的搜索结果 – Seek Returns`
              : "搜索 - Seek Returns";
          },
        },
        stateMapping: {
          stateToRoute(uiState) {
            const indexUiState = uiState[indexName];
            return {
              q: indexUiState.query,
            };
          },
          routeToState(routeState) {
            return {
              [indexName]: {
                query: routeState.q,
              },
            };
          },
        },
      }}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure filters="language:中文" hitsPerPage={10} />
      <SearchBox />
      <Hits />
    </InstantSearchNext>
  );
}
