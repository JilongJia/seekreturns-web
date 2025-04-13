"use client";

import { useReducer, useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LuMenu, LuX } from "react-icons/lu";

import { primaryMenuData, type PrimaryMenuData } from "@/app/data/en/menu";
import { PrimaryMenu } from "./mobile_menu/PrimaryMenu";
import styles from "./MobileMenu.module.css";

type State = Record<string, boolean>;
type Action = Record<"type", string>;
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
          <LuMenu aria-hidden={true} className={styles.icon} />
        ) : (
          <LuX aria-hidden={true} className={styles.icon} />
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
