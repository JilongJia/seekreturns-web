"use client";

import Link from "next/link";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useSearchBox, useHits, Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import type { Hit as AlgoliaHit } from "instantsearch.js";

import styles from "./Search.module.css";

const searchClient = algoliasearch(
  "6FHGGJDYNI",
  "dad7707f2d3adfdfefec3827f27d9563",
);

function SearchBox() {
  const { query, refine } = useSearchBox();

  return (
    <form
      aria-label="Sitewide search"
      role="search"
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="search-input" className={styles.label}>
        Your Search
      </label>
      <input
        id="search-input"
        className={styles.input}
        type="search"
        placeholder="Search…"
        autoComplete="off"
        value={query}
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </form>
  );
}

function Hits() {
  const { items } = useHits<AlgoliaHit>();

  return (
    <section aria-labelledby="search-results">
      <h1 id="search-results" className={styles.h1}>
        Your Search Results
      </h1>
      <ol className={styles.ol}>
        {items.map((hit) => (
          <li key={hit.objectID} className={styles.li}>
            <Link href={hit.pathname} className={styles.link}>
              <article className={styles.article}>
                <div className={styles.sectionLabel}>{hit.section}</div>
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
              ? `Search Results for “${query}” - Seek Returns`
              : "Search - Seek Returns";
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
      <Configure filters="language:English" hitsPerPage={10} />
      <SearchBox />
      <Hits />
    </InstantSearchNext>
  );
}
