import createForm from "./components/form.js";
import createTable from "./components/resultsTable.js";


const APP_CONTAINER_ID = 'app-container';
const POINTS_ARRAY = [];
const LOCAL_STORAGE_KEY = 'app-points';


// IIFE
(() => {
    let storageArray = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageArray !== null) {
        storageArray = JSON.parse(storageArray);
    }

    if (storageArray instanceof Array) {
        storageArray.forEach(point => POINTS_ARRAY.push(point));
    }
    const appContainer = document.getElementById(APP_CONTAINER_ID);

    const paramsGraphSection = createForm(POINTS_ARRAY);
    const tableSection = createTable(POINTS_ARRAY);

    appContainer.append(paramsGraphSection.HTMLsection);
    appContainer.append(tableSection.HTMLsection);

    paramsGraphSection.form.onsubmit = async (event) => {
        event.preventDefault();

        const pointAttempt = paramsGraphSection.getPointAttempt();
        const url = new URL("/api/point-handle.php", window.location.origin);
        url.search = new URLSearchParams(pointAttempt).toString();
    
        
        const response = await fetch(url).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error(resp.statusText);
        }).catch(err => console.log(err));

        if (response !== undefined) {
            POINTS_ARRAY.push(response);
            tableSection.addPoint(response);
            paramsGraphSection.graph.fillCanvas();
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(POINTS_ARRAY));
        }
    }
})();