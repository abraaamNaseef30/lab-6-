const API_URL = "https://brianobruno.github.io/cats.json";

async function loadCats() {
  const status = document.getElementById("status");
  status.textContent = "";
  try {

    const response = await fetch(API_URL, { method: "GET" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();

    const facts = data.facts.slice().sort((a, b) => a.factId - b.factId);

    const tbody = document.querySelector("#factsTable tbody");
    tbody.innerHTML = "";
    facts.forEach(f => {
      const tr = document.createElement("tr");
      const tdId = document.createElement("td");
      const tdFact = document.createElement("td");
      tdId.textContent = f.factId;
      tdFact.textContent = f.text;
      tr.append(tdId, tdFact);
      tbody.appendChild(tr);
    });

    document.getElementById("catPic").src = data.catPhoto;
  } catch (err) {
    status.textContent = "Could not load data: " + err.message;
  }
}

document.getElementById("loadBtn").addEventListener("click", loadCats);