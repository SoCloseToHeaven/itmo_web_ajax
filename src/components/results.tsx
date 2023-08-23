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
                    {
                        TABLE_HEADERS.map((header : string) => <th>{header}</th>)
                    }
                </thead>
            </table>
        </div>
    );
}