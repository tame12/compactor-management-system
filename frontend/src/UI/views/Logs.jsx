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
	
	// If you do date.minutes(), and time is 1.09pm, it will return 9 instead of 09. Function adds the 0 infront of the 9
	function addZero(element) {
		if (element <= 9) {
			return "0" + element;
		}
		return element;
	}

	// reverses the array while adding the unique elements inside
	function reverser(array){
		var newArray = []
		for (var i=array.length-1;i>=0;i--){
			if ("movement" in array[i] && "changedItems" in array[i]){

				// this changedItems.map is neccessary
				
				array[i].changedItems.map((item)=>{
					newArray.push({changedItem: item.itemName, changedQty: item.itemQuantity,createdAt: array[i].createdAt,email:array[i].email,movement:array[i].movement,username:array[i].username,compactorID:array[i].compactorID})

					uniqueCompactors.add(array[i].compactorID.trim().replace(/`/g, ""));
					uniquePersons.add(array[i].email.trim().replace(/`/g, ""));
					uniqueMovements.add(array[i].movement.trim().replace(/`/g, ""));
					uniqueItems.add(item.itemName.trim().replace(/`/g, ""))
				})

				var date = new Date(array[i].createdAt);
				var currDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				uniqueDates.add(currDate);
			}

		}
		return newArray
	}
	var uniqueDates = new Set().add("all")
	var uniqueCompactors =new Set().add("all")
	var uniqueItems = new Set().add("all")
	var uniqueMovements = new Set().add("all")
	var uniquePersons = new Set().add("all")
	var uniqueArray = [uniqueDates,'',uniqueCompactors,uniqueItems,uniqueMovements,'',uniquePersons]
	var items = reverser(logsData);

	const [dateSearch, setDateSearch] = useState('');
	const [compactorSearch, setCompactorSearch] = useState("");
	const [itemSearch, setItemSearch] = useState('');
	const [movementSearch, setMovementSearch] = useState("");
	const [personSearch, setPersonSearch] = useState("");

	var uniqueSetter = [setDateSearch,'',setCompactorSearch,setItemSearch,setMovementSearch,'',setPersonSearch]

	// this is the main function that filters the results
	function checker(value){
		var toReturn = true
		var date = new Date(value.createdAt);
		var currDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;
		var uniqueChecker = [dateSearch,'',compactorSearch,itemSearch,movementSearch,'',personSearch]

		// for each entry in changedItems, I want to create a new array to check through
		var checkList = [currDate,'',value.compactorID,value.changedItem,value.movement,'',value.email]
			for (var i=0;i<7;i++){
			if (uniqueChecker[i] != ''){
				if (uniqueChecker[i] != checkList[i] && uniqueChecker[i] != "all"){ // this is that logic
					toReturn = false
				}
			}
		}
		if (toReturn){
			return value
		}
	}

	
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
								// Renders the dropdown select
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
							if ("movement" in val && "changedItem" in val) {
								return checker(val)
							}
						})
						.map((val, key) => {
							var date = new Date(val.createdAt);
							var currDate = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;
							return (
								<tr>
									<td>{currDate}</td>
									<td>{`${date.getHours()}${addZero(date.getMinutes())}`}</td>
									<td>{val.compactorID}</td>
									<td>{val.changedItem}</td>
									<td>{val.movement}</td>
									<td>{val.changedQty}</td>
									<td>{val.email}</td>
								</tr>

							)
						})}
						

				</tbody>
			</Table>
		</div>
	);
};

export default Logs;
