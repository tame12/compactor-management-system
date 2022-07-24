import React from "react";
import { useEffect, useState } from 'react';
import HorizontalBarChart from "../../components/HorizontalBarChart";
// data fetched from DB and rendered in format below
// const data = [
//     {
//         "name": "Item A",
//         "uv": 4,
//     },
//     {
//         "name": "Item B",
//         "uv": 3,
//     },
//     {
//         "name": "Item C",
//         "uv": 2,
//     },
//     {
//         "name": "Item D",
//         "uv": 2,
//     },
//     {
//         "name": "Item E",
//         "uv": 1,
//     },
//     {
//         "name": "Item F",
//         "uv": 2,
//     },
//     {
//         "name": "Item G",
//         "uv": 3,
//     }
// ]


const Dashboard = () => {
    const[data, setData] = useState([]);
    useEffect(() => {
        async function fetchCompactorData() {
            const url = "http://localhost:8082/api/compactor/"
            try {
                const response = await fetch(url)
                if (response.ok) {
                    let json = await response.json();
                    let compactors = json.slice(0,2)

                    let formattedCompactors = []
                    for (let compactor of compactors){
                        let formattedItems = []
                        let compactorId = compactor.compactorID
                        for (let itemObject of compactor.items) {
                            formattedItems.push({"name": itemObject.itemName, "quantity": itemObject.itemQuantity})
                        }
                        formattedCompactors.push({
                            "compactorId": compactorId,
                            "items": formattedItems
                        })
                    }
                    setData(formattedCompactors)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchCompactorData();
    }, [])
    
    return (
        <>
            {
                data.map((compactor) => {
                    return (
                        <HorizontalBarChart data={compactor.items} compactorID={`Compactor ${compactor.compactorId}`} />
                    )
                })
            }
        </>
    );
};

export default Dashboard;
