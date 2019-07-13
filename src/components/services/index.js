import config from "../../configs";

function fetchResults(str, successCallback, errorCallback) {
  str = str.toLowerCase();
  let url = config("search");

  fetch(url)
    .then(response => response.json())
    .then(results => {
      let refinedResponse = refineResponse(str, results);
      console.log(refinedResponse);

      successCallback(refinedResponse);
    })
    .catch(err => {
      console.error(err);
      errorCallback(err);
    });
}

function refineResponse(str, results) {
  const primary = [],
    secondary = [];
  results.forEach(result => {
    const values = Object.values(result)
      .join("")
      .toLowerCase();

    if (result.name.toLowerCase().includes(str)) {
      primary.push(result);
    } else if (values.includes(str)) {
      secondary.push(result);
    }
  });

  return {
    primary,
    secondary
  };
}

export default fetchResults;
