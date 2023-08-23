import React from 'react';


interface FormProps {
    x: number,
    y: number,
    r: number,
    setX: (x: number) => void,
    setY: (y: number) => void,
    setR: (r: number) => void,
    sendPoint: (event : React.FormEvent) => void;
}

export const Form : React.FC<FormProps> = ({} : FormProps) => {


    return (
        <div>

        </div>
    );
} 