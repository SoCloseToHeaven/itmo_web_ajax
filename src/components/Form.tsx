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
    // const [yWarningText, setYWarningText] = useState<String>('');
    // const [yText, setYText] = useState<string>('');

    const [xText, setXText] = useState<string>('');
    const [xWarningText, setXWarningText] = useState<string>('');

    const sendButtonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if (
            !Constants.FLOAT_FIVE_DECIMALS_REGEX.test(xText) ||
            xText === '' || 
            parseFloat(xText) < Constants.X_LOWER_BOUND || 
            parseFloat(xText) > Constants.X_UPPER_BOUND) {

                if (sendButtonRef.current)
                    sendButtonRef.current.disabled = true;
                setXWarningText(
                    `X value must be a float number between: ${Constants.X_LOWER_BOUND} 
                    and ${Constants.X_UPPER_BOUND} (inclusive, ${Constants.ROUNDING_ACCURACY} decimals places of number)`
                );
            
                return;
        }
        if (sendButtonRef.current)
            sendButtonRef.current.disabled = false;
        setXWarningText('');
        setX(parseFloat(xText));
        

    }, [xText]);

    
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
                <label htmlFor="x">Type X value</label>
                <input 
                    id='x'
                    className='x-y-width'
                    required
                    type='text'
                    onChange={e => setXText(e.target.value)}
                />
                <label 
                    htmlFor='x'
                    id='warning-label'
                >
                {
                    xWarningText
                }
                </label>
            </div>
            <div>
                <label htmlFor="y">Select Y value</label>
                <select
                    id='y'
                    className='x-y-width'
                    name='y'
                    value={y}
                    onChange={(e => setY(parseFloat(e.target.value)))}
                >
                    {
                        Constants.Y_SELECT_VALUES.map(value => <option value={value}>{value}</option>)
                    }
                </select>
            </div>
            <div>
                <label>Choose R value</label>
                {
                    Constants.R_CHECKBOX_VALUES.map((value) => {
                        return <label 
                            htmlFor={`r-${value}`}
                            style={{display: 'inline-block'}}
                            >
                            {value}

                            <input 
                            id={`r-${value}`}
                            type='checkbox'
                            value={value}
                            name='r'
                            checked={value == r ? true : false}
                            onClick={e => setR(value)}
                            />
                        </label>
                    })
                }
            </div>
            <div>
                    <button className='send-clear-button-group' id='send-button' type='submit' ref={sendButtonRef}>Send</button>
                    <button className='send-clear-button-group' type='button' onClick={(e) => clearPoints()}>Clear</button>
            </div>
        </form>
    );
} 