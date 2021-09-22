let myLibrary = [];

//parsing localStorage on page load
window.addEventListener('load', () => {
    localStorageGet();
    displayBooks();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return (title + ' by ' + author + ', ' + pages + ', ' + read);
}

Book.prototype.readStatusChange = function() {
    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function formSubmitNewBook() {
    const newBookForm = document.querySelector('#new-book-form');
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const pagesInput = document.querySelector('#pages');
    const readInput = document.querySelector('#read');
    const submitBtn = document.querySelector('#new-book-form-submit-btn');
   
    submitBtn.addEventListener('click', () => {
        if (titleInput.value === '' && authorInput.value === '' && pagesInput.value === '') {
            return alert('Please enter required book data!')
        } else {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
            displayBooks();
            newBookForm.reset(); 
        }
    });
}
formSubmitNewBook();

function displayBooks() {
    const booksTable = document.querySelector('#books-table');
    while (booksTable.rows.length > 1) {
        booksTable.deleteRow(1);
    }

    for (let i = 0; i < myLibrary.length; i++) {
        const tableBookRow = document.createElement('tr');
        tableBookRow.setAttribute('data', `${i}`)
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
        tableBookReadColumn.setAttribute('id', 'read-column');
        tableBookReadColumn.setAttribute('data', `${i}`);
        readStatusDisplay(myLibrary[i]['read'], tableBookReadColumn, i);
        tableBookRow.appendChild(tableBookReadColumn);

        const tableBookDeleteColumn = document.createElement('td');
        const tableBookDeleteBtn = document.createElement('button');
        tableBookDeleteBtn.textContent = 'DELETE';
        tableBookDeleteBtn.setAttribute('id', 'delete-btn');
        tableBookDeleteBtn.setAttribute('data', `${i}`);
        tableBookDeleteColumn.appendChild(tableBookDeleteBtn);
        tableBookRow.appendChild(tableBookDeleteColumn);
        booksTable.appendChild(tableBookRow);
    }
    deleteBook();
    changeReadStatus();
    localStorageSet();
}

function deleteBook() {
    const deleteBtn = document.querySelectorAll('#delete-btn');

    deleteBtn.forEach(button => {
        button.addEventListener('click', (e) => {
            if (window.confirm('Are you sure you want to delete this book?')) {
                const bookIndexInLibrary = e.target.getAttribute('data');
                myLibrary.splice(bookIndexInLibrary, 1);
                displayBooks();
            }
        })
    });
}

//function changes icon of read status, function initiation goes in display function
function readStatusDisplay(readStatus, readStatusColumn, iterator) {

    if (readStatus === true) {
        readStatusColumn.innerHTML = `<i data='${iterator}' id="yes-icon" class="fas fa-check"></i>`;
    } else {
        readStatusColumn.innerHTML = `<i data='${iterator}' id="no-icon" class="fas fa-times"></i>`;
    }
}

function changeReadStatus() {
    const readStatus = document.querySelectorAll('i');

    readStatus.forEach((status) => {
        status.addEventListener('click', (e) => {
            bookIndex = e.target.getAttribute('data');
            myLibrary[bookIndex].readStatusChange();
            displayBooks();
        });
    });
}

function openFormBtn() {
    const newBookBtn = document.querySelector("#new-book-btn");
    function openForm() {
        document.getElementById("new-book-form-container").style.display = "block";
    }
    newBookBtn.addEventListener('click', () => {
        openForm();
    });
}
openFormBtn();

function closeFormBtn() {

    function closeForm() {
        document.getElementById("new-book-form-container").style.display = "none";
    }
    const closeBtn = document.querySelector('#new-book-form-close-btn');
    closeBtn.addEventListener('click', () => {
        closeForm();
    });
}
closeFormBtn();


//localStorage set
function localStorageSet() {
    myLibraryJSON = JSON.stringify(myLibrary);
    localStorage.setItem('myLibrary',myLibraryJSON);
}

//localStorage get
//more complex function which first gets JSON, parsing it,
//iterating through the array of objects and assigning them
//back Book.prototype, after that returning myLibrary
function localStorageGet() {
    if(localStorage.length === 0) {
        return myLibrary = [];
    } else {
        myLibraryJSON = localStorage.getItem('myLibrary');
        myLibraryParsed = JSON.parse(myLibraryJSON);
        
        for (let i = 0; i < myLibraryParsed.length; i++) {
        Object.setPrototypeOf(myLibraryParsed[i], Book.prototype);
        myLibrary.push(myLibraryParsed[i]);
        }
    }
    return myLibrary;
}

//localStorage clear
function localStorageClear() {
    myLibrary = [];
    localStorage.clear();
}

//wipe library function
function wipeLibrary() {
    const wipeBtn = document.querySelector('#wipe-btn');

    wipeBtn.addEventListener('click', () => {
        if (window.confirm('Are you sure you want to wipe your Library?')) {
            localStorageClear();
            displayBooks();
        }
    });
}
wipeLibrary();

/*
The Principles of Object-Oriented JavaScript	Nicholas C. Zakas	120		DELETE
Grokking Algorithms An illustrated guide for programmers and other curious people	Aditya Y. Bhargava	256 pages
*/