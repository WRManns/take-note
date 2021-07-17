const util = require('util');
const fs = require('fs');

//package that will create a unique id for each object
const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//module that handles all the calls to the database
class Store {
    read() {
        return readFileAsync('./db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNote() {
        return this.read().then((notes) => {
            let parsedNote;

            try {
                parsedNote = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNote=[];
            }

            return parsedNote;
        })
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note cannot have a blank title or text!");
        }

        const newNote = { title, text, id: uuidv1() };

        return this.getNote()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNote);     
    }

    deleteNote(id) {
        return this.getNote()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store();