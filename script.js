"use strict"
let myLibrary = [];

const libraryDiv = document.querySelector("#library");
const submitBtn = document.querySelector('#submit');

function Book(title, author, pages, read) {
  this.Title = title;
  this.Author = author;
  this.Pages = pages;
  this.Read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary(myLibrary);
}

function displayLibrary(library) {
  libraryDiv.textContent = '';
  libraryDiv.style.gridTemplateRows = `repeat(${library.length}, 50px)`;
  for (let i = 0; i < library.length; i++) {
    let newBook = document.createElement("div");
    newBook.classList.add("book");

    for (const [key, value] of Object.entries(library[i])) {
      let div = document.createElement("div");
      div.classList.add("info");
      let divPara = document.createElement("p");
      if(key === 'Read') {
        if(value === true) {
          divPara.textContent = "Read";
        } else {
          divPara.textContent = "Not Read";
        }
      } else if(key === 'Title') {
        divPara.textContent = `${value}`;
      }else if(key === 'Pages') {
        if(value > 1) {
          divPara.textContent = `${value} pages`;
        } else if(value == 1) {
          divPara.textContent = "1 page";
        } else {
          divPara.textContent = "Negative?";
        }
      } else {
        divPara.textContent = `${key}: ${value}`;
      }
      div.appendChild(divPara);
      newBook.appendChild(div);
    }

    libraryDiv.appendChild(newBook);
  }
}
function openForm() {
  document.getElementById("new-book-form").style.display = "block";
}
function closeForm() {
    document.getElementById('new-book-form').style.display = "none";
}

function newBook() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  if(title !== '' && author !== '' && pages != '') {
    let book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    closeForm()
  }
}

submitBtn.addEventListener('click', newBook);