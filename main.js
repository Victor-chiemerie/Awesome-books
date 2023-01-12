// import Books from 'book.js';

/* eslint max-classes-per-file: ["error", 2] */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addBook", "removeBook"] }] */

let shelf = [];

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  addBook(Booktitle, Bookauthor) {
    if (Booktitle && Bookauthor) {
      const newBook = new Books(Booktitle, Bookauthor);
      shelf.push(newBook);
    }
  }

  removeBook(index) {
    shelf.splice(index, 1);
  }
}

const booklist = document.querySelector('#booklist');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const buttonAdd = document.getElementById('add_button');

const stringShelf = localStorage.getItem('shelf');
const obj = new Library();

if (stringShelf) {
  const parsedShelf = JSON.parse(stringShelf);
  if (parsedShelf !== null) {
    shelf = parsedShelf;
  }
}

function printBooks() {
  let innerhtml = '';

  shelf.forEach((book, index) => {
    innerhtml += `
    <div>
        <p>"${book.title}" by ${book.author} </p>
        <button id="remove-btn${index}">Remove</button>
            </div>
        `;
  });

  booklist.innerHTML = innerhtml;

  shelf.forEach((book, index) => {
    const removeBtn = document.getElementById(`remove-btn${index}`);
    removeBtn.addEventListener('click', () => {
      obj.removeBook(index);
      printBooks();
    });
  });

  localStorage.setItem('shelf', JSON.stringify(shelf));
}

printBooks();

buttonAdd.addEventListener('click', (event) => {
  event.preventDefault();
  obj.addBook(inputTitle.value, inputAuthor.value);
  printBooks();

  inputTitle.value = '';
  inputAuthor.value = '';
});

// Web Navigation Section

const list = document.querySelector('.list');
const addNew = document.querySelector('.add_new');
const contact = document.querySelector('.contact');
const listBtn = document.querySelector('.listBtn');
const addNewBtn = document.querySelector('.add_newBtn');
const contactBtn = document.querySelector('.contactBtn');
const date = document.getElementById('date');

function ShowList() {
  list.classList.remove('hidden');
  addNew.classList.add('hidden');
  contact.classList.add('hidden');
  listBtn.style.color = 'rgb(55, 135, 172)';
  addNewBtn.style.color = 'black';
  contactBtn.style.color = 'black';
}
ShowList();

function ShowAddNew() {
  list.classList.add('hidden');
  addNew.classList.remove('hidden');
  contact.classList.add('hidden');
  listBtn.style.color = 'black';
  addNewBtn.style.color = 'rgb(55, 135, 172)';
  contactBtn.style.color = 'black';
}
ShowAddNew();

function ShowContact() {
  list.classList.add('hidden');
  addNew.classList.add('hidden');
  contact.classList.remove('hidden');
  listBtn.style.color = 'black';
  addNewBtn.style.color = 'black';
  contactBtn.style.color = 'rgb(55, 135, 172)';
}
ShowContact();
function displayDate() {
  const d = new Date();
  date.innerHTML = d.toLocaleString('en-GB');
}

displayDate();
setInterval(displayDate, 1);
