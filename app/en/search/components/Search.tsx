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
    <input
      className={styles.underlineInput}
      type="search"
      value={query}
      onChange={(e) => refine(e.currentTarget.value)}
      placeholder="Search…"
      aria-label="Sitewide search"
      autoComplete="off"
    />
  );
}

function Hits() {
  const { items } = useHits<AlgoliaHit>();

  return (
    <ul className={styles.resultsList}>
      {items.map((hit) => (
        <li key={hit.objectID} className={styles.resultItem}>
          <Link href={hit.pathname} className={styles.resultLink}>
            <div className={styles.resultRow}>
              <div className={styles.label}>{hit.section}</div>
              <div className={styles.content}>
                <h2 className={styles.title}>{hit.title}</h2>
                <p className={styles.description}>{hit.description}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
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
