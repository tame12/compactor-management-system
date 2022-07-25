import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Logs = () => {
	var [logsData, setbackData] = useState([{}]);
	useEffect(() => {
		fetch("http://localhost:8082/api/logging")
			.then((response) => response.json())
			.then((data) => setbackData(data));
	}, []);
	// I think the empty [] makes it render just 1x when the thing is loaded up.
	//   Data Pre-Processing
	var headers = ``;
	const titles = [
		"Date",
		"Time",
		"Compactor",
		"Item",
		"Stock In / Stock Out",
		"Quantity",
		"Person",
	];
	titles.map((header) => (headers += `<th key=${header}>${header}</th>`));
	
	// Getting Contents
	// var contents = ``;
	// var prevDate = null

	// If you do date.minutes(), and time is 1.09pm, it will return 9 instead of 09. Function adds the 0 infront of the 9
	function addZero(element) {
		if (element <= 9) {
			return "0" + element;
		}
		return element;
	}

	function reverser(array){
		var newArray = []
		for (var i=array.length-1;i>=0;i--){
			newArray.push(array[i])
			var date = new Date(array[i].createdAt);
			var currDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
			uniqueCompactors.add(array[i].compactorID);
			uniquePersons.add(array[i].email);
			uniqueMovements.add(array[i].movement);
			uniqueDates.add(currDate);

		}
		return newArray
	}
	var uniqueDates = new Set()
	var uniqueCompactors = new Set()
	var uniqueItems = new Set()
	var uniqueMovements = new Set()
	var uniquePersons = new Set()
	var uniqueArray = [uniqueDates,'',uniqueCompactors,uniqueItems,uniqueMovements,'',uniquePersons]
	var items = reverser(logsData);
	
	const [dateSearch, setDateSearch] = useState('');
	const [compactorSearch, setCompactorSearch] = useState("");
	const [itemSearch, setItemSearch] = useState('');
	const [movementSearch, setMovementSearch] = useState("");
	const [personSearch, setPersonSearch] = useState("");

	var uniqueSetter = [setDateSearch,'',setCompactorSearch,setItemSearch,setMovementSearch,'',setPersonSearch]

	function checker(value){
		console.log(value);
		return value
	}


	// var storage = new Set();
	
	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						{titles.map((val) => {
							var index = titles.indexOf(val)
							return <th>{val}
							<div name={val} id={val}>
								{
								
								uniqueArray.filter((array) =>{
									if (array.size != 0 && uniqueArray.indexOf(array) == index){
										return array
									}
								}).map((data)=>{
									return (
										<select name={val} id={index} onChange={(event)=>{
											uniqueSetter[index](event.target.value)
										}}>{[...data].map((o)=>{
											return <option>{o}</option>
										})}</select>
									)
								})
								
								}
							
								
							</div>
							</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{items
						.filter((val) => {
							if ("movement" in val && "changedItems" in val) {
								return checker(val)
							}
						})
						.map((val, key) => {
							var date = new Date(val.createdAt);
							var currDate = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;
							for (var j = 0; j < val.changedItems.length; j++) {
								return (
									<tr>
										<td>{currDate}</td>
										<td>{`${date.getHours()}${addZero(date.getMinutes())}`}</td>
										<td>{val.compactorID}</td>
										<td>{val.changedItems[j].itemName}</td>
										<td>{val.movement}</td>
										<td>{val.changedItems[j].itemQuantity}</td>
										<td>{val.email}</td>
									</tr>
								);
							}
						})}
						

				</tbody>
			</Table>
		</div>
	);
};

export default Logs;
