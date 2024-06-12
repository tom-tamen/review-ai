import 'dotenv/config';
import MistralClient from '@mistralai/mistralai';
import express from 'express';

const app = express();
app.use(express.json());

const port = 3000;

const apiKey = process.env.MISTRALAI_API_KEY;

const client = new MistralClient(apiKey);

app.get('/review', async (req, res) => {
    const shop = req.body.shop;
    const chatResponse = await client.chat({
        model: 'mistral-tiny',
        messages: [
            {role: 'system', content: "Generate a list of 50 random reviews in french for a shop in a JavaScript array format. Each review should be structured as an object within the array, containing two properties: 'author' and 'content'. 'author' should be a randomly generated name, and 'content' should contain a review that balances both positive and negative aspects with a random sentiment ratio. The reviews should realistically simulate what might be found in customer feedback, with a natural mix of satisfaction and critique. The final array should be formatted as follows: [{author: 'Name', content: 'Review text'}, ...]."},
            {role: 'user', content: `My shop is "${shop}"`}
        ],
    });

    res.status(200).send(chatResponse.choices[0].message.content);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});