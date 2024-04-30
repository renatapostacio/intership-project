document.getElementById('scrapeBtn').addEventListener('click', async () => {
  const keyword = document.getElementById('keyword').value.trim();
  if (!keyword) {
    alert('Please enter a keyword to search');
    return;
  }

  try {
    const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error('Error scraping:', error);
    alert('An error occurred while scraping data');
  }
});

function displayResults(products) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const img = document.createElement('img');
    img.src = product.imageUrl;

    const title = document.createElement('h3');
    title.textContent = product.title;

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${product.rating}`;

    const numReviews = document.createElement('p');
    numReviews.textContent = `Reviews: ${product.numReviews}`;

    productDiv.appendChild(img);
    productDiv.appendChild(title);
    productDiv.appendChild(rating);
    productDiv.appendChild(numReviews);

    resultsDiv.appendChild(productDiv);
  });
}