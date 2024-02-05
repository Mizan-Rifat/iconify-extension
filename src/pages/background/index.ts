chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log({ info });

  if (tab.status === "complete") {
    chrome.tabs.sendMessage(tabId, {});
  }
});
