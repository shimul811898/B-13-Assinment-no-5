//login section
const login = () => {
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;

    if (username === "admin" && password === "admin123") {
        window.location.assign("home.html");

    }
    else {
        alert("Invalid username or password");

    }
};



let allIssues = [];
//btn toggle
function toggleStyle(id) {

    const allBtn = document.getElementById("allBtn");
    const OpenBtn = document.getElementById("OpenBtn");
    const ClosedBtn = document.getElementById("ClosedBtn");

    // reset style
    [allBtn, OpenBtn, ClosedBtn].forEach(btn => {
        btn.classList.add('bg-[#FFFFFF]', 'text-[#64748B]');
        btn.classList.remove('bg-[#4A00FF]', 'text-[#FFFFFF]');
    });

    // active btn
    const activeBtn = document.getElementById(id);
    activeBtn.classList.remove('bg-[#FFFFFF]', 'text-[#64748B]');
    activeBtn.classList.add('bg-[#4A00FF]', 'text-[#FFFFFF]');

    if (id === "allBtn") {
        displayNavigation(allIssues);
    }

    else if (id === "OpenBtn") {
        const openIssues = allIssues.filter(issue =>
            issue.priority === "high" || issue.priority === "medium"
        );
        displayNavigation(openIssues);
    }

    else if (id === "ClosedBtn") {
        const closedIssues = allIssues.filter(issue =>
            issue.priority === "low"
        );
        displayNavigation(closedIssues);
    }

}



const navigationMenu = document.getElementById("navigationMenu");
const loadingSpinner = document.getElementById("loadingSpinner");
const modal = document.getElementById("modal");

async function loadNavigation() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    loadingSpinner.classList.add("hidden");
    allIssues = (data.data);
    displayNavigation(allIssues);
}

function displayNavigation(navigation) {
    navigationMenu.innerHTML = "";
    navigation.forEach(menu => {

        const card = document.createElement("div");

        let borderColor;
        let Img;
        let priorityBg;

        if (menu.priority === "high") {
            borderColor = "border-green-500";
            Img = "assets/Open-Status.png";
            priorityBg = "text-[#EF4444] bg-[#FEECEC]";
        }

        else if (menu.priority === "medium") {
            borderColor = "border-green-500";
            Img = "assets/Open-Status.png";
            priorityBg = "text-[#D97706] bg-[#FFF8DB]";
        }

        else {
            borderColor = "border-purple-500";
            Img = "assets/Closed- Status .png";
            priorityBg = "text-[#9CA3AF] bg-[#EEEFF2]";
        }

        card.className = `shadow p-4 border-t-2 ${borderColor} rounded-[9px]  `;

        card.innerHTML = `
        <div class=""onclick="openModal(${menu.id})">
            <div class="grid grid-cols-2">
                <img src="${Img}" alt="">
                <p class=" ${priorityBg} text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center">
                    ${menu.priority}
                </p>
            </div>

            <h3 class="font-semibold text-[14px] mt-3">${menu.title}</h3>

           <p class="text-[#64748B] text-[12px] line-clamp-2">${menu.description}</p>
                
              <div class="flex gap-2 py-3">
                <p class="text-[#EF4444] bg-[#FEECEC] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center"><i
                        class="fa-solid fa-bug"></i> Bug</p>
                <p class="text-[#D97706] bg-[#FFF8DB] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center"><i
                        class="fa-solid fa-circle-radiation"></i> help wanted</p>
            </div>
            <hr class="border-t-2 border-[#E4E4E7]">

            <p class="text-[12px] text-[#64748B] pt-2">
                ${menu.id} by ${menu.author || "unknown"}
            </p>
             <p class="text-[12px] text-[#64748B] py-2">1/15/2024</p>
              </div>
        `;

        navigationMenu.appendChild(card);

    });
}



async function openModal(menuId) {

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${menuId}`);
    const data = await res.json();
    const issueData = data.data;

    let pri;

    if (issueData.priority === "high" || issueData.priority === "medium") {
        pri = "text-[#EF4444] bg-[#FEECEC]";
    }
    else {
        pri = "text-[#9CA3AF] bg-[#EEEFF2]";
    }

    modal.innerHTML = `
        <div class="shadow p-8 bg-white rounded-lg">
        <h1 class="font-bold text-2xl">${issueData.title}</h1>

        <div class="flex gap-2">
            <p class="text-white bg-[#00A96E] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center">
                ${issueData.status}
            </p>

            <p class="text-[#64748B] text-[12px] pt-1">
                <i class="fas fa-circle"></i> ${issueData.status} by ${issueData.author}
            </p>

            <p class="text-[#64748B] text-[12px] pt-1">
                <i class="fas fa-circle"></i> 22/02/2026
            </p>
        </div>

        <div class="flex gap-2 py-4">
            <p class="text-[#EF4444] bg-[#FEECEC] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center">
                <i class="fa-solid fa-bug"></i> Bug
            </p>

            <p class="text-[#D97706] bg-[#FFF8DB] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center">
                <i class="fa-solid fa-circle-radiation"></i> help wanted
            </p>
        </div>

        <p class="text-[#64748B] text-[12px] pb-6">
            ${issueData.description}
        </p>

        <div class="space-y-6 grid grid-cols-2 shadow px-4 bg-[#F8FAFC]">
            <div class="space-y-2 pt-4">
                <p class="text-[#64748B] text-[12px]">Assignee:</p>
                <p>${issueData.author}</p>
            </div>

            <div class="space-y-2 pt-4">
                <p class="text-[#64748B] text-[12px]">Priority:</p>
                <p class="${pri} text-[12px] font-medium w-[40%] py-1.5 rounded-[20px] text-center">
                    ${issueData.priority || "high"}
                </p>
            </div>
        </div>

        <div class="flex justify-end">
            <button onclick="closeModal()" class="px-3 py-2 mt-6 text-white bg-[#4A00FF] rounded-[9px]">
                Close
            </button>
        </div>
    </div>
    `;
}

function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}


loadNavigation();


// search section
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
    const searchText = searchInput.value;

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
        .then(res => res.json())
        .then(data => {
            displayIssues(data.data); 
        });
});

function displayIssues(issues) {

    navigationMenu.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.className = "shadow p-4 border-t-2 border-[#00A96E] rounded-[9px]";

        card.innerHTML = `
        <div class="grid grid-cols-2">
            <img src="assets/Open-Status.png" alt="">
            <p class="text-[#EF4444] bg-[#FEECEC] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center">
                ${issue.priority}
            </p>
        </div>

        <h3 class="font-semibold text-[14px] mt-3">${issue.title}</h3>

        <p class="text-[#64748B] text-[12px] line-clamp-2">
            ${issue.description}
        </p>

        <div class="flex gap-2 py-3">
            <p class="text-[#EF4444] bg-[#FEECEC] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center">
                <i class="fa-solid fa-bug"></i> ${issue.type}
            </p>
        </div>

        <hr class="border-t-2 border-[#E4E4E7]">

        <p class="text-[12px] text-[#64748B] pt-2">#${issue.id} by ${issue.author}</p>
        <p class="text-[12px] text-[#64748B] py-2">${issue.createdAt}</p>
        `;

        navigationMenu.appendChild(card);
    });
}




