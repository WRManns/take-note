//Using class selectors for constants
const noteTitle = $(".note-title");
const noteText = $(".note-textarea");
const saveNoteBtn = $(".save-note");
const newNoteBtn = $(".new-note");
const noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all notes from the db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// A function for saving a note to the db
const saveNote = (note) => {
  return $.ajax({
    data: note,
    url: "/api/notes",
    dataType: "json",
    method: "POST",
  });
};

// A function for deleting a note from the db
// id was saved as a string, so string literal was used
const deleteNote = (id) => {
  return $.ajax({
    url: `/api/notes/${id}`,
    type: "DELETE",
  });
};

// If there is an activeNote, display it, otherwise show placeholders
const renderActiveNote = () => {
  saveNoteBtn.hide();

  if (activeNote.id) {
    noteTitle.attr("readonly", true);
    noteText.attr("readonly", true);
    noteTitle.val(activeNote.title);
    noteText.val(activeNote.text);
  } else {
    noteTitle.attr("readonly", false);
    noteText.attr("readonly", false);
    noteTitle.val("");
    noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the SideBar and TextArea
const handleNoteSave = function () {
  const newNote = {
    title: noteTitle.val(),
    text: noteText.val(),
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Deletes the note 
const handleNoteDelete = function (event) {
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();
  console.log(typeof(note.id));

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Show the save button on Text being present
const handleRenderSaveBtn = function () {
  if (!noteTitle.val().trim() || !noteText.val().trim()) {
    saveNoteBtn.hide();
  } else {
    saveNoteBtn.show();
  }
};

// Render's the list of note titles
const renderNoteList = (notes) => {
  noteList.empty();

  const noteListItems = [];

  // Returns jquery object for <li> with given text and renders a delete button
  const createLi = (text, withDeleteButton = true) => {
    const li = $("<li class='list-group-item'>");
    const span = $("<span>").text(text);
    li.append(span);

    if (withDeleteButton) {
      const delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      li.append(delBtn);
    }
    return li;
  };

  if (notes.length === 0) {
    noteListItems.push(createLi("No saved Notes", false));
  }

  notes.forEach((note) => {
    const li = createLi(note.title).data(note);
    noteListItems.push(li);
  });

  noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the SideBar
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

saveNoteBtn.on("click", handleNoteSave);
noteList.on("click", ".list-group-item", handleNoteView);
newNoteBtn.on("click", handleNewNoteView);
noteList.on("click", ".delete-note", handleNoteDelete);
noteTitle.on("keyup", handleRenderSaveBtn);
noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();