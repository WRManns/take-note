const util = require('util');
const fs = require('fs');

const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
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
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note cannot have a blank title or text!");
        }

        const newNote = { text, title, id: uuidv1() };

        return this.getNote()
            .then((notes) => [...notes, newNote])
            .then((updateNote) = this.write(updateNote))
            .then(() => newNote);     
    }

    deleteNote(id) {
        return this.getNote()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNote) => this.write(filteredNote));
    }
}

module.exports = new Store();