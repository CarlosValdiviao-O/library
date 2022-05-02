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
    card.dataset.i = library.indexOf(book);
}

function createBookCard () {
    const card = document.createElement('div');
    card.className = 'book';
    card.classList.add('new');
    setTimeout(() => card.classList.remove('new'), 100);
    createContents(card);
    return card;
}

function createContents (card) {
    const title = document.createElement('h4');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const rating = document.createElement('p');
    const read = document.createElement('p');
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.textContent = 'Edit';
    edit.addEventListener('click', () => displayEdit(card.dataset.i));
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'x';
    remove.addEventListener('click', () => removeBook(card.dataset.i));
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(rating);
    card.appendChild(read);
    card.appendChild(edit);
    card.appendChild(remove);
    content.appendChild(card);
}

function updateValues (book, card) { 
    card.firstChild.textContent = book.title;
    card.childNodes[1].textContent = book.author;
    card.childNodes[2].textContent = book.pages;
    card.childNodes[3].textContent = book.rating;
    card.childNodes[4].textContent = book.read;
}

const form = document.getElementById('form')
const background = document.getElementById('background');
background.addEventListener('click', hideForm);
const addButton = document.getElementById('new-book');
addButton.addEventListener('click', displayForm);
const submit = document.querySelector('#submit');
submit.addEventListener('click', post);
const edit = document.querySelector('#edit');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const rating = document.getElementById('rating');
const read = document.getElementById('read');



function displayForm () {
    background.classList.add('active');
    form.classList.add('active');
    title.value = '';
    author.value = ''; 
    pages.value = '';
    rating.value = '--';
    read.value = 'not_read';
}

function hideForm() {
    background.classList.remove('active');
    form.classList.remove('active'); 
}

function post() {
    let newBook = new Book (title.value, author.value, pages.value, rating.value, read.value);
    newBook.addToLibrary();
    displayBook(newBook);
    hideForm();
}

function removeBook (index) {
    library.splice(index, 1);
    let card = document.querySelector(`div[data-i="${index}"]`);
    card.classList.add('delete');
    setTimeout(() => {
        card.remove();
        updateCardsIndex();
    }, 100);
}

function updateCardsIndex () {
    let array = Array.from(document.getElementsByClassName('book'));
    for (let i=0; i<array.length; i++){
        array[i].dataset.i = i;
    }
}

function displayEdit (index) {
    displayForm();
    submit.classList.remove('active');
    edit.classList.add('active');
    title.value = library[index].title;
    author.value = library[index].author;
    pages.value = library[index].pages;
    rating.value = library[index].rating;
    read.value = library[index].read
}

let Harry = new Book ('Harry', 'J.K.', 152, 8, 'not_read');
let x = new Book ('s', 's', 2, 3, 'read');
Harry.addToLibrary();
x.addToLibrary();

displayLibrary();
