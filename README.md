# Review AI

Get all the reviews:

```
GET http://localhost:3000/api/reviews
```

L'objet reçu:

```js
{
  sentiment: {
    score: number // positive or negativ number representing the overall score of the review
    comparative: jsp c koi
    positive: string[] // array of the positive words
    negative: string[] // array of the negative words
  },
  content: string // content of the review
  rating: string // number of stars of the comment
}
```