import React from "react";
import HorizontalBarChart from "../../components/HorizontalBarChart";
// data fetched from DB and rendered in format below
const data = [
    {
        "name": "Item A",
        "uv": 4,
    },
    {
        "name": "Item B",
        "uv": 3,
    },
    {
        "name": "Item C",
        "uv": 2,
    },
    {
        "name": "Item D",
        "uv": 2,
    },
    {
        "name": "Item E",
        "uv": 1,
    },
    {
        "name": "Item F",
        "uv": 2,
    },
    {
        "name": "Item G",
        "uv": 3,
    }
]
const Dashboard = () => {
    return (
        <>
            <HorizontalBarChart data={data} compactorID="Compactor 1"/>
            <HorizontalBarChart data={data} compactorID="Compactor 2"/>
        </>
    );
};

export default Dashboard;
