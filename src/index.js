import createForm from "./components/form.js";
import createTable from "./components/resultsTable.js";


const APP_CONTAINER_ID = 'app-container';
const points = [];


// IIFE
(() => {
    const appContainer = document.getElementById(APP_CONTAINER_ID);

    async function sendPoint(pointAttempt) {
        const response = fetch('/api/pointGet.php', {
            method: "GET",
            body: JSON.stringify(point),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const paramsGraphSection = createForm();
    const tableSection = createTable();

    appContainer.append(paramsGraphSection);
    appContainer.append(tableSection.HTMLsection);
})();