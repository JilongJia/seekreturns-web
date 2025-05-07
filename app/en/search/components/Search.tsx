"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useSearchBox, Hits } from "react-instantsearch";
import type { Hit as AlgoliaHit } from "instantsearch.js";
import styles from "./Search.module.css";

import { useSearchParams } from "next/navigation";

const searchClient = algoliasearch(
  "6FHGGJDYNI",
  "dad7707f2d3adfdfefec3827f27d9563",
);

function CustomSearchBox() {
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

function Hit({ hit }: { hit: AlgoliaHit }) {
  return (
    <div>
      <h2>{hit.title}</h2>
      <p>{hit.snippet}</p>
      <a href={hit.url}>Read more →</a>
    </div>
  );
}

export function Search() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  return (
    <InstantSearchNext
      indexName="informational_pages"
      searchClient={searchClient}
      initialUiState={{
        informational_pages: { query: initialQuery },
      }}
    >
      <CustomSearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearchNext>
  );
}
