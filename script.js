const apiKey = 'aa9d5e9142f448af8fc0fa0877afe50f'; // Replace with your actual API key
const newsContainer = document.getElementById('news-container');
const spinner = document.getElementById('spinner');
const searchMoreButton = document.querySelector('.read-more');
let currentCategory = 'general';
let page = 1;

const fetchNews = async (category) => {
  spinner.style.display = 'block'; // Show the spinner
  newsContainer.style.display = 'none'; // Hide the news container
  searchMoreButton.style.display = 'none'; // Hide the "Search More News" button

  // Clear the news container if fetching the first page
  if (page === 1) {
    newsContainer.innerHTML = '';
  }

  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=${apiKey}`);
  const data = await response.json();

  if (!data.articles) {
    console.log('No articles found');
    return;
  }

  for (let article of data.articles) {
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article');
    newsArticle.innerHTML = `
      <img src="${article.urlToImage}" alt="News Image">
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;
    newsArticle.addEventListener('click', () => {
        window.open(article.url, '_blank');
    });
    newsContainer.appendChild(newsArticle);
}

  // Reset the page number if changing category
  if (category !== currentCategory) {
    page = 1;
    currentCategory = category;
  }

  spinner.style.display = 'none'; // Show the spinner
  newsContainer.style.display = 'flex'; // Show the news container
  searchMoreButton.style.display = 'block'; // Show the "Search More News" button
}

const searchMoreNews = () => {
  // Increment the page number and fetch more news from the current category
  page++;
  fetchNews(currentCategory);
}

// Fetch the initial news when the page loads
fetchNews(currentCategory);