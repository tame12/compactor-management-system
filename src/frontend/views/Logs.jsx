import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Logs = () => {
	const [backData, setbackData] = useState([{}]);
	useEffect(() => {
		fetch("/gapi")
			.then((response) => response.json())
			.then((data) => setbackData(data));
	}, []);
	// I think the empty [] makes it render just 1x when the thing is loaded up.

  // Getting Headers 
  var headers = ``;
	backData.values[7]?.map((key) => (headers += `<th key=${key}>${key}</th>`));

  // Getting Contents
	var contents = ``;
	for (var i = 8; i < backData.values.length; i++) {
		var info = backData.values[i];
		var row = `<tr>`;
    for (var l = 0; l < info.length; l++){
      row += `<td>${info[l]}</td>`;
    }
    row += `<tr>`;
    contents += row
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
