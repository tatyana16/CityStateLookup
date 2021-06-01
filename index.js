"use strict";

let cityStates = [{
    state: "California",
    stateAbbr: "CA",
    cities: ["Los Angeles", "San Francisco", "San Diego"]
},
{
    state: "Colorado",
    stateAbbr: "CO",
    cities: ["Aspen", "Boulder", "Denver", "Pagosa Springs"]
},
{
    state: "Texas",
    stateAbbr: "TX",
    cities: ["Austin", "Dallas", "Houston", "San Antonio"]
}
]

window.onload = function () {
    // load states dropdown when page first loads
    loadStatesDropdown();
    // connect onchange event handler for the states dropdown (hook up a function to it)
    // find the states dropdown
    const statesDropdown = document.getElementById("statesDropdown");
    statesDropdown.onchange = onStatesDropdownChanged;
    // connect onchange event handler for the city dropdown (hook up a function to it)
    // find the city dropdown
    const cityDropdown = document.getElementById("cityDropdown");
    citiesDropdown.onchange = onCitiesDropdownChanged;
}

function loadStatesDropdown() {
    // find the states dropdown
    const statesDropdown = document.getElementById("statesDropdown");
    // Add a "Select one..." <option>
    let selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = "";
    statesDropdown.appendChild(selectOneOption);
    // loop thru the cityStates array to create an <option> for each state
    for (let i = 0; i < cityStates.length; i++) {
        let theOption = document.createElement("option"); // creates <option> element
        theOption.textContent = cityStates[i].state;
        theOption.value = cityStates[i].state;
        statesDropdown.appendChild(theOption);
    }

    // Add a "Select state first..." <option>
    addSelectStateFirstOptionToCityDropdown()
}

function onStatesDropdownChanged() {
    // find the state and city dropdowns
    const statesDropdown = document.getElementById("statesDropdown");
    const citiesDropdown = document.getElementById("citiesDropdown");
    // erase previous city message
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";
    // remove the previous city from the city dropdown because the state has changed
    citiesDropdown.options.length = 0;
    // find the states dropdown selection
    let selectedStateCode = statesDropdown.value;
    // did they pick "Select one..." option"
    if (selectedStateCode == "") {
        // Add a "Select state first..." <option>
        addSelectStateFirstOptionToCityDropdown()
        return;
    }
    // go use the selectedStateCode to find the matching state from the array
    let matchingStates = cityStates.find(arrayElement => arrayElement.state == selectedStateCode);
    // Add a "Select one..." <option>
    let selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = "";
    citiesDropdown.appendChild(selectOneOption);
    // loop thru the city in the matching states and create <option> elements for each
    for (let i = 0; i < matchingStates.cities.length; i++) {
        let theOption = document.createElement("option");
        theOption.textContent = matchingStates.cities[i];
        citiesDropdown.appendChild(theOption);
    }
}

function onCitiesDropdownChanged() {
    // find the states and cities dropdowns
    const statesDropdown = document.getElementById("statesDropdown");
    const citiesDropdown = document.getElementById("citiesDropdown");
    // erase previous cities message
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";
    // get the selected city
    let selectedCities = citiesDropdown.value;
    // if "Select one..." is picked, just exit the function
    if (selectedCities == "") {
        return;
    }
    // get the selected states
    let selectedStatesIndex = statesDropdown.selectedIndex;
    let selectedStates = statesDropdown.options[selectedStatesIndex].text;
    // build a message w/ city and state info and display in <p>
    let message = "City: " + selectedCities + "<br>" +
        "State: " + selectedStates;
    messagePara.innerHTML = message;
}

function addSelectStateFirstOptionToCityDropdown() {
    const citiesDropdown = document.getElementById("citiesDropdown");

    let selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select state first...";
    selectOneOption.value = "";
    citiesDropdown.appendChild(selectOneOption);
}

