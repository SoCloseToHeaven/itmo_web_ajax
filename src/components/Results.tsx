import React from 'react';
import { ROUNDING_ACCURACY } from '../constants';

const TABLE_HEADERS : string[] = ['X value', 'Y value', 'R value', 'HIT/MISS', 'Current time', 'Execution time(ms)', 'Color(RGB)'];

interface ResultsProps {
    points: ProcessedPoint[]
}

export const Results : React.FC<ResultsProps> = ({points} : ResultsProps) => {
    return (
        <table id="results-table">
            <thead>
                <tr>
                    {
                        TABLE_HEADERS.map((header: string) => <th>{header}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    points.map((point: ProcessedPoint) => {
                        return (
                            <tr>
                                <td>{point.x.toFixed(ROUNDING_ACCURACY)}</td>
                                <td>{point.y.toFixed(ROUNDING_ACCURACY)}</td>
                                <td>{point.r}</td>
                                <td style={{ color: point.success ? 'green' : 'red' }}>{point.success ? 'HIT' : 'MISS'}</td>
                                <td>{new Date(point.currentTime * 1000).toLocaleString()}</td>
                                <td>{point.executionTime}</td>
                                <td style={{color: point.color}}>{point.color}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}