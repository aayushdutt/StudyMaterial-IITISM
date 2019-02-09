const URL = "https://api.sheety.co/4d6ce4fa-451d-4b6f-b4fb-55c7fffd999c";

const inputs = document.querySelectorAll(".control");
const submitButton = document.querySelector("button.button");

submitButton.addEventListener("click", function(e) {
  e.preventDefault();
  var inputValues = getInputValues();

  var apiData;
  fetch(URL)
    .then(data => data.json())
    .then(fetchedData => {
      apiData = fetchedData;
      getMatchedData(inputValues, apiData);
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

  console.log(matchedData);
}
new Tablesort(document.getElementById("table-id"));
