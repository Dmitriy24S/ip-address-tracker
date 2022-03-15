// select page elements
const ipData = document.querySelector(".ip-data");
const locationData = document.querySelector(".location-data");
const timeData = document.querySelector(".time-data");
const ispData = document.querySelector(".isp-data");

// example ip 192.212.174.101
// starting map location - London
let x = 51.505;
let y = -0.09;

let map;

let ip;
let postalCode;
let timeZone;
let country;
let region;
let city;
let isp;

// map func
const drawMap = () => {
  map = L.map("map").setView([x, y], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZG1pdHJpeTI0cyIsImEiOiJjbDBuajBzMnIwODlqM2pwa2p3ZDNpbjc1In0.88O2NFUsyTeDHsZVSWk9FA",
    }
  ).addTo(map);
  var marker = L.marker([x, y]).addTo(map);
};
drawMap();

// input form
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = e.target[0].value;
  ip = inputValue;
  // default seach for example purposes
  if (inputValue === null || inputValue === "") {
    ip = "8.8.8.8";
  }
  fetchIpDataLocation();
});

// fetch
const fetchIpDataLocation = async () => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_E3LhG6dJqHPbVb17r1bDgwgPJ6W0D&ipAddress=${ip}`
  );
  const data = await response.json();

  x = data.location.lat;
  y = data.location.lng;

  map.off();
  map.remove();
  drawMap();

  //  update text info values
  city = data.location.city;
  region = data.location.region;
  postalCode = data.location.postalCode;
  timeZone = data.location.timezone;
  isp = data.isp;

  ipData.textContent = ip;
  locationData.textContent = `${city}, ${region} ${postalCode}`;
  timeData.textContent = `UTC ${timeZone}`;
  ispData.textContent = isp;
};

// Another example IP
const exampleMenuBtnToggle = document.querySelector(".example-btn-menu-toggle");
const exampleBtnContainer = document.querySelector(".example");
const exampleBtn = document.querySelector(".example-btn");

// mobile show
exampleMenuBtnToggle.addEventListener("click", () => {
  exampleBtnContainer.classList.toggle("show");
});

// btn insert new ip
exampleBtn.addEventListener("click", () => {
  const input = document.querySelector("#ip-input");
  input.value = "8.8.8.8";
});
