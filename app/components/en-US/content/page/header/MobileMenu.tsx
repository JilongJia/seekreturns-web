"use client";

import { useReducer, useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { primaryMenuData, type PrimaryMenuData } from "@/app/data/en-US/menu";
import { PrimaryMenu } from "./mobile_menu/PrimaryMenu";
import styles from "./MobileMenu.module.css";

type State = Record<string, boolean>;

type Action = Record<"type", string>;

type IconProps = { ariaHidden?: boolean; className?: string };

type MobileMenuProps = { data?: PrimaryMenuData; className?: string };

const initialState = {
  mobileMenuOpen: false,
  knowledgeExpanded: false,
  toolsExpanded: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "toggle_mobile_menu":
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen,
        knowledgeExpanded: state.mobileMenuOpen
          ? false
          : state.knowledgeExpanded,
        toolsExpanded: state.mobileMenuOpen ? false : state.toolsExpanded,
      };
    case "close_mobile_menu":
      return { ...initialState };
    case "toggle_knowledge":
      return { ...state, knowledgeExpanded: !state.knowledgeExpanded };
    case "toggle_tools":
      return { ...state, toolsExpanded: !state.toolsExpanded };
    default:
      return state;
  }
}

function Bars3Icon({ ariaHidden = true, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XMarkIcon({ ariaHidden = true, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function MobileMenu({
  data = primaryMenuData,
  className,
}: MobileMenuProps) {
  const [{ mobileMenuOpen, knowledgeExpanded, toolsExpanded }, dispatch] =
    useReducer(reducer, initialState);

  const pathname = usePathname();
  useEffect(() => {
    dispatch({ type: "close_mobile_menu" });
  }, [pathname]);

  const menuStateAndAction: Record<string, { state: boolean; action: Action }> =
    {
      knowledge: {
        state: knowledgeExpanded,
        action: { type: "toggle_knowledge" },
      },
      tools: { state: toolsExpanded, action: { type: "toggle_tools" } },
    };

  return (
    <nav className={clsx(styles.mobileMenu, className)}>
      <button
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => dispatch({ type: "toggle_mobile_menu" })}
        className={styles.button}
      >
        <span className={styles.screenReaderText}>
          {mobileMenuOpen ? "Close main menu" : "Open main menu"}
        </span>
        {!mobileMenuOpen ? (
          <Bars3Icon className={styles.icon} />
        ) : (
          <XMarkIcon className={styles.icon} />
        )}
      </button>
      {mobileMenuOpen && (
        <PrimaryMenu
          id="mobile-menu"
          data={data}
          menuStateAndAction={menuStateAndAction}
          className={styles.menu}
          dispatch={dispatch}
        />
      )}
    </nav>
  );
}
