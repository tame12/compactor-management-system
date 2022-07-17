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

	// Getting Headers
	console.log("Here is the logs Data:", logsData);

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
	var prevDate = new Date(logsData[0].createdAt)
	prevDate = prevDate.getDate() +'/'+ prevDate.getMonth() + "/"+ prevDate.getFullYear()

	for (var i=0;i < logsData.length; i++){
		
		var date = new Date(logsData[i].createdAt)
		var currDate = date.getDate() +'/'+ date.getMonth() + "/"+ date.getFullYear()
		if (currDate != prevDate){
			prevDate = currDate
			contents += `<tr class="blank_row" style="background-color: #A9A9A9;"><td colspan=${titles.length}></td></tr>`
		}
		contents += `<tr>`
		contents += `<td>`+ currDate + `</td>`
		
		

		contents += `</tr>`
		
	}
	// for (var i = 8; i < backData.values.length; i++) {
	// 	var info = backData.values[i];
	// 	var row = `<tr>`;
	// for (var l = 0; l < info.length; l++){
	//   row += `<td>${info[l]}</td>`;
	// }
	// row += `<tr>`;
	// contents += row
	// }

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
