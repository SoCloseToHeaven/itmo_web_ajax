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
const POINTER_COLOR = "#0f4213";
const POINT_RADIUS = 4;

function drawGraph(pointsArray, currentR) {

    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    const imgLabel = document.createElement('label');


    const graphObject = {
        HTMLcanvas: canvas,
        rValue: 1,
        array: [],
        ctx: canvas.getContext("2d"),
        fillCanvas: function fillCanvas() {
            this.ctx.save();
            this.ctx.font = "13px sans-serif";
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, width, height);
        
        
            this.ctx.fillStyle = FIGURE_COLOR;    
            // First sector
            this.ctx.beginPath();
            this.ctx.moveTo(width / 3, height / 2);
            this.ctx.lineTo(width / 3, height / 6);
            this.ctx.lineTo(width / 2, height / 6);
            this.ctx.lineTo(width / 2, height / 2);
            this.ctx.fill();
            // Second sector
            this.ctx.beginPath();
            this.ctx.moveTo(width / 3, height / 2);
            this.ctx.lineTo(width / 2, height / 6 * 5);
            this.ctx.lineTo(width / 2, height / 2);
            this.ctx.fill();
            // Third sector
            this.ctx.beginPath();
            this.ctx.arc(width / 2, height / 2, width / 6, 0, Math.PI / 2);
            this.ctx.lineTo(width /2, height /2);
            this.ctx.fill();
        
            this.ctx.fillStyle = "black";
            // draw labels
            for (let i = 1; i < 6; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo((i * width) / 6, height / 2 - 5);
                this.ctx.lineTo((i * width) / 6, height / 2 + 5);
                this.ctx.moveTo(width / 2 - 5, (i * height) / 6);
                this.ctx.lineTo(width / 2 + 5, (i * height) / 6);
                this.ctx.stroke();
        
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "bottom";
                this.ctx.fillText(labels[i - 1], (i * width) / 6, height / 2 - 7);
        
                this.ctx.textAlign = "left";
                this.ctx.textBaseline = "middle";
                this.ctx.fillText(labels[i - 1], width / 2 + 7, height - (i * height) / 6);
            }
        
            // draw axis x
            this.ctx.beginPath()
            this.ctx.moveTo(0, height / 2);
            this.ctx.lineTo(width, height / 2);
            this.ctx.lineTo(width - 5, height / 2 + 5);
            this.ctx.lineTo(width - 5, height / 2 - 5);
            this.ctx.lineTo(width, height / 2);
            this.ctx.stroke();
        
            // draw axis y
        
            this.ctx.beginPath();
            this.ctx.moveTo(width / 2, height);
            this.ctx.lineTo(width / 2, 0);
            this.ctx.lineTo(width / 2 + 5, 5);
            this.ctx.lineTo(width / 2 - 5, 5);
            this.ctx.lineTo(width / 2, 0);
            this.ctx.stroke();

            if (Array.isArray(this.array) && !Number.isNaN(this.rValue)) {
                this.array.forEach(point => {
                    this.ctx.beginPath();
                    
                    this.ctx.fillStyle = point.color;

                    const xStep = point.x * (width / 3) / this.rValue;
                    const yStep = -(point.y * (height / 3) / this.rValue);
                    const positionX = width / 2 + xStep;
                    const positionY = height / 2 + yStep;

                    this.ctx.moveTo(positionX, positionY);
                    this.ctx.arc(positionX, positionY, POINT_RADIUS, 0, 2 * Math.PI);
                    this.ctx.fill();
                });
            }
    
            this.ctx.restore();
        },
        setR: function(currentR) {
            if (!Number.isNaN(currentR)) {
                this.rValue = currentR;
                this.fillCanvas();
            }
        },

        setArray: function(array) {
            if (Array.isArray(array)) {
                this.array = array;
                this.fillCanvas();
            }
        },

        getMousePosition: function (event) {
            const rect = this.HTMLcanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            return [x, y];
        },

        getPointAttempt: function (event) {
            const [absX, absY] = this.getMousePosition(event);
            
            const pointAttempt = {
                x: (absX - width / 2) / (width / 3) * this.rValue,
                y: -(absY - height / 2) / (height / 3) * this.rValue,
                r: this.rValue
            };

            return pointAttempt;
        }
    };

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

    if (pointsArray instanceof Array) {
        graphObject.array = pointsArray;
    }

    if (currentR instanceof Number) {
        graphObject.rValue = currentR;
    }

    graphObject.fillCanvas();


    canvas.addEventListener('mousemove', (event) => {

        const [x, y] = graphObject.getMousePosition(event);

        graphObject.fillCanvas();

        graphObject.ctx.save();

        graphObject.ctx.beginPath();
        graphObject.ctx.fillStyle = POINTER_COLOR;
        graphObject.ctx.moveTo(x, y);
        graphObject.ctx.arc(x, y, POINT_RADIUS, 0, 2 * Math.PI);
        graphObject.ctx.fill();

        graphObject.ctx.restore();
    });

    canvas.addEventListener('mouseleave', (event) => {
        graphObject.ctx.save();

        graphObject.fillCanvas();

        graphObject.ctx.restore();
    });

    return graphObject;
}


export default drawGraph;