import React from 'react';

const TABLE_HEADERS : string[] = ['X value', 'Y value', 'R value', 'HIT/MISS', 'Current time', 'Execution time(ms)', 'Color(RGB)'];

interface ResultsProps {
    points: ProcessedPoint[]
}

export const Results : React.FC<ResultsProps> = ({points} : ResultsProps) => {
    return (
        <div>
            <table id="results-table">
                <thead>
                    <tr>
                    {
                        TABLE_HEADERS.map((header : string) => <th>{header}</th>)
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        points.map((point : ProcessedPoint) => {
                            let poiter: number = 0;
                            return (
                                <tr>
                                    <td>{ point.x }</td>
                                    <td>{ point.y }</td>
                                    <td>{ point.r }</td>
                                    <td style={{color: point.success ? 'green': 'red'}}>{ point.success ? 'HIT' : 'MISS' }</td>
                                    <td>{ new Date(point.currentTime * 1000).toLocaleString() }</td>
                                    <td>{ point.executionTime }</td>
                                    <td>{ point.color }</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}