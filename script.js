// *BEGIN*
let library = [];
let indexAux;
const content = document.getElementById('content');

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

const bookCount = document.querySelector('.total');
const readCount = document.querySelector('.read');
const readingCount = document.querySelector('.reading');
const notReadCount = document.querySelector('.not-read');

const instructions = Array.from(document.getElementsByClassName('instructions'));
const input = Array.from(document.getElementsByClassName('required'));

for (let i=0; i<input.length; i++) input[i].addEventListener('input',() => checkInputValidity(i));

// *CREATE BOOKS*
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

// *DISPLAY BOOKS*
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
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const cover = document.createElement('div');
    cover.className = 'cover';

    cover.appendChild(title);
    cover.appendChild(author);

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

    const ratingBefore = document.createElement('p');
    ratingBefore.textContent = 'Your Score: ';

    const ratingAfter = document.createElement('p');
    ratingAfter.textContent = '/10';

    const divRating = document.createElement('div');
    divRating.className = 'rating';

    divRating.appendChild(ratingBefore);
    divRating.appendChild(rating);
    divRating.appendChild(ratingAfter);

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

    const readBefore = document.createElement('p');
    readBefore.textContent = 'Status: ';

    const divRead = document.createElement('div');
    divRead.className = 'read';

    divRead.appendChild(readBefore);
    divRead.appendChild(read);

    const info = document.createElement('div');
    info.className = 'info';

    info.appendChild(pages);
    info.appendChild(divRating);
    info.appendChild(divRead);
    
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.title = 'Edit book';
    edit.addEventListener('click', () => displayEdit(card.dataset.i));

    let icon = document.createElement('img');
    icon.src = 'icons/edit.svg';
    edit.appendChild(icon);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.title = 'Delete book';
    remove.addEventListener('click', () => removeBook(card.dataset.i));

    icon = document.createElement('img');
    icon.src = 'icons/delete.svg';
    remove.appendChild(icon);

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    buttons.appendChild(edit);
    buttons.appendChild(remove);

    card.appendChild(cover);
    card.appendChild(info);
    card.appendChild(buttons);
    content.appendChild(card);
}

function updateValues (book, card) { 
    card.firstChild.firstChild.textContent = book.title;
    card.firstChild.lastChild.textContent = book.author;
    card.childNodes[1].firstChild.textContent = book.pages;
    card.childNodes[1].childNodes[1].childNodes[1].value = book.rating;
    card.childNodes[1].childNodes[2].childNodes[1].value = book.read;
    updateCounters();
}

// *ADD NEW BOOK*
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
        let array = Array.from(document.getElementsByClassName('instructions'));
        for (let i = 0; i<array.length; i++) array[i].classList.remove('active');
    }, 100);
}

function post() {
    if (form.checkValidity()) {
        let newBook = new Book (title.value, author.value, pages.value, rating.value, read.value);
        newBook.addToLibrary();
        displayBook(newBook);
        hideForm();
    }
    else {
        checkFormValidity();
    }
}

// *DELETE BOOK*
function removeBook (index) {
    library.splice(index, 1);
    let card = document.querySelector(`div[data-i="${index}"]`);
    card.classList.add('delete');
    updateCounters();
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

// *EDIT BOOK*
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
    if (form.checkValidity()) {
        let array = Array.from(document.getElementsByClassName('book'));
        updateBook (indexAux);
        updateValues (library[indexAux], array[indexAux]);
        hideForm();
    }
    else {
        checkFormValidity();
    }   
}

function updateBook(index) {
    library[index].title = title.value;
    library[index].author = author.value;
    library[index].pages = pages.value;
    library[index].rating = rating.value;
    library[index].read = read.value;
    updateCounters();
}

function updateRead (index) {
    let array = Array.from(document.getElementsByClassName('book'));
    library[index].read = array[index].childNodes[1].childNodes[2].childNodes[1].value;
    updateCounters();
}

function updateRating (index) {
    let array = Array.from(document.getElementsByClassName('book'));
    library[index].rating = array[index].childNodes[1].childNodes[1].childNodes[1].value;
    updateCounters();
}

// *UPDATE COUNTERS*
function updateCounters () {
    bookCount.textContent = library.length;
    readCount.textContent = 0;
    readingCount.textContent = 0;
    notReadCount.textContent = 0;
    for (let i = 0; i<library.length; i++) {
        let status = library[i].read;
        if (status == 'read') readCount.textContent++;
        if (status == 'reading') readingCount.textContent++;
        if (status == 'not_read') notReadCount.textContent++;
    }
}

// *FORM VALIDATION* 
function checkFormValidity() {
    for (let i = 0; i<instructions.length; i++) checkInputValidity (i);
}

function checkInputValidity (i) {
    if (input[i].validity.valid) instructions[i].classList.remove('active');
    else instructions[i].classList.add('active');
}

let Harry = new Book ('Harry', 'J.K.', 152, 8, 'not_read');
let x = new Book ('s', 's', 2, 3, 'read');
Harry.addToLibrary();
x.addToLibrary();

displayLibrary();
