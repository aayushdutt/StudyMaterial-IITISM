const URL = "https://api.sheety.co/4d6ce4fa-451d-4b6f-b4fb-55c7fffd999c";

const inputs = document.querySelectorAll(".control");
const submitButton = document.querySelector("button.button");
const fail = document.querySelector("#fail");
const pass = document.querySelector("#pass");
const loading = document.querySelector("#loading");

new Tablesort(document.getElementById("table-id"));

submitButton.addEventListener("click", function(e) {
  e.preventDefault();
  var inputValues = getInputValues();
  pass.classList.add("hidden");
  fail.classList.add("hidden");
  loading.classList.remove("hidden");

  fetch(URL)
    .then(data => data.json())
    .then(fetchedData => {
      removeExistingRows();
      var matchedData = getMatchedData(inputValues, fetchedData);

      if (matchedData.length === 0) {
        loading.classList.add("hidden");
        fail.classList.remove("hidden");
        return;
      }

      insertRows(matchedData);
    });
});

function getInputValues() {
  var inputValues = {
    branch: inputs[0].children[0].value,
    year: inputs[1].children[0].value,
    semester: inputs[2].children[0].value
  };

  return inputValues;
}

function getMatchedData(inputData, apiData) {
  console.log(inputData, apiData);
  var { branch, year, semester } = inputData;
  var matchedData = [];
  apiData.forEach(paper => {
    if (
      paper.branch === branch &&
      paper.year == year &&
      paper.semester == semester
    )
      matchedData.push(paper);
  });

  return matchedData;
}

function removeExistingRows() {
  var length = document.getElementById("table-id").rows.length;

  for (var i = 1; i < length; i++) {
    document.getElementById("table-id").deleteRow(i);
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
  a.href = data.uploadPaper;
  newCell.appendChild(a);

  var newCell = newRow.insertCell(0);
  var newText = document.createTextNode(data.year);
  newCell.appendChild(newText);

  var newCell = newRow.insertCell(0);
  var newText = document.createTextNode(data.semester);
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
