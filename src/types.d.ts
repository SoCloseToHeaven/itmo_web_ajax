declare interface Point {
    x: number,
    y: number,
    r: number
}

declare interface ProcessedPoint extends Point {
    success: boolean,
    currentTime: number;
    executionTime: number,
    color: string
}


declare module '*.png' {
    const content: any
    export default content;
}

