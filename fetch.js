const yearDropdown = document.getElementById("yearDropdown");
const output = document.querySelector("#data-output");

// Function to populate the dropdown with years
function populateYearDropdown() {
    for (let year = 1900; year <= 2023; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    }
}

// Function to display Nobel Prize data based on the selected year
function displayPrizeData(selectedYear) {
    fetch("./data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            output.innerHTML = ""; // Clear existing data

            const prizes = data.prizes;
            prizes.forEach(function (prize) {
                if (prize.year === selectedYear) {
                    prize.laureates.forEach(function (laureate) {
                        output.innerHTML += `
                            <tr>
                                <td>${prize.year}</td>
                                <td>${prize.category}</td>
                                <td>${laureate.firstname}</td>
                                <td>${laureate.surname}</td>
                                <td>${laureate.motivation}</td>
                                <td>${laureate.share}</td>
                            </tr>
                        `;
                    });
                }
            });
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });
}

// Event listener to fetch data based on the selected year
yearDropdown.addEventListener("change", function () {
    const selectedYear = yearDropdown.value;
    displayPrizeData(selectedYear);
});

// Initial population of the year dropdown
populateYearDropdown();
