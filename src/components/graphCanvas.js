const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const labels = ["-R", "-R/2", "0", "R/2", "R"];
const FIGURE_COLOR = "#9f40de";

function drawGraph() {
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);


    ctx.fillStyle = FIGURE_COLOR;    
    // First sector
    ctx.beginPath();
    ctx.moveTo(width / 3, height / 2);
    ctx.lineTo(width / 3, height / 6);
    ctx.lineTo(width / 2, height / 6);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    // Second sector
    ctx.beginPath();
    ctx.moveTo(width / 3, height / 2);
    ctx.lineTo(width / 2, height / 6 * 5);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    // Third sector
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 6, 0, Math.PI / 2);
    ctx.lineTo(width /2, height /2);
    ctx.fill();

    // draw graph lines and labels
    const xStep = width / labels.length;
    const yStep = height / labels.length;

    ctx.fillStyle = "black";
    // draw labels
    for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo((i * width) / 6, height / 2 - 5);
        ctx.lineTo((i * width) / 6, height / 2 + 5);
        ctx.moveTo(width / 2 - 5, (i * height) / 6);
        ctx.lineTo(width / 2 + 5, (i * height) / 6);
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(labels[i - 1], (i * width) / 6, height / 2 - 7);

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(labels[i - 1], width / 2 + 7, height - (i * height) / 6);
    }

    // draw axis x
    ctx.beginPath()
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.lineTo(width - 5, height / 2 + 5);
    ctx.lineTo(width - 5, height / 2 - 5);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // draw axis y

    ctx.beginPath();
    ctx.moveTo(width / 2, height);
    ctx.lineTo(width / 2, 0);
    ctx.lineTo(width / 2 + 5, 5);
    ctx.lineTo(width / 2 - 5, 5);
    ctx.lineTo(width / 2, 0);
    ctx.stroke();

}




drawGraph();