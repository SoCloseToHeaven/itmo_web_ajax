import createForm from "./components/form.js";
import createTable from "./components/resultsTable.js";


const APP_CONTAINER_ID = 'app-container';

async function sendPoint(pointAttempt) {
    const url = new URL("/api/point-handle.php", window.location.origin);
    url.search = new URLSearchParams(pointAttempt).toString();

    
    const response = await fetch(url).then(resp => {
        if (resp.ok) {
            return resp.json();
        }
        throw new Error(resp.statusText);
    }).catch(err => console.log(err));
    return response;
}


// IIFE
(() => {
    const appContainer = document.getElementById(APP_CONTAINER_ID);

    const paramsGraphSection = createForm(sendPoint);
    const tableSection = createTable();

    appContainer.append(paramsGraphSection);
    appContainer.append(tableSection.HTMLsection);
})();