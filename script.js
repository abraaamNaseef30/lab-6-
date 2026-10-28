const API_URL = "https://brianobruno.github.io/cats.json";

async function loadCats() {
  const status = document.getElementById("status");
  status.textContent = "";
  try {
    // GET request to the REST API
    const response = await fetch(API_URL, { method: "GET" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();

    // Sort the facts array by factId (1 first ... 5 last)
    const facts = data.facts.slice().sort((a, b) => a.factId - b.factId);

    // Populate the table
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

    // Update the picture that was already on the page
    document.getElementById("catPic").src = data.catPhoto;
  } catch (err) {
    status.textContent = "Could not load data: " + err.message;
  }
}

// Button triggers the API call
document.getElementById("loadBtn").addEventListener("click", loadCats);