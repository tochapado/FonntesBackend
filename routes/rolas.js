const express = require('express');
const router = express.Router();

const rolas = [
    { id: 1, rola: 'rola1' },
    { id: 2, rola: 'rola2' },
    { id: 3, rola: 'rola3' },
    { id: 4, rola: 'rola4' },
];

// Get ROLAS
router.get('/', function(req, res) {
    res.json({ success: true, data: rolas });
});

// Get Single ROLA
router.get('/:id', function(req, res) {
    let rola;
    
    for(let i = 0; i < rolas.length; i++) {
        if(rolas[i].id === +req.params.id) {
            rola = rolas[i];
            break;
        };
    };

    if(!rola) {
        return res
            .status(404)
            .json({ success: false, error: 'Not found' });
    };
    
    res.json({
        success: true,
        data: rola,
    });
});

// Add a ROLA
router.post('/', function(req, res) {
    const rola = {
        id: rolas.length + 1,
        rola: req.body.rola,
    };

    rolas.push(rola);

    res.json({ success: true, data: rola });
});

// Update a ROLA
router.put('/:id', function(req, res) {
    let rola;

    for(let i = 0; i < rolas.length; i++) {
        if(rolas[i].id === +req.params.id) {
            rola = rolas[i];
            break;
        };
    };

    if(!rola) {
        return res
            .status(404)
            .json({ success: false, error: 'Not found' });
    };

    if(req.body.rola) {
        rola.rola = req.body.rola;
    };

    res.json({ success: true, data: rola });
});

// Delete ROLA
router.delete('/:id', function(req, res) {
    let newRolas = [];

    for(let i = 0; i < rolas.length; i++) {
        if(rolas[i].id === +req.params.id) {
            continue;
        };

        newRolas.push(rolas[i]);
    };

    if(rolas.length === newRolas.length) {
        return (
            res
                .status(404)
                .json({ success: false, error: 'Nothing deleted' })
        );
    };

    for(let i = rolas.length - 1; i >= 0; i--) {
        rolas.pop();
    };

    for(let i = 0; i < newRolas.length; i++) {
        rolas.push(newRolas[i]);
    };

    res.json({ success: true, data: rolas });
});

module.exports = router;