let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;   
}

Book.prototype.info = function() {
    return (title + ' by ' + author + ', ' + pages + ', ' + read);
}

function addBookToLibrary (title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    const booksTable = document.querySelector('#books-table');
    while (booksTable.rows.length > 1) {
        booksTable.deleteRow(1);
    }
    //while (booksTable.childNodes.length > 0) {
    //    booksTable.removeChild(booksTable.lastChild)
    //}

    for (let i = 0; i < myLibrary.length; i++) {
        const tableBookRow = document.createElement('tr');
        const tableBookTitleColumn = document.createElement('td');
        tableBookTitleColumn.textContent = myLibrary[i]['title'];
        tableBookRow.appendChild(tableBookTitleColumn);
        const tableBookAuthorColumn = document.createElement('td');
        tableBookAuthorColumn.textContent = myLibrary[i]['author'];
        tableBookRow.appendChild(tableBookAuthorColumn);
        const tableBookPagesColumn = document.createElement('td');
        tableBookPagesColumn.textContent = myLibrary[i]['pages'];
        tableBookRow.appendChild(tableBookPagesColumn);
        const tableBookReadColumn = document.createElement('td');
        tableBookReadColumn.textContent = myLibrary[i]['read'];
        tableBookRow.appendChild(tableBookReadColumn); 
        booksTable.appendChild(tableBookRow);   
    }
}


function openFormBtn() {
    const newBookBtn = document.querySelector("#new-book-btn");
    newBookBtn.addEventListener('click', () => {
        openForm();
    });
}
openFormBtn();

function openForm() {
    document.getElementById("new-book-form-container").style.display = "block"
}
function closeForm() {
    document.getElementById("new-book-form-container").style.display = "none"
}

