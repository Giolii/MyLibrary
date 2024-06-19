function Book( title,author,pages,isRead) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.isRead = isRead
}

Book.prototype.toggleReadStatus = function() {
  this.isRead = this.isRead === 'read' ? 'notRead' : 'read';
};

const myLibrary = [
  new Book("Harry Potter", "JK Rowling", 324, "read"),
  new Book("The Hobbit", "JRR Tolkien", 452, "notRead"),
  new Book("The Alchemist", "Paulo Coelho", 208, "read"),
];

const open = document.querySelector('.new-book');
const dialog = document.querySelector('.modal');
const addBook = document.querySelector('.button');
const library = document.querySelector('.library');

open.addEventListener('click', ()=> dialog.showModal());



addBook.addEventListener('click', function addBookToLibrary(e){
  e.preventDefault();

const title = document.querySelector('.book-title-text').value;
const author = document.querySelector('.book-author-text').value;
const pages = document.querySelector('.book-pages-text').value;
const read = document.querySelector('input[name="isRead"]:checked').value; 


const book = new Book(title,author,pages,read);

myLibrary.push(book);
  //Reset Form
  let allInputs = document.querySelectorAll('input');
  allInputs.forEach(singleInput => singleInput.value = '');

  displayBooks();
  dialog.close();
})

function displayBooks(){
  library.innerHTML = ''; //clean library
for (let i = 0; i < myLibrary.length; i++) {
  let book = document.createElement('div');
  book.className = 'book';
  book.dataset.value = i;
  library.appendChild(book);

  let bookTitleP = document.createElement('div');
  bookTitleP.textContent = 'Title:';
  book.appendChild(bookTitleP);
  let bookTitle = document.createElement('div');
  bookTitle.textContent = myLibrary[i].title;
  book.appendChild(bookTitle);

  let bookAuthorP = document.createElement('div');
  bookAuthorP.textContent = 'Author:';
  book.appendChild(bookAuthorP);
  let bookAuthor = document.createElement('div');
  bookAuthor.textContent = myLibrary[i].author;
  book.appendChild(bookAuthor);

  let bookPagesP = document.createElement('div');
  bookPagesP.textContent = 'Pages:';
  book.appendChild(bookPagesP);
  let bookPages = document.createElement('div');
  bookPages.textContent = myLibrary[i].pages;
  book.appendChild(bookPages);

  let bookRead = document.createElement('button');
  bookRead.dataset.value = i;
  bookRead.className = myLibrary[i].isRead === 'read' ? 'okRead' : 'notRead';
  bookRead.textContent = myLibrary[i].isRead === 'read' ? 'Read' : 'Not Read';
  book.appendChild(bookRead);

  let closeButton = document.createElement('button')
  closeButton.textContent = 'Remove'
  closeButton.className = 'removeBook'
  closeButton.dataset.value = i;
  book.appendChild(closeButton)

  if (bookTitle.innerText === 'Harry Potter'){
    book.style.background = "url('https://m.media-amazon.com/images/I/71RVt35ZAbL._AC_UF1000,1000_QL80_.jpg') center / cover";
  } else if (bookTitle.innerText === 'The Hobbit'){
    book.style.background = "url('https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQpKQNfg-7TtswyNqBOHLRokfKc-0sbNOEVT3-bLCxwUgCXAJF5lxDqatCfuFZRWlobSpNt1zi_E2_CK1B6_uHY_II5hzBlKUlwIDqKFL3F1_rMfxsOIukfuBmu') center / cover";  
} else if (bookTitle.innerText === 'The Alchemist'){
  book.style.background = "url('https://m.media-amazon.com/images/I/71zHDXu1TaL._AC_UF1000,1000_QL80_.jpg') center / cover";  
}}
}

library.addEventListener('click', (e) =>{
  const index = e.target.dataset.value;
  if (e.target && e.target.matches('.removeBook')) {
    myLibrary.splice(index, 1);
    displayBooks();
  } else if ((e.target && e.target.matches('.notRead')) || (e.target && e.target.matches('.okRead'))) {
  myLibrary[index].toggleReadStatus();
  displayBooks();
}
})

displayBooks();