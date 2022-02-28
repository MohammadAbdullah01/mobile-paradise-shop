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
    console.log(mobiles)
}