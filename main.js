//Toggling visibility on for features
document.addEventListener("DOMContentLoaded", () => {
    const featureItems = document.querySelectorAll(".feature-item");
  
    featureItems.forEach(item => {
      item.addEventListener("click", () => {
        item.classList.toggle("expanded");
        const description = item.querySelector("p");
        description.style.display = description.style.display === "none" ? "block" : "none";
      });
    });
  });

//Map
const mymap = L.map("map").setView([45.43570480978292, -75.67560242175543], 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(mymap);

    //Markers
        //Customizing map markers
var greenIcon = L.icon({
    iconUrl: "Pictures/marker.png",

    iconSize:     [30, 37], // size of the icon
    iconAnchor:   [16, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -34] // point from which the popup should open relative to the iconAnchor
});

const marker1 = L.marker([45.433072080749966, -75.6776305242554], {icon: greenIcon}).addTo(mymap)
const marker2 = L.marker([45.44183026263848, -75.66666991913777], {icon: greenIcon}).addTo(mymap);
const marker3 = L.marker([45.429396, -75.683736], {icon: greenIcon}).addTo(mymap);
const marker4 = L.marker([45.428635, -75.687089], {icon: greenIcon}).addTo(mymap);
    //Popup message
let template = `

<h4>Drug dealing in the park</h4>
<div style="text-align:center;">
    <img width="200" height="150" src="Pictures/vanier.png"/>
</div>
`
marker1.bindPopup(template)
marker2.bindPopup("<h4>Murder by stabbing happened on this street</h4>")
marker3.bindPopup("<h4>Know homeless meet up area</h4>")
marker4.bindPopup("<h4>An unsafe shopping centre</h4>")
    //Circle

const ripple1 = L.circle([45.43997982726112, -75.6657004625648], {
    radius:600,
    color:"red",
    fillColor: "red",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Dangerous area</h4>")

const ripple2 = L.circle([45.43997982726112, -75.6657004625648], {
    radius:500,
    color:"red",
    fillColor: "red",
    fillOpacity:0.19
}).addTo(mymap).bindPopup("<h4>Dangerous area</h4>")

const ripple3 = L.circle([45.43997982726112, -75.6657004625648], {
    radius:400,
    color:"red",
    fillColor: "red",
    fillOpacity:0.18
}).addTo(mymap).bindPopup("<h4>Dangerous area</h4>")

const ripple4 = L.circle([45.43997982726112, -75.6657004625648], {
    radius:300,
    color:"red",
    fillColor: "red",
    fillOpacity:0.17
}).addTo(mymap).bindPopup("<h4>Dangerous area</h4>")

const ripple5 = L.circle([45.43997982726112, -75.6657004625648], {
    radius:200,
    color:"red",
    fillColor: "red",
    fillOpacity:0.16
}).addTo(mymap).bindPopup("<h4>Dangerous area</h4>")

const ripple6 = L.circle([45.43997982726112, -75.6657004625648], {
    radius:100,
    color:"red",
    fillColor: "red",
    fillOpacity:0.15
}).addTo(mymap).bindPopup("<h4>Dangerous area</h4>")

const circle1 = L.circle([45.425424881797206, -75.68935052719488], {
    radius:120,
    color:"green",
    fillColor: "green",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Local Emergency Services near</h4>")

const circle2 = L.circle([45.42248387314212, -75.69710264614643], {
    radius:300,
    color:"green",
    fillColor: "green",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Local Emergency Services near</h4>")

    // Polygon

const polygon = L.polygon([
    [45.43454633382215, -75.66562706261162],
    [45.437114528631426, -75.66818110839623],
    [45.437576421771425, -75.66241475760418],
    [45.43689281858124, -75.65974222515948],
    [45.43454633382215, -75.66562706261162],
], {
    color:"#03A6A6",
    fillColor:"#03A6A6",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Known drugdealing gang in this area</h4>")


const polygon1 = L.polygon([
    [45.42627342166855, -75.68797395823081],
    [45.42627342166855, -75.68779020785462],
    [45.426178166391836, -75.68769415652162],
    [45.42614006423614, -75.687819440869],
    [45.42627342166855, -75.68797395823081],
], {
    color:"blue",
    fillColor:"blue",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Know homeless meet up area</h4>")

const polygon2 = L.polygon([
    [45.42553645559151, -75.69307571544098],
    [45.425712734537775, -75.69321525366583],
    [45.43018401667419, -75.6826871432304],
    [45.43002182770806, -75.68252206379348],
    [45.42553645559151, -75.69307571544098],
], {
    color:"yellow",
    fillColor:"yellow",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Street frequented by people under the influence of drugs</h4>")

const polygon5 = L.polygon([
    [45.426110668070585, -75.68591005638599],
    [45.426178673308286, -75.68575331077473],
    [45.42603466211969, -75.68561936452512],
    [45.425982657989096, -75.68578750981719],
    [45.426110668070585, -75.68591005638599],
], {
    color:"blue",
    fillColor:"blue",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Known drugdealing gang in this house</h4>")

//Viewing Coordinates on map 

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick); 


//Live alert reporting feature
const reports = JSON.parse(localStorage.getItem("reports")) || [];

document.getElementById("issueForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const street = document.getElementById("street").value;
    const area = document.getElementById("area").value;
    const issueType = document.getElementById("issue-type").value;
    const description = document.getElementById("description").value;

    const newReport = { street, area, issueType, description };

    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));

    displayReports();

    // Clear the form inputs after submission
    document.getElementById("issueForm").reset();
});

function displayReports(filter = '') {
    const submittedData = document.getElementById("submittedData");
    submittedData.innerHTML = '';

    reports.forEach((report, index) => {
        if (filter && !Object.values(report).some(value => value.toLowerCase().includes(filter.toLowerCase()))) {
            return;
        }
        const reportElement = `
            <div class="report">
                <h2 id="Text">Report</h2>
                <p id="Text"><strong>Street:</strong> ${report.street}</p>
                <p id="Text"><strong>Area:</strong> ${report.area}</p>
                <p id="Text"><strong>Issue Type:</strong> ${report.issueType}</p>
                <p id="Text"><strong>Description:</strong> ${report.description}</p>
                <button id="delete__btn" onclick="deleteReport(${index})">Delete</button>
                <br>
            </div>
        `;
        submittedData.innerHTML += reportElement;
    });
}

function filterReports() {
    const filter = document.getElementById("searchBar").value.toLowerCase().trim();
    displayReports(filter);
}

function deleteReport(index) {
    reports.splice(index, 1);
    localStorage.setItem("reports", JSON.stringify(reports));
    displayReports();
}

// Load the reports when the page is loaded
window.onload = displayReports;
