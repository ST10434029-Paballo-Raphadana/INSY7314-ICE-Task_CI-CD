require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
res.send(process.env.APP_NAME);
});

app.get('/health', (req, res) => {
res.json({ status: 'OK' });
});

app.post('/message', (req, res) => {
const { message } = req.body;
res.json({ received: message });
});

app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
    return res.status(400).json({ error: 'All fields required' });
    }
    if (name.length > 50) {
    return res.status(400).json({ error: 'Name too long' });
    }
    if (typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message' });
    }
    res.status(200).json({
    message: 'Data received',
    data: { name, message }
    });
});

app.listen(PORT, () => {
console.log(`Running on port ${PORT}`);
});
