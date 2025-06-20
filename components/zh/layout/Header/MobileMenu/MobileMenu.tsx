"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useReducer, useEffect } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import { PrimaryMenu } from "./PrimaryMenu";

import type { PrimaryMenuData } from "../menu.types";
import styles from "./MobileMenu.module.css";

type MobileMenuProps = { menuItems: PrimaryMenuData; className?: string };

type State = {
  mobileMenuOpen: boolean;
  knowledgeExpanded: boolean;
  toolsExpanded: boolean;
  blogExpanded: boolean;
};
type Action = { type: string };

const initialState: State = {
  mobileMenuOpen: false,
  knowledgeExpanded: false,
  toolsExpanded: false,
  blogExpanded: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle_mobile_menu":
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen,
        knowledgeExpanded: state.mobileMenuOpen
          ? false
          : state.knowledgeExpanded,
        toolsExpanded: state.mobileMenuOpen ? false : state.toolsExpanded,
        blogExpanded: state.mobileMenuOpen ? false : state.blogExpanded,
      };
    case "close_mobile_menu":
      return { ...initialState };
    case "toggle_knowledge":
      return { ...state, knowledgeExpanded: !state.knowledgeExpanded };
    case "toggle_tools":
      return { ...state, toolsExpanded: !state.toolsExpanded };
    case "toggle_blog":
      return { ...state, blogExpanded: !state.blogExpanded };
    default:
      return state;
  }
}

export function MobileMenu({ menuItems, className }: MobileMenuProps) {
  const [
    { mobileMenuOpen, knowledgeExpanded, toolsExpanded, blogExpanded },
    dispatch,
  ] = useReducer(reducer, initialState);

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
      blog: { state: blogExpanded, action: { type: "toggle_blog" } },
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
          {mobileMenuOpen ? "关闭主菜单" : "打开主菜单"}
        </span>
        {mobileMenuOpen ? (
          <LuX aria-hidden={true} className={styles.icon} />
        ) : (
          <LuMenu aria-hidden={true} className={styles.icon} />
        )}
      </button>

      {mobileMenuOpen && (
        <PrimaryMenu
          id="mobile-menu"
          menuItems={menuItems}
          menuStateAndAction={menuStateAndAction}
          className={styles.menu}
          dispatch={dispatch}
        />
      )}
    </nav>
  );
}
