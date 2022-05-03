let library = [];
let indexAux;
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

    const rating = document.createElement('select');
    rating.addEventListener('click', () => updateRating(card.dataset.i));

    const none = document.createElement('option');
    none.value = '--';
    none.text = '--';
    rating.add(none);
    for (let i=0; i<=10; i++){
        let score = document.createElement('option');
        score.value = i;
        score.text = i;
        rating.add(score);
    }

    const read = document.createElement('select');
    read.addEventListener('click', () => updateRead(card.dataset.i));

    const read1 = document.createElement('option');
    read1.value = 'not_read';
    read1.text = 'Not Read';
    read.add(read1);
    const read2 = document.createElement('option');
    read2.value = 'reading';
    read2.text = 'Reading';
    read.add(read2);
    const read3 = document.createElement('option');
    read3.value = 'read';
    read3.text = 'Read';
    read.add(read3);
    
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
    card.childNodes[3].value = book.rating;
    card.childNodes[4].value = book.read;
}

const form = document.getElementById('form')
const background = document.getElementById('background');
background.addEventListener('click', hideForm);
const addButton = document.getElementById('new-book');
addButton.addEventListener('click', displayForm);
const submit = document.querySelector('#submit');
submit.addEventListener('click', post);
const edit = document.querySelector('#edit');
edit.addEventListener('click', editCard);
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
    setTimeout(() => {
        submit.classList.add('active');
        edit.classList.remove('active');
    }, 100);
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
    read.value = library[index].read;
    indexAux = index;
}

function editCard () {
    let array = Array.from(document.getElementsByClassName('book'));
    updateBook (indexAux);
    updateValues (library[indexAux], array[indexAux]);
    hideForm();
}

function updateBook(index) {
    library[index].title = title.value;
    library[index].author = author.value;
    library[index].pages = pages.value;
    library[index].rating = rating.value;
    library[index].read = read.value;
}

function updateRead (index) {
    let array = Array.from(document.getElementsByClassName('book'));
    library[index].read = array[index].childNodes[4].value;
}

function updateRating (index) {
    let array = Array.from(document.getElementsByClassName('book'));
    library[index].rating = array[index].childNodes[3].value;
    //console.log(library[index]);
    //console.log(array[index]);
    //console.log(index)
}

let Harry = new Book ('Harry', 'J.K.', 152, 8, 'not_read');
let x = new Book ('s', 's', 2, 3, 'read');
Harry.addToLibrary();
x.addToLibrary();

displayLibrary();
