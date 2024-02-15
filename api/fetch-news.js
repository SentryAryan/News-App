const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${req.query.category}&page=${req.query.page}&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();

  res.status(200).json(data);
};
