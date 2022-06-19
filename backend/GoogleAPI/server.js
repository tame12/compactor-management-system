const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/gapi", async (req, res) => {
	const { request, name } = req.body;

	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	// Create client instance for auth
	const client = await auth.getClient();

	// Instance of Google Sheets API
	const googleSheets = google.sheets({ version: "v4", auth: client });

	const spreadsheetId = "1eQSqUlu7ZAWsDrZN2UtbtTa36snBUThZBLelG1O4VH8";

	// Get metadata about spreadsheet
	const metaData = await googleSheets.spreadsheets.get({
		auth,
		spreadsheetId,
	});

	// Read rows from spreadsheet
	const getRows = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: "Form responses 1!B:I",
	});

	res.send(getRows.data);
	console.log("Meta:", metaData);
});

app.listen(1337, (req, res) => console.log("running on 1337"));
