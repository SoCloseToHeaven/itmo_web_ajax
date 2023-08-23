import React from "react";

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

}

export const Graph : React.FC<GraphProps> = ({points, r, sendPoint} : GraphProps) => {

    return (
        <canvas 
            width={width} 
            height={height}
            id="canvas"
            
        >

        </canvas>
    );
} 