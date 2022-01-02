const inputEl = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
const leadList = document.getElementById("lead-list");
const saveTab = document.getElementById("save-tab");
const clearBtn = document.querySelector(".clear-btn");
let leadsArray = [];

const savedProspects = localStorage.getItem("Prospects");
const reversed = JSON.parse(savedProspects);

if (savedProspects) {
  leadsArray = reversed;

  renderContent(leadsArray);
}

function renderContent(dataArray) {
  let leadStr = "";
  for (let i = 0; i < dataArray.length; i++) {
    leadStr += `<li><a target="_blank" href='${dataArray[i]}'>${dataArray[i]}</a></li>`;
  }
  leadList.innerHTML = leadStr;
}

inputbtn.addEventListener("click", () => {
  leadsArray.push(`https://${inputEl.value}`);
  localStorage.setItem("Prospects", JSON.stringify(leadsArray));
  inputEl.value = "";

  renderContent(leadsArray);
});

saveTab.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    leadsArray.push(tabs[0].url);
    localStorage.setItem("Prospects", JSON.stringify(leadsArray));
    inputEl.value = "";

    renderContent(leadsArray);
  });
});

clearBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  leadList.innerHTML = "";
});
