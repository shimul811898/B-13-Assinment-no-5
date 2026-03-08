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
}

const navigationMenu = document.getElementById("navigationMenu");

async function loadNavigation() {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    displayNavigation(data.data);

}

function displayNavigation(navigation) {

    navigation.forEach(menu => {

        const card = document.createElement("div");

        let borderColor;

        if (menu.priority === "high" || menu.priority === "medium") {
            borderColor = "border-green-500";
            Img = "assets/Open-Status.png";
            
        }
        else {
            borderColor = "border-purple-500";
            Img = "assets/Closed- Status .png";
        }

        card.className = `shadow p-4 border-t-2 ${borderColor} rounded-[9px]`;

        card.innerHTML = `
            <div class="grid grid-cols-2">
                <img src="${Img}" alt="">
                <p class="text-[#EF4444] bg-[#FEECEC] text-[12px] font-medium px-4 py-1.5 rounded-[20px] text-center">
                    ${menu.priority || "High"}
                </p>
            </div>

            <h3 class="font-semibold text-[14px] mt-3">${menu.title}</h3>

           <p class="text-[#64748B] text-[12px] line-clamp-2">The navigation menu doesn't collapse properly on mobile
                devices...</p>
                
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
        `;

        navigationMenu.appendChild(card);

    });
}

loadNavigation();