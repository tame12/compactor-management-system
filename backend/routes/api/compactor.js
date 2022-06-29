const express = require("express");
const router = express.Router();

// Load compactor model
const Compactor = require("../../models/compactor");

// @description tests compactor route
// @route GET api/compactor/test
// Works!
router.get("/test", (req, res) =>
	res.send("compactor route testing successful")
);

// @description Get all compactor
// @route GET api/compactor
// Works!
router.get("/", (req, res) => {
	Compactor.find()
		.then((compactor) => res.json(compactor))
		.catch((err) =>
			res.status(404).json({ nocompactorfound: "No compactor found" })
		);
});

// @description Get single compactor by id
// @route GET api/compactor/:id
// Works!
router.get("/:id", (req, res) => {
	Compactor.findById(req.params.id)
		.then((compactor) => res.json(compactor))
		.catch((err) =>
			res.status(404).json({ nocompactorfound: "No compactor found" })
		);
});

// @description add/save compactor
// @route POST api/compactor/post
// router.post("/", (req, res) => {
// 	// !! Working Here !! //

// 	// let newCom = new Compactor({
// 	//   username: req.body.username,
// 	//   date: req.body.date,
// 	//   items: req.body.items,
// 	// })
// 	// newCom.save()
// 	// res.redirect('/')
// 	// // console.log(req.body)

// 	Compactor.create({
// 		compactorID: req.body.compactorID,
// 		date: req.body.date,
// 		items: req.body.items,
// 	})
// 		.then((compactor) => res.json({ msg: "compactor added successfully" }))
// 		.catch((err) =>
// 			res.status(400).json({ error: "Unable to add this compactor" })
// 		);
// });


// @description add/save compactor 
// @route POST api/compactor
// !!WORKS!!//
router.post('/', async (req, res) => {
  const compactor = new Compactor({
    compactorID: req.body.compactorID,
    items: req.body.items
  })
  try {
    const newCompactor = await compactor.save()
    res.status(201).json(newCompactor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// @description Update compactor Basic
// @route POST api/compactor/:id
router.put("/:id", (req, res) => {
	Compactor.findByIdAndUpdate(req.params.id, req.body)
		.then((compactor) => res.json({ msg: "Updated successfully" }))
		.catch((err) =>
			res.status(400).json({ error: "Unable to update the Database" })
		);
});

// Finding Compactor ID Middleware for Update and Delete Routes
async function getCompactor(req, res, next) {
  let compactor
  try {
    compactor = await Compactor.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find compactor' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.compactor = compactor
  next()
}

// @description Delete compactor by id
// @route POST api/compactor/:id
router.delete("/:id", (req, res) => {
	Compactor.findByIdAndRemove(req.params.id, req.body)
		.then((compactor) =>
			res.json({ mgs: "compactor entry deleted successfully" })
		)
		.catch((err) => res.status(404).json({ error: "No such a compactor" }));
});

module.exports = router;
