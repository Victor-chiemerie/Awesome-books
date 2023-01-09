const domBooklist = document.querySelector('ul');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const buttonAdd = document.querySelector('.btn-success');

const stringBookList = localStorage.getItem('booklist');

let bookList = [];

// if (stringBookList) {
//     const parsedBookList = JSON.parse(stringBookList);
//     if (Array.isArray(parsedBookList)) {
//       bookList = parsedBookList;
//     }
//   }

function removeBook(index) {
    bookList.splice(index, 1);
}

function printBooks() {
    let innerhtml = '';

    bookList.forEach((book, index) => {
        innerhtml += `
        <li>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button id="remove_btn_${index}">Remove</button>
        </li>
        `;
    });

    domBooklist.innerHTML = innerhtml;

    bookList.forEach((book, index) => {
        const removeBtn = document.querySelector(`#remove_btn_${index}`);
        removeBtn.addEventListener('click', () => {
            removeBook(index);
            printBooks();
        });
    });

    localStorage.setItem('booklist', JSON.stringify(bookList));
}

printBooks();

function addBooks(title, author) {
    if (title && author) {
        bookList.push({title, author});
        printBooks();
    }
}

buttonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    addBooks(inputTitle.value, inputAuthor.value);

    inputTitle.value = '';
    inputAuthor.value = '';
});
