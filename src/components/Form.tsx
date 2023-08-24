import React, { useEffect, useRef, useState } from 'react';

import * as Constants from '../constants';

interface FormProps {
    x: number,
    y: number,
    r: number,
    setX: (x: number) => void,
    setY: (y: number) => void,
    setR: (r: number) => void,
    sendPoint: (point : Point) => void,
    clearPoints: () => void;
}

export const Form : React.FC<FormProps> = ({x, y, r, setX, setY, setR, sendPoint, clearPoints} : FormProps) => {
    const [yWarningText, setYWarningText] = useState<String>('');
    const [yText, setYText] = useState<string>('');

    // const sendButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (yText === '' || parseFloat(yText) < Constants.Y_LOWER_BOUND || parseFloat(yText) > Constants.Y_UPPER_BOUND) {
            setYWarningText(
                `Y value must be a float number between: ${Constants.Y_LOWER_BOUND} and ${Constants.Y_UPPER_BOUND} (inclusive)`
            );
            
            return;
        }
        setYWarningText('');
        setY(parseFloat(yText));

    }, [yText]);

    // add styles
    return (
        <form 
            action='/api/point-handle.php' 
            onSubmit={(e) => {
                    e.preventDefault();
                    sendPoint({x, y, r});
                }
            }
        >
            <div>
                <label htmlFor='x'>Select X value</label>
                <select value={x} onChange={(e) => setX(parseFloat(e.target.value))}>
                    {
                        Constants.X_SELECT_VALUES.map((value : number) => <option value={value}>{value}</option>)
                    }
                </select>
            </div>
            <div>
                    <label htmlFor='y'>Type Y value</label>
                    <input 
                        type='text' 
                        name='y' 
                        placeholder='Y value'
                        required
                        value={yText}
                        onChange={(e) => setYText(e.target.value)}
                    />
                    <label htmlFor='y'>{yWarningText}</label>
            </div>
            <div>
                <label htmlFor='r'>
                    Choose R value
                </label>
                {
                    Constants.R_BUTTON_VALUES.map((value : number) => {
                    return (
                        <button 
                        name='r' 
                        value={value} 
                        type='button' 
                        onChange={(e) => setR(value)}
                        >
                            {value}
                        </button>
                        );
                    })
                }
            </div>
            <div>
                    <button type='submit'>Send</button>
                    <button type='button' onClick={(e) => clearPoints()}>Clear</button>
            </div>
        </form>
    );
} 