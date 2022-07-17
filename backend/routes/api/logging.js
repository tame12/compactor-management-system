const express = require("express");
const router = express.Router();

// Load Logging model
const Logging = require("../../models/logging")

// @description tests logging route
// @route GET api/logging/test
// Works!
router.get("/test", (req, res) =>
	res.send("logging route testing successful")
);

// @description Get all logging
// @route GET api/logging
// Works!
router.get("/", (req, res) => {
	Logging.find()
		.then((logs) => res.json(logs))
		.catch((err) =>
			res.status(404).json({ logs: "No logs found" })
		);
});

// @description Get single logging by id
// @route GET api/logging/:id
// Works!
router.get("/:id", (req, res) => {
	Logging.findById(req.params.id)
		.then((logs) => res.json(logs))
		.catch((err) =>
			res.status(404).json({ nologsfound: "No logs found" })
		);
});

// @description add/save logging
// @route POST api/logging/post
// router.post("/", (req, res) => {
// 	// !! Working Here !! //

// 	// let newCom = new logging({
// 	//   username: req.body.username,
// 	//   date: req.body.date,
// 	//   items: req.body.items,
// 	// })
// 	// newCom.save()
// 	// res.redirect('/')
// 	// // console.log(req.body)

// 	logging.create({
// 		loggingID: req.body.loggingID,
// 		date: req.body.date,
// 		items: req.body.items,
// 	})
// 		.then((logging) => res.json({ msg: "logging added successfully" }))
// 		.catch((err) =>
// 			res.status(400).json({ error: "Unable to add this logging" })
// 		);
// });


// @description add/save logging 
// @route POST api/logging
// !!WORKS!!//
router.post('/', async (req, res) => {
	// const logging = new Logging({
	// 	// loggingID: req.body.loggingID,
	// 	username: req.body.username,
	// 	email: req.body.email,
	// 	compactorID: req.body.compactorID,
	// 	changedTtems: req.body.changeditems
	// })
	console.log("Request Body:",req.body);
	const logging = new Logging(req.body)
	try {
		const newLogging = await logging.save()
		console.log("Successfully Added Log: " + newLogging)
		res.status(201)
	} catch (err) {
		console.log("Backend problem " + err);
	}
})


// @description Delete logging by id
// @route POST api/logging/:id
router.delete("/:id", (req, res) => {
	Logging.findByIdAndRemove(req.params.id, req.body)
	.then((logging) =>
	res.json({ mgs: "logging entry deleted successfully" })
	)
	.catch((err) => res.status(404).json({ error: "No such log" }));
});

// // @description Update logging
// // @route POST api/logging/:id
// // NOTE: Currently does not work:  UPDATE Unnecessary for logs?
// router.put("/:id", (req, res) => {
// 	Logging.findByIdAndUpdate(req.params.id, req.body)
// 		.then((logging) => res.json({ msg: "Updated successfully" }))
// 		.catch((err) =>
// 			res.status(400).json({ error: "Unable to update the Database" })
// 		);
// });

module.exports = router;
