const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        if (results.length) {
          Controller.updateTable({ results, searchTerm: data.query, numberOfResults: results.length });
        }
      });
    });
  },

  updateTable: ({ results, searchTerm, numberOfResults }) => {
    const table = document.getElementById("table-body");
    table.innerHTML = results.reduce((accumulated, result) => {
      const withHighlightedResult = Controller.highlightTerm({ text: result, term: searchTerm });
      return `${accumulated}<tr><td>${withHighlightedResult}</td></tr>`;
    }, '');
    const numberOfResultsDisplay = document.getElementById("resutls-count");
    numberOfResultsDisplay.innerHTML = numberOfResults;
  },

  highlightTerm: ({ text, term }) => {
    return text.replace(new RegExp(term, 'g'), `<span class="font-[AmazonEmber-Bold]">${term}</span>`);
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
