const input = document.getElementById('address');
const form = document.querySelector('form');
const addressDiv = document.getElementById('addressDiv');
const condDiv = document.getElementById('conditions');
const temp = document.getElementById('temp');
const icon = document.getElementById('icon');
const loadDiv = document.getElementById('loadDiv');

let unit = 'metric';

async function callAPI(url) {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 400) {
            alert('ops... the location you entered is incorrect');
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    } else {
        return await response.json();
    }
}

async function getWeather() {
    const address = input.value != '' ? input.value : 'Rome';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=W58PA9GJX6EQERXGYTD5F2YLQ&unitGroup=${unit}&iconSet=icons2`;

    loadDiv.style.display = 'flex';
    const call = await callAPI(url).catch((err) => console.log(err));

    const currentConditions = call.currentConditions;

    const data = {
        address: call.resolvedAddress,
        conditions: currentConditions.conditions,
        temp: currentConditions.temp,
        icon: currentConditions.icon,
    };

    addressDiv.textContent = data.address;
    condDiv.textContent = data.conditions;
    temp.textContent = data.temp;
    icon.src = `./assets/icons/${data.icon}.svg`;

    input.value = '';
    loadDiv.style.display = 'none';
}

getWeather();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather();
});
