let myLibrary = [];

const libraryDiv = document.querySelector("#library");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary(library) {
  libraryDiv.style.gridTemplateRows = `repeat(${library.length}, 50px)`;
  for (let i = 0; i < library.length; i++) {
    let newBook = document.createElement("div");
    newBook.classList.add("book");

    for (let prop in library[i]) {
      let div = document.createElement("div");
      div.classList.add("info");
      let divPara = document.createElement("p");
      divPara.textContent = library[i][prop];
      div.appendChild(divPara);
      newBook.appendChild(div);
    }

    libraryDiv.appendChild(newBook);
  }
}

let book1 = new Book("Hello Kitty", "A Dog", 5, false);
let book2 = new Book("Jump!", "S. I. T.", 23, true);
let book3 = new Book("No", "Ye. S.", 564, true);
let book4 = new Book("Yes", "N. O", 5102, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

displayLibrary(myLibrary);
