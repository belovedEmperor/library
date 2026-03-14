class Book {
  constructor(author, title, numberOfPages, isRead) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
  }

  toggleIsRead = () => {
    this.isRead = !this.isRead;
  };
}

let library = [];

function addBookToLibrary(author, title, numberOfPages, isRead) {
  library.push(new Book(author, title, numberOfPages, isRead));
}

function findBookById(id) {
  for (let index = 0; index < library.length; index++) {
    if (library[index].id === id) {
      return index;
    }
  }
  return -1;
}

function removeBook(id) {
  const index = findBookById(id);
  library.splice(index, 1);
}

function reloadLibrary() {
  const libraryElement = document.querySelector(".library");
  libraryElement.innerHTML = "";
  for (const book of library) {
    const bookElement = document.createElement("div");
    bookElement.textContent = book.title;
    bookElement.dataset.id = book.id;

    const readStatus = document.createElement("input");
    readStatus.dataset.id = book.id;
    readStatus.type = "checkbox";
    readStatus.checked = book.isRead;
    readStatus.addEventListener("change", (event) => {
      book.toggleIsRead();
      reloadLibrary();
    });
    bookElement.appendChild(readStatus);

    const removeButton = document.createElement("button");
    removeButton.dataset.id = book.id;
    removeButton.textContent = "X";
    removeButton.addEventListener("click", (event) => {
      removeBook(event.currentTarget.dataset.id);
      reloadLibrary();
    });

    bookElement.appendChild(removeButton);
    libraryElement.appendChild(bookElement);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const author = document.querySelector("#author").value;
  const title = document.querySelector("#title").value;
  const pages = document.querySelector("#number-of-pages").value;
  const isRead = document.querySelector("#is-read").checked;

  addBookToLibrary(author, title, pages, isRead);
  document.querySelector("dialog").close();
  reloadLibrary();
}
function handleNewBook(event) {
  const container = document.querySelector(".container");
  const dialog = document.createElement("dialog");
  dialog.id = "book-form";
  const form = document.createElement("form");

  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.id = "author";
  authorInput.name = "author";
  authorInput.placeholder = "Author";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.placeholder = "Title";
  const numberOfPagesInput = document.createElement("input");
  numberOfPagesInput.type = "text";
  numberOfPagesInput.id = "number-of-pages";
  numberOfPagesInput.name = "number-of-pages";
  numberOfPagesInput.placeholder = "Number of Pages";
  const isReadInput = document.createElement("input");
  isReadInput.type = "checkbox";
  isReadInput.id = "is-read";
  isReadInput.name = "is-read";
  isReadInput.placeholder = "Read?";
  const submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "Submit";
  submitInput.addEventListener("click", handleSubmit);

  form.appendChild(authorInput);
  form.appendChild(titleInput);
  form.appendChild(numberOfPagesInput);
  form.appendChild(isReadInput);
  form.appendChild(submitInput);

  dialog.appendChild(form);
  container.appendChild(dialog);
  dialog.showModal();
}
const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", handleNewBook);
