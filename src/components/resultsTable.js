const TABLE_ID = "results-table";
const TABLE_HEADERS = ['X value', 'Y value', 'R value', 'HIT/MISS', 'Current time', 'Execution time'];


function createTable() {
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

    return {
        HTMLsection: section,
        HTMLtable: table,
        addPoint: function(point) {
            const tr = document.createElement('tr');

            for (const value of Object.values(point)) {
                const td = document.createElement('td');
                td.textContent = value;
                tr.append(value);
            }

            this.HTMLtable.append(tr);
        }
    };
}

export default createTable;