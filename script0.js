document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".master-container");
  
  const btnAll = document.getElementById("btn-all");
  const btnOpen = document.getElementById("btn-open");
  const btnClosed = document.getElementById("btn-closed");



  let issuesData = data.data; // store all issues from API

  // Fetch issues from API
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      issuesData = data.data;

      // Initial render - show all issues
      DisplayIssues(issuesData, container);

      // Update counts
      document.getElementById("issue-count").innerText = issuesData.length;
      document.getElementById("open-count").innerText = issuesData.filter(i => i.status === "open").length;
      document.getElementById("closed-count").innerText = issuesData.filter(i => i.status === "closed").length;
    });









  // ✅ Filter buttons
  btnAll.addEventListener("click", () => {
    DisplayIssues(issuesData, container);
    setActiveButton(btnAll);
  });

  btnOpen.addEventListener("click", () => {
    const openIssues = issuesData.filter(i => i.status === "open");
    DisplayIssues(openIssues, container);
    setActiveButton(btnOpen);
  });

  btnClosed.addEventListener("click", () => {
    const closedIssues = issuesData.filter(i => i.status === "closed");
    DisplayIssues(closedIssues, container);
    setActiveButton(btnClosed);
  });

  // Highlight active button
  function setActiveButton(activeBtn) {
    [btnAll, btnOpen, btnClosed].forEach(btn => {
      btn.classList.remove("bg-violet-600");
      btn.classList.add("btn-primary");
    });
    activeBtn.classList.remove("btn-primary");
    activeBtn.classList.add("bg-violet-600");
  }
});

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      const issues = data.data;
      DisplayIssues(issues, container); // pass container to your DisplayIssues function
    });

function DisplayIssues(issues, container) {
  container.innerHTML = ""; // clear old cards before adding new ones

  issues.forEach(issue => {
    const statusIcon = issue.status === "closed"
      ? "./assets/closed_status.png"
      : "./assets/open_status.png";

    const labelsHTML = (issue.labels || []).map(label => {
      if (label === "bug") {
        return `<div class="inline-flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                  <i class="fa-solid fa-bug"></i> BUG
                </div>`;
      }
      if (label === "help wanted") {
        return `<div class="inline-flex items-center gap-1 bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-medium">
                  <i class="fa-solid fa-life-ring"></i> Help Wanted
                </div>`;
      }
      if (label === "enhancement") {
        return `<div class="inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Enhancement
                </div>`;
      }
    }).join("");

    const card = document.createElement("div");
    card.className = `mainn-container bg-white rounded-xl m-2 p-4 cursor-pointer border-t-4 
                      ${issue.status === "closed" ? "border-violet-600" : "border-green-500"}`;

    card.innerHTML = `
      <div class="flex items-center gap-4">
        <img src="${statusIcon}" class="w-5 h-5" alt="status" />
        <div class="text-sm font-semibold">${issue.priority}</div>
      </div>

      <h1 class="font-semibold mt-2">${issue.title}</h1>
      <p class="text-gray-500 text-sm">${issue.description.slice(0, 80)}...</p>

      <div class="bug-help flex gap-2 mt-2">${labelsHTML}</div>
      <hr class="my-3 border-gray-200" />
      <div class="text-sm text-gray-500 flex flex-col">
        <span>#${issue.id} by ${issue.author}</span>
        <span>${issue.createdAt.slice(0, 10)}</span>
      </div>
    `;



    

    card.addEventListener("click", () => openModal(issue));
    container.appendChild(card);
  });
}



fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res=>res.json())
.then(data=>{
    const issues=data.data
    
    

  document.getElementById("issue-count").innerText = issues.length

  const openIssues = issues.filter(i => i.status === "open")
  const closedIssues = issues.filter(i => i.status === "closed")

  document.getElementById("open-count").innerText = openIssues.length
  document.getElementById("closed-count").innerText = closedIssues.length

    DisplayIssues(issues)
})

const container = document.querySelector(".master-container")

function DisplayIssues(issues){
    issues.forEach(issue=>{
        const labelsHTML = issue.labels.map(label => {

  if(label === "bug"){
  return `
  <div class="inline-flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
    <i class="fa-solid fa-bug"></i>
    BUG
  </div>
  `
}

if(label === "help wanted"){
  return `
  <div class="inline-flex items-center gap-1 bg-amber-100 text-amber-600 px-2 py-1 rounded-full text-xs font-medium">
    <i class="fa-solid fa-life-ring"></i>
    Help Wanted
  </div>
  `
}

if(label === "enhancement"){
  return `
  <div class="inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
    <i class="fa-solid fa-wand-magic-sparkles"></i>
    Enhancement
  </div>
  `
}

  

}).join("")
const statusIcon = issue.status === "closed"
  ? "./assets/closed_status.png"
  : "./assets/open_status.png"
        const card=document.createElement("div")
        card.className= "mainn-container bg-white rounded-xl m-2 p-4 cursor-pointer"
        card.innerHTML = `
<div class="flex  items-center justify-between flex-wrap w-full">
  <img src="${statusIcon}" class="w-5 h-5">
  <div class="bg-red-100 rounded-full px-3 text-red-500 text-sm font-semibold">
    <span>${issue.priority}</span>
            </div>
        </div>

        <h1 class="font-semibold mt-2">${issue.title}</h1>

        <p class="text-[#64748B] text-sm">
          ${issue.description.slice(0,80)}...
        </p>
        <div class="bug-help flex gap-2 items-center mt-3">
  ${labelsHTML}
</div>
<hr class="border-gray-200 my-3">

        <div class="text-sm text-gray-500 mt-3 flex flex-col">
            <span>#${issue.id} by ${issue.author}</span>
            <span>${issue.createdAt.slice(0,10)}</span>
        </div>
    `
    card.addEventListener("click",()=>openModal(issue))
    container.appendChild(card)

    



    })
}