import React, { useState } from 'react';
import {createRoot} from 'react-dom/client';


import './index.css';
import '../index.html';


function App() {
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [r, setR] = useState<number>(1);

    const [points, setPoints] = useState<ProcessedPoint[]>([]);

    return (
        <>
        
        </>
    );
}



const appContainer = document.getElementById('app-container');

if (appContainer) {
    const root = createRoot(appContainer);
    root.render(<App />)
}