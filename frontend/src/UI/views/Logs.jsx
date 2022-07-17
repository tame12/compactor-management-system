import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Logs = () => {
	const [logsData, setbackData] = useState([{}]);
	useEffect(() => {
		fetch("http://localhost:8082/api/logging")
			.then((response) => response.json())
			.then((data) => setbackData(data));
	}, []);
	// I think the empty [] makes it render just 1x when the thing is loaded up.
	//   Data Pre-Processing
	var headers = ``;
	const titles = [
		'Date',
		'Time',
		'Compactor',
		'Item',
		'Stock In / Stock Out',
		'Quantity',
		'Person',

	]
	titles.map((header) => headers += `<th key=${header}>${header}</th>`)

	// Getting Contents
	var contents = ``;
	var prevDate = null

	for (var i=0;i < logsData.length; i++){
		
		// Checks if the movement key is present or not 
		if ("movement" in logsData[i]){
			for (var j=0;j<logsData[i].changedItems.length;j++){
				var item = logsData[i].changedItems[j].itemName;
				var quantity = logsData[i].changedItems[j].itemQuantity;
				var date = new Date(logsData[i].createdAt)
				var currDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

				contents += `<tr>`
				contents += `<td>`+ currDate + `</td>`
				contents += `<td>`+ `${date.getHours()}${date.getMinutes()}` + `</td>`
				contents += `<td>`+ logsData[i].compactorID + `</td>`
				contents += `<td>`+ item + `</td>`
				contents += `<td>`+ logsData[i].movement + `</td>`
				contents += `<td>`+ quantity + `</td>`
				contents += `<td>`+ logsData[i].email + `</td>`

				// Inputs black row between 
				if (currDate != prevDate && prevDate !== null){
					prevDate = currDate
					contents += `<tr class="blank_row" style="background-color: #A9A9A9;"><td colspan=${titles.length}></td></tr>`
				}
			}	
		}

		
	}
	return (
		<div>
			<Table striped bordered hover>
				<thead dangerouslySetInnerHTML={{ __html: headers }}></thead>
				<tbody dangerouslySetInnerHTML={{ __html: contents }}></tbody>
			</Table>
		</div>
	);
};

export default Logs;
