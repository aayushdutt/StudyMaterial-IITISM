const URL = "https://api.sheety.co/988469ba-2db3-4442-9c64-2a6cf398a2fd";

const inputs = document.querySelectorAll(".control");
const fail = document.querySelector("#fail");
const pass = document.querySelector("#pass");
const loading = document.querySelector("#loading");
const inputsFields = document.querySelectorAll("input");
const dropdown = document.querySelector("select");

new Tablesort(document.getElementById("table-id"));

var API_DATA;
initialFetch();
function initialFetch() {
  fetch(URL)
    .then(data => data.json())
    .then(fetchedData => {
      API_DATA = fetchedData;
    });
}

function handleInputChange(e) {
  e.preventDefault();
  var inputValues = getInputValues();
  pass.classList.add("hidden");
  fail.classList.add("hidden");
  if (!inputValues.semester) return;
  loading.classList.remove("hidden");
  removeExistingRows();

  if (!API_DATA) {
    fetch(URL)
      .then(data => data.json())
      .then(fetchedData => {
        API_DATA = fetchedData;
        var matchedData = getMatchedData(inputValues, fetchedData);

        if (matchedData.length === 0) {
          loading.classList.add("hidden");
          fail.classList.remove("hidden");
          return;
        }
        insertRows(matchedData);
      });
  } else {
    var matchedData = getMatchedData(inputValues, API_DATA);

    if (matchedData.length === 0) {
      loading.classList.add("hidden");
      fail.classList.remove("hidden");
      return;
    }

    insertRows(matchedData);
  }
}

dropdown.addEventListener("change", e => handleInputChange(e));
inputsFields[0].addEventListener("keyup", e => handleInputChange(e));
inputsFields[0].addEventListener("change", e => handleInputChange(e));
inputsFields[1].addEventListener("keyup", e => handleInputChange(e));
inputsFields[1].addEventListener("change", e => handleInputChange(e));

function getInputValues() {
  var inputValues = {
    branch: inputs[0].children[0].value,
    semester: inputs[1].children[0].value,
    year: inputs[2].children[0].value
  };

  return inputValues;
}

function getMatchedData(inputData, apiData) {
  var { branch, year, semester } = inputData;
  var matchedData = [];

  if (semester == 1 || semester == 2) {
    if (!year) {
      apiData.forEach(paper => {
        if (paper.semester == 1 || paper.semester == 2) matchedData.push(paper);
      });
    } else {
      apiData.forEach(paper => {
        if (paper.year == year && (paper.semester == 1 || paper.semester == 2) ) 
          matchedData.push(paper);
      });
    }

    return matchedData;
  }

  if (!year) {
    apiData.forEach(paper => {
      if (paper.branch === branch && paper.semester == semester)
        matchedData.push(paper);
    });
  } else {
    apiData.forEach(paper => {
      if (
        paper.branch === branch &&
        paper.year == year &&
        paper.semester == semester
      )
        matchedData.push(paper);
    });
  }

  return matchedData;
}

function removeExistingRows() {
  var tableBody = document.getElementById("table-body");
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

function insertRow(data) {
  var tableRef = document.getElementById("table-body");
  var newRow = tableRef.insertRow(tableRef.rows.length);

  var newCell = newRow.insertCell(0);
  var a = document.createElement("a");
  a.className += " button";
  var linkText = document.createTextNode("Download");
  a.appendChild(linkText);
  a.title = "Download";
  a.href = data.uploadStudyMaterial;
  newCell.appendChild(a);

  var newCell = newRow.insertCell(0);
  var newText = document.createTextNode(data.year);
  newCell.appendChild(newText);

  var newCell = newRow.insertCell(0);
  var newText = document.createTextNode(data.type);
  newCell.appendChild(newText);

  var newCell = newRow.insertCell(0);
  var newText = document.createTextNode(data.subject);
  newCell.appendChild(newText);
}

function insertRows(matchedData) {
  matchedData.forEach(paper => {
    insertRow(paper);
  });
  loading.classList.add("hidden");
  pass.classList.remove("hidden");
}


// "Offline copy of pages" Strategy
// Register Service Worker
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("sw.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}
