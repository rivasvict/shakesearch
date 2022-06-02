const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results);
      });
    });
  },

  updateTable: (results) => {
    const table = document.getElementById("table-body");
    table.innerHTML = results.reduce((accumulated, result) => {
      return `${accumulated}<tr><td>${result}</td></tr>`;
    }, '');
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
