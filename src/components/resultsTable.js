const TABLE_ID = "results-table";
const TABLE_HEADERS = ['X value', 'Y value', 'R value', 'HIT/MISS', 'Current time', 'Execution time(seconds)', 'Color(RGB)'];


function createTable(array) {
    const section = document.createElement('section');

    const table = document.createElement('table');
    table.id = TABLE_ID;

    const thead = document.createElement('thead');
    TABLE_HEADERS.forEach((element) => {
        const th = document.createElement('th');
        th.textContent = element;
        thead.append(th);
    });

    table.append(thead);
    section.append(table);

    const tableObject = {
        HTMLsection: section,
        HTMLtable: table,
        addPoint: function(point) {
            const tr = document.createElement('tr');

            const xTd = document.createElement('td');
            const yTd = document.createElement('td');
            const rTd = document.createElement('td');
            const successTd = document.createElement('td');
            const currentTimeTd = document.createElement('td');
            const executionTimeTd = document.createElement('td');
            const colorTd = document.createElement('td');

            xTd.textContent = point.x;
            yTd.textContent = point.y;
            rTd.textContent = point.r;

            successTd.textContent = point.success;
            successTd.style = (point.success) ? 'color: green;' : 'color: red';

            currentTimeTd.textContent = new Date(point.currentTime * 1000);

            executionTimeTd.textContent = point.executionTime;

            colorTd.textContent = point.color;
            colorTd.style = `color: ${point.color};`;

            [xTd, yTd, rTd, successTd, currentTimeTd, executionTimeTd, colorTd].forEach(elem => tr.append(elem));
            this.HTMLtable.append(tr);
        },

        clear: function() {
            const rows = this.HTMLtable.getElementsByTagName('tr');
            while (rows.length > 0) {
                this.HTMLtable.removeChild(rows[0]);
            }
        }
    };

    if (Array.isArray(array)) {
        array.forEach(point => tableObject.addPoint(point));
    }
    return tableObject;
}

export default createTable;