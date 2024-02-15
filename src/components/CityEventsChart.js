// src/components/CityEventsChart.js

import { useState, useEffect, useCallback } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ZAxis
} from 'recharts';

const CityEventsChart = ({ events, locations }) => {

    const [data, setData] = useState([]);

    const getData = useCallback(() => {
        const data = locations.map((location) => {
            const count = events.filter((event) => event.location === location).length
            const city = location.split((/, | - /))[0]
            return { city, count };
        })
        return data;
    }, [events, locations]);

    useEffect(() => {
        setData(getData());
    }, [getData]);

    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 50,
                    bottom: 60,
                    left: 10,
                }}
            >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City"
                angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
                <YAxis type="number" dataKey="count" name="Number of events" />
                <ZAxis range={[200, 201]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A school" data={data} fill="#e8bfc1" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}


export default CityEventsChart;