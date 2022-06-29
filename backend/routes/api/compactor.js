const express = require('express');
const router = express.Router();


// Load compactor model
const Compactor = require('../../models/compactor');

// @route GET api/compactor/test
// @description tests compactor route
// !!WORKS!!//
router.get('/test', (req, res) => res.send('compactor route testing successful'));

// @route GET api/compactor
// @description Get all compactor
// !!WORKS!!//
router.get('/', (req, res) => {
  Compactor.find()
    .then(compactor => res.json(compactor))
    .catch(err => res.status(404).json({ nocompactorfound: 'No compactor found' }));
});

// @route GET api/compactor/:id
// @description Get single compactor by id
// !!WORKS!!//
router.get('/:id', (req, res) => {
  Compactor.findById(req.params.id)
    .then(compactor => res.json(compactor))
    .catch(err => res.status(404).json({ nocompactorfound: 'No compactor found' }));
});

// @route POST api/compactor/post
// @description add/save compactor
// Old Testing version of Post without  proper handling of request post data

router.post('/post', (req, res) => { // route is edited to /api/post for testing.
  // !! Working Here !! //
  console.log(req.body);
  Compactor.create(req.body)
    .then(compactor => res.json({ msg: 'compactor added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this compactor' }));
});


// @route POST api/compactor
// @description add/save compactor 
// !!WORKS!!//
router.post('/', async (req, res) => {
  const compactor = new Compactor({
    username: req.body.username,
    items: req.body.items
  })
  try {
    const newCompactor = await compactor.save()
    res.status(201).json(newCompactor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// @route POST api/compactor/:id
// @description Update compactor Old version
router.put('/:id', (req, res) => {
  Compactor.findByIdAndUpdate(req.params.id, req.body)
    .then(compactor => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route POST api/compactor/:id
// @description Delete compactor by id
router.delete('/:id', (req, res) => {
  Compactor.findByIdAndRemove(req.params.id, req.body)
    .then(compactor => res.json({ mgs: 'compactor entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a compactor' }));
});

module.exports = router;
