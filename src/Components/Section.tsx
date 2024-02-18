import { ReactNode } from "react";
import { useDogs } from "./Providers/DogsProvider";
import { TActiveTabState } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const {
    numOfFavorited,
    numOfUnfavorited,
    activeTabState,
    setActiveTabState,
  } = useDogs();
  const isLinkActive = (tabState: TActiveTabState): "active" | "" =>
    activeTabState === tabState ? "active" : "";
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${isLinkActive("favorited")}`}
            onClick={() => {
              activeTabState === "favorited"
                ? setActiveTabState("all-dogs")
                : setActiveTabState("favorited");
            }}
          >
            favorited ( {numOfFavorited} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${isLinkActive("unfavorited")}`}
            onClick={() => {
              activeTabState === "unfavorited"
                ? setActiveTabState("all-dogs")
                : setActiveTabState("unfavorited");
            }}
          >
            unfavorited ( {numOfUnfavorited} )
          </div>
          <div
            className={`selector ${isLinkActive("create-dog")}`}
            onClick={() => {
              activeTabState === "create-dog"
                ? setActiveTabState("all-dogs")
                : setActiveTabState("create-dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
