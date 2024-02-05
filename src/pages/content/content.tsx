import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";
import { elements, ids, selectors } from "@src/pages/content/elements";
import CreateLeadBtn from "@src/pages/content/components/CreateLeadBtn";
import { cleanLabel, setStorageValue } from "@src/pages/content/utils";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { EmailDetails } from "@root/src/pages/content/types";

refreshOnUpdate("pages/content");

let initializedTabId = "";

chrome.runtime.onMessage.addListener(({ tabId, token }) => {
  setStorageValue({ token });
  init(tabId);
});

const init = async (tabId) => {
  if (tabId !== initializedTabId) {
    const { showDetailsBtn, leadCreatorEl } = elements();

    if (leadCreatorEl) {
      leadCreatorEl.remove();
    }
    showDetailsBtn.click();
    showDetailsBtn.click();

    const { detailsCard, avatar } = elements();

    const tableRows = detailsCard.querySelectorAll(selectors.tableRow);

    const emailDetails = {} as EmailDetails;
    emailDetails.avatar = avatar?.getAttribute("src");
    tableRows?.forEach((row) => {
      const tds = row.querySelectorAll("td");
      if (tds.length === 2) {
        const label = cleanLabel(tds[0]?.innerText);

        const hoverCardEls = tds[1].querySelectorAll(selectors.hovercardId);

        let value = tds[1]?.innerText;
        if (hoverCardEls.length > 0) {
          //@ts-ignore
          value = {
            email: hoverCardEls[0].getAttribute("email"),
            name: hoverCardEls[0].getAttribute("name"),
          };
        }
        if (label && value) {
          emailDetails[label] = value;
        }
      }
    });

    const root = document.createElement("div");
    root.id = ids.shadowRoot;
    const rootIntoShadow = document.createElement("div");
    rootIntoShadow.id = ids.leadCreator;
    const shadowRoot = root.attachShadow({ mode: "open" });

    shadowRoot.appendChild(rootIntoShadow);

    const cache = createCache({
      container: shadowRoot,
      key: "test",
      prepend: false,
    });

    attachTwindStyle(rootIntoShadow, shadowRoot);
    createRoot(rootIntoShadow).render(
      <CacheProvider value={cache}>
        <CreateLeadBtn emailDetails={emailDetails} />
      </CacheProvider>
    );
    document.body.append(root);

    initializedTabId = tabId;
  }
};
