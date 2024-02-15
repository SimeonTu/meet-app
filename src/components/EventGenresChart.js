// src/components/CityEventsChart.js

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {

    const [data, setData] = useState([]);
    const genres = useMemo(() => ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'], []);
    const colors = ['#eed2ef', '#d2d3ef', '#efd2d3', '#d3efd2', '#efeed2'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill={colors[index]}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                style={{ fontSize: "1.15rem", fontWeight: "bold", textShadow: "1px 1px 2px rgb(56, 49, 55)", padding: "5px" }}
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    const getData = useCallback(() => {
        const data = genres.map((genre) => {
            const filteredEventsLength = events.filter(event => event.summary.includes(genre)).length;
            console.log(filteredEventsLength);
            return { name: genre, value: filteredEventsLength };
        })
        return data;
    }, [events, genres]);

    useEffect(() => {
        setData(getData());
    }, [getData]);

    return (
        <ResponsiveContainer className="event-genres-chart" width={window.innerWidth > 768 ? "80%" : "99%"} height={400}>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            fill="#8884d8"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={130}
                        >
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                ))
                            }
                        </Pie>
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </ResponsiveContainer>
    );
}


export default EventGenresChart;