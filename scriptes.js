let container = document.getElementsByClassName("container")[0];
let btn = document.querySelector("button");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
btn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length === 0) {
        alert("No Data Available");
        displayData(data);
    } else {
        let result = data.filter(obj => obj["category"] === "electronics");
        displayData(result);
    }
})
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    let searchTerm = searchInput.value;
    let data = JSON.parse(localStorage.getItem("data")) || [];
    let filteredData = data.filter(obj => obj["category"] === searchTerm);
    displayData(filteredData);
});

async function getData() {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}

function displayData(data) {
    container.innerHTML = "";
    // let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length === 0) {
        alert("No Data Available");
    } else {
        data.forEach((obj, index) => {
            let div = document.createElement("div");
            div.className = "item";
            div.innerHTML =
                `<p><b>ID : </b>${obj["id"]}</p>
                <p><b>TITLE : </b>${obj["title"]}</p>
                <p><b>PRICE : </b>${obj["price"]}</p>
                <p><b>DESCRIPTION : </b>${obj["description"]}</p>
                <p><b>CATEGORY : </b>${obj["category"]}</p>
                <img src = ${obj["image"]}>`;
            let button = document.createElement("button");
            button.textContent = "Delete";
            div.appendChild(button);

            button.onclick = () => {
                deleteData(index);
            }

            container.appendChild(div);
        });
    }
}

function deleteData(index) {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}

getData();