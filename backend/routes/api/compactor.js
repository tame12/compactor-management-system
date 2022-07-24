const express = require("express");
const router = express.Router();

// Load compactor model
const Compactor = require("../../models/compactor");

// @description tests compactor route
// @route GET api/compactor/test
// Works!
router.get("/test", (req, res) =>
	res.send("logger route testing successful")
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
// This is commented out for now so that the route below works, because it is more likely for us to findby Compactor Number rather than Object ID
router.get("/mongoID/:id", (req, res) => {
	Compactor.findById(req.params.id)
		.then((compactor) => res.json(compactor))
		.catch((err) =>
			res.status(404).json({ nocompactorfound: "No compactor found" })
		);
});

// @description Get single compactor by specifying Compactor 1 or Compactor 2
// @route GET api/compactor/:id
// WORKS!!!
router.get("/:compactorID", (req, res) => {
  Compactor.findOne({ compactorID: req.params.compactorID })
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
    res.status(201).json({ message: "Successfully Updated Compactor"})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Finding Compactor ID Middleware for Update and Delete Routes (Using Object ID)
async function getCompactor(req, res, next) {
  let compactor
  try {
    compactor = await Compactor.findById(req.params.id)
    if (compactor == null) {
      return res.status(404).json({ message: 'Cannot find compactor' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.compactor = compactor
  next()
}

// @description Update compactor
// @route POST api/compactor/:id 
router.patch('/mongoID/:id', getCompactor, async (req, res) => {
  if (req.body.compactorID != null) {
    res.compactor.compactorID = req.body.compactorID
  }
  if (req.body.items != null) {
    res.compactor.items = req.body.items
  }
  try {
    const updatedCompactor = await res.compactor.save()
    res.json(updatedCompactor)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
})

// @description Delete compactor by id
// @route POST api/compactor/:id

router.delete("/mongoID/:id", getCompactor, async (req, res) => {
  try {
    await res.compactor.remove()
    res.json({ message: "Compactor Deleted Successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// Finding Compactor ID Middleware for Update and Delete Routes (Using Compactor Number 1 or 2)
async function getCompactorbyNumber(req, res, next) {
  let compactor
  try {
    // compactor = await Compactor.findById(req.params.id)
    compactor = await Compactor.findOne({ compactorID: req.params.compactorID })
    if (compactor == null) {
      return res.status(404).json({ message: 'Cannot find compactor' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.compactor = compactor // use this variable to access the compactor returned
  next()
}

// @description Update compactor by Compactor Number, not ObjectID
// @route POST api/compactor/:compactorID
router.patch('/:compactorID', getCompactorbyNumber, async (req, res) => {
  if (req.body.items != null) { // just in case an empty form is sent
    var changedItems = req.body.items
    var currentItems = res.compactor.items

    res.compactor.items = req.body.items // this is the original PATCH function which just replaces the existing compactor with the request body
    
    // testing //
    console.log("------------if i see this it works---------------------------")
    console.log("res.compactor.items: ", res.compactor.items)
    console.log("req.body.items: ", req.body.items) // 
    console.log("req.body.inOrOut: ", req.body.inOrOut) // 
    console.log("changedItems: ", changedItems) // 
    console.log("currentItems: ", currentItems) // 
    res.compactor.changedItems = "if i see this it works" // doesn't seem to work or show up inside MongoDB 
    console.log("res.compactor.changedItems: ", res.compactor.changedItems)
    // create a function here that parses changedItems and edits currentItems and assigns it to finalItems
      // iterate through changedItems and checks whether it exists inside currentItems and adds if yes, edits if no
    // res.compactor.items = finalItems

  }

  try {
    const updatedCompactor = await res.compactor.save()
		console.log("Successfully Updated Compactor: " + updatedCompactor)
    res.json(updatedCompactor)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
})

// @description Delete compactor by id
// @route POST api/compactor/:id

router.delete("/:compactorID", getCompactorbyNumber, async (req, res) => {
  try {
    await res.compactor.remove()
    res.json({ message: "Compactor Deleted Successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



module.exports = router;