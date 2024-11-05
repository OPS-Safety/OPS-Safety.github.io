//Map
const mymap = L.map('map').setView([45.421451317787124, -75.68283615865924], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mymap);

    //Marker

const marker1 = L.marker([45.433072080749966, -75.6776305242554]).addTo(mymap);
const marker2 = L.marker([45.44183026263848, -75.66666991913777]).addTo(mymap);

    //Popup message
let template = `

<h4>Drug dealing in the park</h4>
<div style="text-align:center;">
    <img width="200" height="150" src="Pictures/vanier.png"/>
</div>
`
marker1.bindPopup(template)
marker2.bindPopup("<h4>Murder by stabbing happened on this street</h4>")

    //Circle

const circle = L.circle([45.43997982726112, -75.6657004625648], {
    radius:600,
    color:"red",
    fillColor: "red",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Dangerous area</h4>")

    // Polygon

const polygon = L.polygon([
    [45.43454633382215, -75.66562706261162],
    [45.437114528631426, -75.66818110839623],
    [45.437576421771425, -75.66241475760418],
    [45.43689281858124, -75.65974222515948],
    [45.43454633382215, -75.66562706261162],
], {
    color:"blue",
    fillColor:"blue",
    fillOpacity:0.2
}).addTo(mymap).bindPopup("<h4>Known drugdealing gang in this area</h4>")

//Live alert reporting feature
const reports = JSON.parse(localStorage.getItem('reports')) || [];

document.getElementById('issueForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const street = document.getElementById('street').value;
    const area = document.getElementById('area').value;
    const issueType = document.getElementById('issue-type').value;
    const description = document.getElementById('description').value;

    const newReport = { street, area, issueType, description };

    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));

    displayReports();

    // Clear the form inputs after submission
    document.getElementById('issueForm').reset();
});

function displayReports(filter = '') {
    const submittedData = document.getElementById('submittedData');
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
    const filter = document.getElementById('searchBar').value.toLowerCase().trim();
    displayReports(filter);
}

function deleteReport(index) {
    reports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(reports));
    displayReports();
}

// Load the reports when the page is loaded
window.onload = displayReports;
