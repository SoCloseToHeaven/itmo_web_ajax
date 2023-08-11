const labels = ["-R", "-R/2", "0", "R/2", "R"];
const FIGURE_COLOR = "#9f40de";
const CANVAS_NOT_SUPPORTED = {
    imgPath: './static/areas.png',
    message: 'Canvas is not supported in your browser!',
    imgID: 'map-img'
};
const width = 300;
const height = 300;
const CANVAS_ID = 'canvas';
const POINTER_COLOR = "#bf6dd1";
const POINT_RADIUS = 4;

function drawGraph() {

    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    const imgLabel = document.createElement('label');

    img.src = CANVAS_NOT_SUPPORTED.imgPath;
    img.id = CANVAS_NOT_SUPPORTED.imgID;
    img.width = width;
    img.height = height;

    imgLabel.textContent = CANVAS_NOT_SUPPORTED.message;
    imgLabel.htmlFor = CANVAS_NOT_SUPPORTED.imgID;

    canvas.width = width;
    canvas.height = height;
    canvas.id = CANVAS_ID;

    canvas.append(imgLabel);
    canvas.append(img);

    const ctx = canvas.getContext("2d");
    
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

    // draw points


    // pointer
    const bufferCanvas = document.createElement('canvas');
    const bufferCtx = bufferCanvas.getContext('2d');
    bufferCanvas.width = width;
    bufferCanvas.height = height;

    
    bufferCtx.drawImage(canvas, 0, 0);
    

    canvas.addEventListener('mousemove', (event) => {
        ctx.save();
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ctx.drawImage(bufferCanvas, 0, 0);

        ctx.beginPath();
        ctx.fillStyle = POINTER_COLOR;
        ctx.arc(x, y, POINT_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    });

    canvas.addEventListener('mouseleave', (event) => {
        ctx.drawImage(bufferCanvas, 0, 0);
    })

    return {
        HTMLcanvas: canvas,
        drawPoint: function(point) {
            const x = point.x;
            const y = point.y;
            const color = point.color;

            bufferCtx.save();
            bufferCtx.fillStyle = color;
            bufferCtx.arc(width / 2 + x, height / 2 + y, POINT_RADIUS, 0, 2 * Math.PI);
            bufferCtx.fill();
            bufferCtx.restore();
        }
    };
}


export default drawGraph;