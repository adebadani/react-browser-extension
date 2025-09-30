import browser from "webextension-polyfill";

const injectedTabs = new Set();

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && !tab.url.startsWith("chrome://")) {
    browser.tabs.sendMessage(tabId, { type: "APPEND_ELEMENT" }).catch((e) => {
      console.warn("Gagal kirim pesan ke tab", tabId, e);
    });
  }
});

browser.tabs.onRemoved.addListener((tabId) => {
  console.log("Tab removed", tabId);
  injectedTabs.delete(tabId);
});
