import React, { StrictMode, useState } from 'react';
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

    const sendPoint = async (point : Point) => {
        const url = new URL("api/point-handle.php", window.location.href);
        url.search = new URLSearchParams(point.toString()).toString();
    
        const response = await fetch(url).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error(resp.statusText);
        }).catch(err => console.log(err));

        if (response !== undefined) {
            const resultPoint : ProcessedPoint = response as ProcessedPoint;
            setPoints([...points, resultPoint]);
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(points));
        }
    };

    const clearPoints = () => {
        if (confirm('Are you sure?')) {
            setPoints([]);
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([])); 
        }
    };

    return (
        <div>
            <div>
                <Form x={x} y={y} r={r} setX={setX} setY={setY} setR={setR} sendPoint={sendPoint} clearPoints={clearPoints} />
            </div>
            <div>
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