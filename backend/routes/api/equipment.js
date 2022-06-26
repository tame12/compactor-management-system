const express = require('express');
const router = express.Router();


// Load Equipment model
// const Equipment = require('../../models/equipment.js');
const Equipment = require('../../models/compactor');

// @route GET api/equipment/test
// @description tests equipment route
router.get('/test', (req, res) => res.send('equipment route testing!'));

// @route GET api/equipment
// @description Get all equipment
router.get('/', (req, res) => {
  Equipment.find()
    .then(equipment => res.json(equipment))
    .catch(err => res.status(404).json({ noequipmentfound: 'No equipment found' }));
});

// @route GET api/equipment/:id
// @description Get single equipment by id
router.get('/:id', (req, res) => {
  Equipment.findById(req.params.id)
    .then(equipment => res.json(equipment))
    .catch(err => res.status(404).json({ noequipmentfound: 'No equipment found' }));
});

// @route POST api/equipment
// @description add/save equipment
router.post('/', (req, res) => {
  // !! Working Here !! //
  console.log(req.body);
  Equipment.create(req.body)
    .then(equipment => res.json({ msg: 'equipment added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this equipment' }));
});

// @route POST api/equipment/:id
// @description Update equipment
router.put('/:id', (req, res) => {
  Equipment.findByIdAndUpdate(req.params.id, req.body)
    .then(equipment => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route POST api/equipment/:id
// @description Delete equipment by id
router.delete('/:id', (req, res) => {
  Equipment.findByIdAndRemove(req.params.id, req.body)
    .then(equipment => res.json({ mgs: 'equipment entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a equipment' }));
});

module.exports = router;
