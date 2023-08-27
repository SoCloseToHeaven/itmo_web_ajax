import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Graph } from './components/Graph';
import { Results } from './components/Results';
import { Form } from './components/Form';

import { LOCAL_STORAGE_KEY } from './constants';


import './index.css';
import '../index.html';


function App() {
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [r, setR] = useState<number>(1);

    const [points, setPoints] = useState<ProcessedPoint[]>([]);

    const sendPoint = (point : Point) => {
        const url = new URL("api/point-handle.php", window.location.href);
        const params : string = `x=${point.x}&y=${point.y}&r=${point.r}`;
        url.search = new URLSearchParams(params).toString();
    
        fetch(url).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error(resp.statusText);
        }).then((response) => {

            if (response !== undefined) {
                const resultPoint : ProcessedPoint = response as ProcessedPoint;
                setPoints([...points, resultPoint]);
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(points));
        }}).catch(err => console.log(err));
    };

    const clearPoints = () => {
        if (confirm('Are you sure?')) {
            setPoints([]);
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([])); 
        }
    };

    useEffect(() => {
        const pointsJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (pointsJSON) {
            setPoints(JSON.parse(pointsJSON) as ProcessedPoint[]);
            return;
        }
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([] as ProcessedPoint[]));
    }, []);

    return (
        <div>
            <div className='graph-container'>
                <Graph points={points} r={r} sendPoint={sendPoint}/>
            </div>
            <div className='form-container'>
                <Form x={x} y={y} r={r} setX={setX} setY={setY} setR={setR} sendPoint={sendPoint} clearPoints={clearPoints} />
            </div>
            <div className='results-container'>
                <Results points={points} />
            </div>
        </div>
    );
}



const appContainer = document.getElementById('app-container');

if (appContainer) {
    const root = createRoot(appContainer);
    root.render(
        <App />
    );
}