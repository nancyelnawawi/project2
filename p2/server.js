
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { promisify } = require('util');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Promisify fs.readFile and fs.writeFile for async/await
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Endpoint to handle form submissions
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const dataPath = path.join(__dirname, 'db', 'data.json');
        const data = await readFileAsync(dataPath, 'utf-8');
        const parsedData = JSON.parse(data);

        parsedData.messages.push({ name, email, message });
        await writeFileAsync(dataPath, JSON.stringify(parsedData, null, 2));

        res.status(200).send('Message received.');
    } catch (error) {
        console.error('Error writing to database:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
