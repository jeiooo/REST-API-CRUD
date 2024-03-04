const express = require('express');
const app = express();

app.use(express.json());

const colors = [
    { id: 1, color: 'red'},
    { id: 2, color: 'orange'},
    { id: 3, color: 'yellow'},
    { id: 4, color: 'green'},
    { id: 5, color: 'blue'}
];

// VIEW ALL (READ ALL)
app.get('/api/colors', (req, res) => {
    res.send(colors);
});

// VIEW SPECIFIC (READ SPECIFIC)
app.get('/api/colors/:id', (req, res) => {
    const col = colors.find(c => c.id === parseInt(req.params.id));
    if (!col) res.status(400).send('The color with the given ID is not found');

    res.send(col);
});

// POST (CREATE)
app.post('/api/colors', (req, res) => {
    // if (!req.body.color || req.body.color.length < 3) #if num of char involve
    if (!req.body.color) {
        res.status(400).send('Color name should not be empty')
        return;
    }

    const col = {
        id: colors.length + 1,
        color: req.body.color
    };
    colors.push(col);
    res.send(col);
});

// PUT (EDIT/UPDATE)
app.put('/api/colors/:id', (req, res) => {
    const col = colors.find(c => c.id === parseInt(req.params.id));
    if (!col) res.status(400).send('The color with the given ID is not found');

    col.color = req.body.color;
    res.send(col);
});

// DELETE
app.delete('/api/colors/:id', (req, res) => {
    const col = colors.find(c => c.id === parseInt(req.params.id));
    if (!col) res.status(400).send('The color with the given ID is not found');

    const index = colors.indexOf(col);
    colors.splice(index, 1);

    res.send(col);
});



const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`
));