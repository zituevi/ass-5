document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".master-container");
  const btnAll = document.getElementById("btn-all");
  const btnOpen = document.getElementById("btn-open");
  const btnClosed = document.getElementById("btn-closed");
  const searchInput = document.querySelector("input[type='text']");
  const modal = document.getElementById("modal");
  let issuesData = [];
  const showLoader = () => {
    container.innerHTML = `
      <div class="col-span-4 flex flex-col items-center justify-center py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="text-gray-500 mt-4 font-medium">Loading Issues...</p>
      </div>`;
  };

  showLoader();
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      issuesData = data.data;
      updateStats(issuesData, "all");
      displayIssues(issuesData);
    })
    .catch((err) => {
      container.innerHTML = `<p class="col-span-4 text-center text-red-500 py-10">Error loading data. Please check your connection.</p>`;
    });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = issuesData.filter(
      (issue) =>
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query),
    );
    displayIssues(filtered);

    const totalEl = document.querySelector(".text-2xl.font-semibold");
    if (totalEl) totalEl.innerText = filtered.length;
  });

  btnAll.addEventListener("click", () => {
    displayIssues(issuesData);
    updateStats(issuesData, "all");
    setActiveButton(btnAll);
  });

  btnOpen.addEventListener("click", () => {
    const openIssues = issuesData.filter((i) => i.status === "open");
    displayIssues(openIssues);
    updateStats(openIssues, "open");
    setActiveButton(btnOpen);
  });

  btnClosed.addEventListener("click", () => {
    const closedIssues = issuesData.filter((i) => i.status === "closed");
    displayIssues(closedIssues);
    updateStats(closedIssues, "closed");
    setActiveButton(btnClosed);
  });

  function displayIssues(issues) {
    container.innerHTML = "";

    if (issues.length === 0) {
      container.innerHTML = `<p class="col-span-4 text-center py-20 text-gray-400 font-medium">No results found.</p>`;
      return;
    }

    issues.forEach((issue) => {
      const statusIcon =
        issue.status === "closed"
          ? "./assets/closed_status.png"
          : "./assets/open_status.png";

      const borderColor =
        issue.status === "open" ? "border-t-green-500" : "border-t-violet-600";

      const labelsHTML = issue.labels
        .map((label) => {
          const l = label.toLowerCase();
          if (l === "bug") {
            return `
            <div class="poka bg-red-100 rounded-full border border-red-200 px-2 py-1 text-xs">
              <i class="fa-solid fa-bug text-red-600"></i><span class="text-red-600 font-semibold"> BUG</span>
            </div>`;
          }
          if (l === "help wanted") {
            return `
            <div class="help bg-amber-100 rounded-full border border-amber-200 px-2 py-1 text-xs">
              <i class="fa-solid fa-life-ring text-amber-500"></i><span class="text-amber-500 font-semibold"> Help Wanted</span>
            </div>`;
          }
          if (l === "enhancement") {
            return `
            <div class="bg-blue-100 rounded-full border border-blue-200 px-2 py-1 text-xs">
              <i class="fa-solid fa-wand-magic-sparkles text-blue-600"></i><span class="text-blue-600 font-semibold"> Enhancement</span>
            </div>`;
          }
          return `<span class="badge badge-ghost">${label}</span>`;
        })
        .join("");

      const card = document.createElement("div");

      card.className = `bg-white rounded-xl p-4 cursor-pointer border-t-4 ${borderColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full`;

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <img src="${statusIcon}" class="w-5 h-5" alt="status">
            <div class="bg-red-50 rounded-full px-3 py-0.5 text-red-500 text-xs font-bold uppercase">${issue.priority}</div>
          </div>
          <h1 class="font-bold text-gray-800 text-lg leading-tight mb-2">${issue.title}</h1>
          <p class="text-gray-500 text-sm line-clamp-2 mb-4">${issue.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">${labelsHTML}</div>
        </div>
        <div>
          <hr class="border-gray-100 mb-3">
          <div class="text-[11px] text-gray-400">
            <p>#${issue.id} by <span class="font-medium text-gray-600">${issue.author}</span></p>
            <p>${issue.createdAt.slice(0, 10)}</p>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openModal(issue));
      container.appendChild(card);
    });
  }

  function updateStats(filteredData, type) {
    const totalEl = document.querySelector(".text-2xl.font-semibold");
    const openCountEl = document.getElementById("open-count");
    const closedCountEl = document.getElementById("closed-count");

    if (totalEl) totalEl.innerText = filteredData.length;

    if (type === "open" && openCountEl) {
      openCountEl.innerText = filteredData.length;
    } else if (type === "closed" && closedCountEl) {
      closedCountEl.innerText = filteredData.length;
    } else if (type === "all") {
      if (openCountEl)
        openCountEl.innerText = issuesData.filter(
          (i) => i.status === "open",
        ).length;
      if (closedCountEl)
        closedCountEl.innerText = issuesData.filter(
          (i) => i.status === "closed",
        ).length;
    }
  }
  function setActiveButton(activeBtn) {
    const buttons = [btnAll, btnOpen, btnClosed];

    buttons.forEach((btn) => {
      btn.classList.remove("bg-violet-600", "text-white", "btn-primary");
      btn.classList.add("bg-white", "text-gray-700", "border-gray-200");
    });

    activeBtn.classList.remove("bg-white", "text-gray-700");
    activeBtn.classList.add("bg-violet-600", "text-white");
  }

  function openModal(issue) {
    document.getElementById("modal-title").innerText = issue.title;
    document.getElementById("modal-desc").innerText = issue.description;

    const statusBox = document.getElementById("modal-status");
    if (statusBox) {
      statusBox.innerText = issue.status.toUpperCase();
      statusBox.className = `px-3 py-1 rounded-full text-white text-xs font-bold ${issue.status === "open" ? "bg-green-500" : "bg-violet-600"}`;
    }

    const footer = document.getElementById("modal-footer");
    if (footer)
      footer.innerText = `Reported by ${issue.author} on ${issue.createdAt.slice(0, 10)}`;

    modal.classList.remove("hidden");
  }

  document.getElementById("modal-close").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
