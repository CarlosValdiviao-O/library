let library = [];
const content = document.getElementById('content');
function Book (title, author, pages, rating, read) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.rating = rating;
    this.read = read;
}

Book.prototype.addToLibrary = function () {
    library[library.length] = this;
}

function displayLibrary () {
    for (i = 0; i<library.length; i++)
    displayBook(library[i]);
}

function displayBook (book) {
    let card = createBookCard (); 
    updateValues (book, card);
}

function createBookCard () {
    const card = document.createElement('div');
    card.className = 'book';
    createContents(card);
    return card;
}

function createContents (card) {
    const title = document.createElement('h4');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const rating = document.createElement('p');
    const read = document.createElement('p');
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(rating);
    card.appendChild(read);
    content.appendChild(card);
}

function updateValues (book, card) { 
    card.firstChild.textContent = book.title;
    card.childNodes[1].textContent = book.author;
    card.childNodes[2].textContent = book.pages;
    card.childNodes[3].textContent = book.rating;
    card.childNodes[4].textContent = book.read;
}

const background = document.getElementById('background');
const addButton = document.getElementById('new-book');
addButton.addEventListener('click', displayForm);



function displayForm () {
    background.classList.add('active');
}

let Harry = new Book ('Harry', 'J.K.', 152, 8, 'nel');
let x = new Book ('s', 's', 2, 3, 's');
Harry.addToLibrary();
x.addToLibrary();

displayLibrary();
