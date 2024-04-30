const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const port = 3050;

app.use(express.json());

app.get('/api/scrape', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword parameter is missing' });
    }

    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);

    const products = [];
    dom.window.document.querySelectorAll('.s-result-item').forEach((item) => {
      const title = item.querySelector('h2 span').textContent.trim();
      const rating = item.querySelector('.a-icon-star-small').textContent.trim();
      const numReviews = item.querySelector('.a-size-small .a-link-normal').textContent.trim();
      const imageUrl = item.querySelector('.s-image').getAttribute('src');
      
      products.push({ title, rating, numReviews, imageUrl });
    });

    res.json(products);
  } catch (error) {
    console.error('Error scraping Amazon:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});