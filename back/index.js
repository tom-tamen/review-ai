import 'dotenv/config';
import MistralClient from '@mistralai/mistralai';
import express from 'express';
import Sentiment from 'sentiment';
import * as fs from 'fs'
import csv from 'csv-parser'

const sentiment = new Sentiment()
let results = []

fs.createReadStream('netflix_reviews.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
  });

const app = express();
app.use(express.json());

const port = 3000;

const apiKey = process.env.MISTRALAI_API_KEY;

const client = new MistralClient(apiKey);

app.get('/api/reviews', async (req, res) => {
  const itemCount = Math.random() * 1000
  const resp = []
  for(let i = 0; i < itemCount; i++) {
    const item = results[Math.floor(Math.random()*results.length)];
    const a = sentiment.analyze(item.content)
    const s = {
      sentiment: {
        score: a.score,
        comparative: a.comparative,
        positive: a.positive,
        negative: a.negative
      },
      content: item.content,
      rating: item.score
    }
    resp.push(s)
  }
    res.send(resp);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});