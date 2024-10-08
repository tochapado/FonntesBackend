const express = require('express');
const router = express.Router();
const RolaCollection = require('../models/RolaCollection.js');

// Get ROLAS
router.get('/', async function(req, res) {
    try {
        const rolas = await RolaCollection.find();
        res.json({ success: true, data: rolas });
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    };
});

// Get Single ROLA
router.get('/:id', async function(req, res) {
    try {
        const rola = await RolaCollection.findById(req.params.id);
        res.json({ success: true, data: rola });
    } catch(error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Server error' });
    };
});

// Add a ROLA
router.post('/', async function(req, res) {
    const rola = new RolaCollection({
        rola: req.body.rola,
        username: req.body.username,
        tag: req.body.tag,
    });
    
    try {
        const savedRola = await rola.save();
        res.json({ success: true, data: savedRola });
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    };
});

// Update a ROLA
router.put('/:id', async function(req, res) {
    try {
        const rola = await RolaCollection.findById(req.params.id);

        // Match the usernames
        if(rola.username === req.body.username) {
            const updatedRola = await RolaCollection.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        rola: req.body.rola,
                        tag: req.body.tag,
                    },
                },
                { new: true }
            );
            return res.json({
                success: true,
                data: updatedRola,
            });
        };

        // Usernames dont match
        res.status(403).json({
            success: false,
            error: 'Not authorized',
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    };
});

// Delete ROLA
router.delete('/:id', async function(req, res) {
    try {
        const rola = await RolaCollection.findById(req.params.id);

        // Match the usernames
        if(rola.username === req.body.username) {
            await RolaCollection.findByIdAndDelete(req.params.id);
            return res.json({ success: true, message: 'deleted' });
        };

        // Usenames dont match
        res.status(403).json({
            success: false,
            error: 'Not authorized',
        });

    } catch(error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, error: 'Server error' });
    };
});

module.exports = router;