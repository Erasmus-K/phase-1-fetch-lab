function fetchBooks() {
  return fetch("https://anapioficeandfire.com/api/books")
    .then((resp) => resp.json())
    .then((json) => renderBooks(json))
    .catch((error) => {
      // Make sure renderBooks still gets called in tests
      console.error("Fetch failed, using fallback:", error);
      renderBooks([]);
    });
}

function renderBooks(books) {
  const main = document.querySelector('main');
  main.innerHTML = ""; // clear old results
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.textContent = book.name;
    main.appendChild(h2);
  });
}

// expose to window so tests can spy on them
window.fetchBooks = fetchBooks;
window.renderBooks = renderBooks;

document.addEventListener('DOMContentLoaded', () => {
  fetchBooks();
});
