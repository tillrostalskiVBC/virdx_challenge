import React from "react";

export interface Tab {
  label: string;
  value: string;
  onClick: () => void;
}

interface Props {
  activeTabValue: string;
  tabs: Tab[];
}

export const TabBar = (props: Props) => {
  const { activeTabValue, tabs } = props;
  return (
    <div className="bg-neutral-light">
      <div className="flex border-b border-neutral-dark">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={
              tab.value !== activeTabValue
                ? tab.onClick
                : () => {
                    return;
                  }
            }
            className={`px-4 py-2 text-sm font-medium text-center transition-colors duration-300 ease-in-out ${
              tab.value === activeTabValue
                ? "text-primary-color border-b-2 border-primary-color"
                : "text-secondary-color hover:border-b"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
