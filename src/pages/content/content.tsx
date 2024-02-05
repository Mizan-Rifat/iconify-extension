import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { classNames, getElement, selectors } from "./elements";
refreshOnUpdate("pages/content");
import { attachTwindStyle } from "@src/shared/style/twind";
import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import IconName from "./components/IconName";

chrome.runtime.onMessage.addListener(() => {
  setTimeout(() => {
    init();
  }, 1000);
});

const attchShadowDom = (node: ReactNode) => {
  const root = document.createElement("div");
  root.classList.add(classNames.iconName);
  const shadowRoot = root.attachShadow({ mode: "open" });

  const rootIntoShadow = document.createElement("div");
  shadowRoot.appendChild(rootIntoShadow);

  attachTwindStyle(rootIntoShadow, shadowRoot);
  createRoot(rootIntoShadow).render(node);

  return { root, shadowRoot };
};

const init = async () => {
  const wrapper = getElement(selectors.wrapper);

  if (wrapper) {
    const added = getElement(selectors.nameDiv);

    if (!added) {
      const valueContaier = wrapper.querySelector(
        selectors.valueContainer
      ) as HTMLTextAreaElement;

      const match = valueContaier?.value?.match(/"([^"]+)"/);

      if (match) {
        const value = match[1];
        if (value) {
          const codeSample = getElement(selectors.codeSampleDiv);

          const { root } = attchShadowDom(<IconName value={value} />);

          codeSample.appendChild(root);
        }
      }
    }
  }
};
