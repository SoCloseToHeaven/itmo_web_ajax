import React, { useEffect, useRef } from "react";
import graphImg from '../assets/areas.png';

const width : number = 300;
const height : number = 300;

const FIGURE_COLOR : string = "#9f40de";
const POINTER_COLOR : string = "#0f4213";
const POINT_RADIUS : number = 4;

const labels : string[] = ["-R", "-R/2", "0", "R/2", "R"];


interface GraphProps {
    points: ProcessedPoint[],
    r: number,
    sendPoint: (point : Point) => void
}

function fillGraph(ctx: CanvasRenderingContext2D, r: number, points: ProcessedPoint[]) : void {
    ctx.save();
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
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

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

    points.forEach((point) => {
        ctx.beginPath();

        ctx.fillStyle = point.color;

        const xStep = point.x * (width / 3) / r;
        const yStep = -(point.y * (height / 3) / r);
        const positionX = width / 2 + xStep;
        const positionY = height / 2 + yStep;

        ctx.moveTo(positionX, positionY);
        ctx.arc(positionX, positionY, POINT_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
    });
}

export const Graph : React.FC<GraphProps> = ({points, r, sendPoint} : GraphProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = canvasRef.current?.getContext("2d");

    const fillGraphCtx = () => {
        if (ctx) {
            fillGraph(ctx, r, points);
            return ctx;
        }
    };

    useEffect(() => {
        fillGraphCtx();
    }, [points, r]);

    return (
        <canvas 
            width={width} 
            height={height}
            id="canvas"
            ref={canvasRef}
            onMouseLeave={(e) => fillGraphCtx()}
            onMouseMove={(event) => {
                const rect = canvasRef.current?.getBoundingClientRect();
                if (!rect || !ctx)
                    return;
                fillGraphCtx();
                
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                ctx.save();

                ctx.beginPath();
                ctx.fillStyle = POINTER_COLOR;
                ctx.arc(mouseX, mouseY, POINT_RADIUS, 0, 2 * Math.PI);
                ctx.fill();

                ctx.restore();
            }}
        >
            Canvas is not supported in your browser!
            <img src={graphImg} width={width} height={height} />
        </canvas>
    );
} 