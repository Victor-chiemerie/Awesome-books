let shelf = [];

class books {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class library {
    addBook(Booktitle, Bookauthor) {
        if (Booktitle && Bookauthor) {
            const newBook = new books(Booktitle, Bookauthor)
            shelf.push(newBook)
            console.log('worked')
        } else {
            console.log('Null string')
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
const obj = new library();

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
            <hr>
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