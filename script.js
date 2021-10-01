"use strict"
let myLibrary = [];

const libraryDiv = document.querySelector("#library");
const submitBtn = document.querySelector('#submit');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
      if(key === 'read') {
        if(value === true) {
          let readCheckbox = document.createElement('input');
          readCheckbox.setAttribute('id', 'read-checkbox');
          readCheckbox.setAttribute('type', 'checkbox');
          readCheckbox.setAttribute('data-title', library[i].title);
          readCheckbox.checked = true;
          divPara.textContent = "Read";
          divPara.setAttribute('id', 'read-para');
          divPara.setAttribute('data-title', library[i].title);
          div.appendChild(readCheckbox);
        } else {
          let readCheckbox = document.createElement('input');
          readCheckbox.setAttribute('id', 'read-checkbox');
          readCheckbox.setAttribute('type', 'checkbox');
          readCheckbox.setAttribute('data-title', library[i].title);
          readCheckbox.checked = false;
          divPara.textContent = "Not Read";
          divPara.setAttribute('id', 'read-para');
          divPara.setAttribute('data-title', library[i].title);
          div.appendChild(readCheckbox);
        }
      } else if(key === 'title') {
        divPara.textContent = `${value}`;
      }else if(key === 'pages') {
        if(value > 1) {
          divPara.textContent = `${value} pages`;
        } else if(value == 1) {
          divPara.textContent = "1 page";
        } else {
          divPara.textContent = "Negative?";
        }
      } else if(key === "author") {
        divPara.textContent = `Author: ${value}`;
      }
      div.appendChild(divPara);
      newBook.appendChild(div);
    }

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('info');

    let button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('delete-btn');
    button.classList.add('cancel');
    button.setAttribute('data-title', library[i].title);
    button.textContent = 'Delete';
    buttonDiv.appendChild(button);

    newBook.appendChild(buttonDiv);

    libraryDiv.appendChild(newBook);
  }
  let readCheckboxes = document.querySelectorAll('#read-checkbox');
  readCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      let readParas = document.querySelectorAll('#read-para');
      readParas.forEach(readParagraph => {
        if(readParagraph.dataset.title === checkbox.dataset.title) {
          let readPara = readParagraph;
          if(checkbox.checked) {
            readPara.textContent = "Read";
          } else if(!checkbox.checked) {
            readPara.textContent = "Not Read";
          }
        }
      });
    });
  });
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

    let buttons = document.querySelectorAll('.delete-btn');
    if(buttons.length !== 0) {
      buttons.forEach(button => {
        button.removeEventListener('click', removeBooks);
      });
      buttons.forEach(button => {
        button.addEventListener('click', removeBooks);
      });
    }
  }
}

function removeBooks(e) {
  myLibrary = myLibrary.filter(book => book.title !== e.srcElement.dataset.title);
  displayLibrary(myLibrary);
  let buttons = document.querySelectorAll('.delete-btn');
  if(buttons.length !== 0) {
    buttons.forEach(button => {
      button.removeEventListener('click', removeBooks);
    });
    buttons.forEach(button => {
      button.addEventListener('click', removeBooks);
    });
  }
}

submitBtn.addEventListener('click', newBook);
