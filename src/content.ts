import React from "react";
import ReactDOM from "react-dom/client";
import browser from "webextension-polyfill";
import TaskHubPage from "./pages/taskhub/taskhub.page";

browser.runtime.onMessage.addListener((message) => {
    console.log("Message received", message);   
  if (message.type === "APPEND_ELEMENT") {
    injectTaskHubTab();
  }

  if (message.type === "ADD_ELEMENT") {
    addAsideElement(message.querySelector);
  }
});

function injectTaskHubTab() {
  const nav = document.querySelector("nav.js-repo-nav ul.UnderlineNav-body");
  if (!nav) return;

  if (document.querySelector("#task-hub-tab")) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <a id="task-hub-tab"
       href="#task-hub"
       class="UnderlineNav-item no-wrap js-responsive-underlinenav-item text-white"
       data-view-component="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <path d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/> <path d="M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z" stroke="#ffffff" stroke-width="1.5"/> <path d="M9.5 13.4L10.9286 15L14.5 11" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>
        </svg>
      <span data-content="Task Hub">Task Hub</span>
    </a>
  `;
  nav.appendChild(li);

  const tab = li.querySelector<HTMLAnchorElement>("#task-hub-tab");
  tab?.addEventListener("click", (e) => {
    e.preventDefault();

    history.pushState({}, "", "?tab=task-hub");

    renderReactPage();
  });
}

function renderReactPage() {
  const main = document.querySelector(
    "main#repo-content-pjax-container, main#js-repo-pjax-container, main"
  );
  if (!main) return;

  main.innerHTML = "";

  const root = document.createElement("div");
  root.id = "task-hub-root";
  main.appendChild(root);

  const rootInstance = ReactDOM.createRoot(root);
  rootInstance.render(React.createElement(TaskHubPage));
}

function addAsideElement(selector: string) {
  const aside = document.querySelector(selector);
  if (!aside) return;

  const urlElement = document.createElement("div");
  urlElement.style.cssText = `
    padding: 10px;
    margin: 10px 0;
    background: transparent;
    border-radius: 5px;
    font-size: 12px;
    color: white;
    border: 1px solid white;
  `;
  urlElement.innerHTML = `
    <strong>This is Added element</strong><br>
    ${window.location.href}<br>
    <small>${new Date().toLocaleTimeString()}</small>
  `;
  aside.insertBefore(urlElement, aside.firstChild);
}
