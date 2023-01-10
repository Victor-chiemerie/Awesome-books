const booklist = document.querySelector('#booklist');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const buttonAdd = document.getElementById('add_button');

const stringShelf = localStorage.getItem('shelf');

let shelf = [];

if (stringShelf) {
    const parsedShelf = JSON.parse(stringShelf);
    if (parsedShelf !== null) {
        shelf = parsedShelf;
    }
}

function removeBook(index) {
    shelf.splice(index, 1);
    printBooks();
}

function printBooks() {

    let innerhtml = '';

    shelf.forEach((book, index) => {
        innerhtml += `
        <li>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button id="remove-btn${index}">Remove</button>
        </li>
        `;
    });

    booklist.innerHTML = innerhtml;

    shelf.forEach((book, index) => {
        const removeBtn = document.getElementById(`remove-btn${index}`);
        removeBtn.addEventListener('click', () => {
            removeBook(index);
            printBooks();
        });
    });

    localStorage.setItem('shelf', JSON.stringify(shelf));
    
};
printBooks();

function addBook(title, author) {
    shelf.push({title, author});
    printBooks();
}

buttonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    addBook(inputTitle.value, inputAuthor.value);

    inputTitle.value = '';
    inputAuthor.value = '';
});