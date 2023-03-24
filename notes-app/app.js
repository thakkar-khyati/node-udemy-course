const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
    command:'add',
    describe:'adding a new note',
    builder:{
        title:{
            describe:'title name',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body);
    }
})

yargs.command({
    command:'remove',
    describe:'removing selected note',
    builder:{
        title:{
            describe:"title of the note to be removed",
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"body of the note to be removed",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
})

yargs.command({
    command:'list',
    describe:'listing all the notes',
    handler(){
        console.log("in list");
        notes.listNotes();
    }
})

yargs.command({
    command:'read',
    describe:'reading all the notes',
    handler(){
        console.log("command read inititated.");
    }
})

//console.log(notes.listNotes());

