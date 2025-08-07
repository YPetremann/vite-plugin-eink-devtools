function htmlDevtools() {
  const devtools = document.body.appendChild(document.createElement("div"));
  devtools.style.background = "white";
  devtools.style.position = "fixed";
  devtools.style.bottom = "-1px";
  devtools.style.left = "0";
  devtools.style.right = "0";

  // we target Android Browser
  const tabBar = devtools.appendChild(document.createElement("div"));
  tabBar.style.padding = "4px 0px";
  tabBar.style.borderTop = "1px solid silver";
  tabBar.style.borderBottom = "1px solid silver";
  const tabArea = devtools.appendChild(document.createElement("div"));
  const tabs = {}
  var currentTab = null;
  function toggleTab(name) {
    // close tab if it is already open
    if (currentTab === name) name = null;
    if (currentTab) {
      const prev = tabs[currentTab];
      prev.tab.style.borderBottomColor = "silver";
      prev.content.style.display = "none";
    }
    if (name) {
      const next = tabs[name];
      next.tab.style.borderBottomColor = "white";
      next.content.style.display = "block";
      devtools.style.bottom = "0px";
    } else {
      devtools.style.bottom = "-1px";
    }

    currentTab = name
  }
  function createTab(name) {
    const tab = tabBar.appendChild(document.createElement("a"))
    tab.style.margin = "0";
    tab.style.padding = "4px 8px";
    tab.style.borderRight = "1px solid silver";
    tab.style.borderBottom = "1px solid silver";
    tab.textContent = name;
    tab.addEventListener("click", function () {
      toggleTab(name)
    });
    const content = tabArea.appendChild(document.createElement("div"));
    content.style.display = "none";
    content.style.height = "250px";
    tabs[name] = { tab: tab, content: content }
    return content
  }
  const consoleTab = createTab("Console");
  consoleTab.style.position = "relative";

  // add a toolbar with a button to clear the console
  const toolbar = consoleTab.appendChild(document.createElement("div"));
  toolbar.style.padding = "4px 8px";
  toolbar.style.borderBottom = "1px solid silver";

  const logCont = consoleTab.appendChild(document.createElement("div"));
  logCont.style.overflowY = "hidden";
  logCont.style.maxHeight = "215px";
  logCont.style.position = "relative";

  const logScrollUp = consoleTab.appendChild(document.createElement("Button"));
  logScrollUp.style.border = "none";
  logScrollUp.style.padding = "0";
  logScrollUp.style.width = "25px";
  logScrollUp.style.height = "25px";
  logScrollUp.style.position = "absolute";
  logScrollUp.style.right = "-1px";
  logScrollUp.style.top = "40px";
  logScrollUp.textContent = "▲";
  const logScrollDown = consoleTab.appendChild(document.createElement("Button"));
  logScrollDown.style.border = "none";
  logScrollDown.style.padding = "0";
  logScrollDown.style.width = "25px";
  logScrollDown.style.height = "25px";
  logScrollDown.style.position = "absolute";
  logScrollDown.style.right = "-1px";
  logScrollDown.style.bottom = "0px";
  logScrollDown.textContent = "▼";

  const logs = logCont.appendChild(document.createElement("div"));
  logs.style.whiteSpace = "pre-wrap";
  logs.style.fontFamily = "monospace";
  logs.style.paddingBottom = "100px";

  logScrollUp.addEventListener("click", function () {
    logCont.scrollTop = Math.max(0, logCont.scrollTop - 200);
  });
  logScrollDown.addEventListener("click", function () {
    logCont.scrollTop = Math.min(logCont.scrollHeight, logCont.scrollTop + 200);
  });
  const clearButton = toolbar.appendChild(document.createElement("button"));
  clearButton.textContent = "Clear";
  clearButton.style.padding = "4px 8px";
  clearButton.style.border = "none";
  clearButton.addEventListener("click", function () {
    logs.innerHTML = "";
  })

  function log(background, border, msg) {
    const line = logs.appendChild(document.createElement("div"));
    line.style.borderTop = "1px solid black";
    line.style.borderBottom = "1px solid black";
    line.style.paddingRight = "25px";
    line.style.padding = "0px 25px 2px 4px";
    line.style.background = background;
    line.style.borderColor = border;
    if (typeof msg === "string") line.textContent = msg;
    else if (typeof msg === "undefined") line.textContent = "undefined";
    else line.textContent = JSON.stringify(msg);
  }

  console.log = function (msg) { log("white", "silver", msg); };
  console.error = function (msg) { log("#FFAAAA", "red", msg); };
  console.info = function (msg) { log("#AAAAFF", "blue", msg); };
  console.warn = function (msg) { log("#FFDDAA", "#FF7700", msg); };
  console.debug = function (msg) { log("white", "silver", msg); };

  window.addEventListener("error", function (event) {
    console.error(event.message + "\n" + event.filename + ":" + event.lineno + ":" + event.colno);
    console.error(JSON.stringify(Object.keys(event), null, 2));
  });
}
if (navigator.userAgent.match(/Kobo eReader/)) htmlDevtools();
