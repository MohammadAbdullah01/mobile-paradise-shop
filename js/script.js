// function for showing spinner
const toggleLoading = display => {
    const loading = document.getElementById("loading");
    loading.style.display = display;
}

// onclick function for search button and fetching data of mobiles
const loadMobile = () => {
    const inputId = document.getElementById("input-field");
    const inputValue = inputId.value;
    const errorMsg = document.getElementById("error-msg")
    if (isNaN(inputValue) == false) {
        errorMsg.innerText = "type any mobile set name";
        const container = document.getElementById("main-container");
        container.textContent = "";
        const DetailsContainer = document.getElementById("details");
        DetailsContainer.textContent = "";
        inputId.value = "";
    }
    else {
        const container = document.getElementById("details");
        container.textContent = "";

        toggleLoading("block")

        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => showMobile(data.data))
        inputId.value = "";
    }
}

// showing searching result of mobile to UI 
const showMobile = mobiles => {
    // console.log(mobiles);
    if (mobiles.length == 0) {
        // console.log("paichi ajk tore")
        const errorMsg = document.getElementById("error-msg");
        errorMsg.innerText = "no mobile found";
    }

    const container = document.getElementById("main-container");
    container.textContent = "";
    const first20Mobiles = mobiles.slice(0, 20)
    first20Mobiles.forEach(mobile => {
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card">
        <img src="${mobile.image}" class="card-img-top w-75 p-4 mx-auto" alt="...">
        <div class="card-body">
            <h4 class="card-title">${mobile.phone_name}</h4>
            <h5 class="card-title">${mobile.brand}</h5>
            <button onclick="getDetails('${mobile.slug}')" class="btn btn-primary my-2 py-2">Details</button>
        </div>
    </div>
        `
        div.classList.add("col")
        container.appendChild(div)
        const errorMsg = document.getElementById("error-msg")
        errorMsg.innerText = ""
    })
    toggleLoading("none")

}

// fetching data of details 
const getDetails = code => {
    const url = `https://openapi.programming-hero.com/api/phone/${code}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data))
}

// show details in UI container 
const showDetails = details => {
    const container = document.getElementById("details");
    container.textContent = "";
    const div = document.createElement("div")
    container.innerHTML = `
    <div class="card mx-auto w-100">
    <img id="details-img" src="${details.data.image}" class="card-img-top mx-auto p-2" alt="...">
        <div class="card-body">
            
            <h4 class="card-title">${details.data.name}</h4>
            <h5 class="card-title">${details.data.brand}</h5>
            <p>Release date: ${details.data.releaseDate ? details.data.releaseDate : "no release date found"}</p>
            <h6>Main Features:</h6>
            <ol  style="list-style-type: none">
                <li>Storage:${details.data.mainFeatures.storage}</li>
                <li>Display: ${details.data.mainFeatures.displaySize}</li>
                <li>Chipset: ${details.data.mainFeatures.chipSet}</li>
                <li>Memory: ${details.data.mainFeatures.memory}</li>
            </ol> 
            <h6>Sensors:</h6>
            <p>${details.data.mainFeatures.sensors}</p>
            <h6>Others:</h6>
            <ol  style="list-style-type: none">
                <li>WLAN: ${details.data.others.WLAN}</li>
                <li>Bluetooth: ${details.data.others.Bluetooth}</li>
                <li>GPS: ${details.data.others.GPS}</li>
                <li>NFC: ${details.data.others.NFC}</li>
                <li>Radio: ${details.data.others.Radio}</li>
                <li>USB: ${details.data.others.USB}</li>
            </ol>
        </div>
        </div>
    `
    container.appendChild(div)
}