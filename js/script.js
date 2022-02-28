// onclick function for search button and fetching data of mobiles
const loadMobile = () => {
    const inputId = document.getElementById("input-field");
    const inputValue = inputId.value;
    const errorMsg = document.getElementById("error-msg")
    if (isNaN(inputValue) == false) {
        errorMsg.innerText = "type any mobile set name";
        inputId.value = "";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => showMobile(data.data))
        inputId.value = "";
    }
}

// showing searching result of mobile to UI 
const showMobile = mobiles => {
    const container = document.getElementById("main-container")
    mobiles.forEach(mobile => {
        console.log(mobile)
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card">
        <img src="${mobile.image}" class="card-img-top w-75 p-4 mx-auto" alt="...">
        <div class="card-body">
            <h4 class="card-title">${mobile.phone_name}</h4>
            <h5 class="card-title">${mobile.brand}</h5>
            <button class="btn btn-primary my-2 py-2">Details</button>
        </div>
    </div>
        `
        div.classList.add("col")
        container.appendChild(div)
    })
}