const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  console.log(chalk.bgCyan.inverse("your Notes:"));
};

const addNotes = (title, body) => {
  let notes = loadNotes();
  let duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("note added successfully"));
  } else {
    console.log(chalk.red.inverse("title already taken"));
  }
};

const saveNotes = (notes) => {
  data = JSON.stringify(notes);
  fs.writeFileSync("notes.json", data);
};

const loadNotes = () => {
  try {
    let dataBuffer = fs.readFileSync("notes.json");
    let datajson = dataBuffer.toString();
    return JSON.parse(datajson);
  } catch (e) {
    return [];
  }
};

const removeNotes = (title) => {
  let notes = loadNotes();
  notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("note deleted."));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("note not found."));
  }
};

const listNotes = () => {
  console.log(chalk.bgCyan.inverse("your Notes:"));
  const notes = loadNotes();
  notes.forEach((element) => {
    console.log("note title: " + element.title);
    console.log("note body: " + element.body);
  });
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
};
