const yargs = require('yargs');  //package for interactive console applications
const contact = require('./contact'); //the module we created

yargs.version('1.5.3'); //setting a version number

yargs.command({
    command: 'add',
    describe: 'to add new contacts',
    builder: {       //to get data
        name: {
            describe: 'Name of the contact to add:',
            demandOption: true,
            type: 'string'
        },
        telNum: {
            describe: 'Number of the contact to add:',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.addContact(argv.name, argv.telNum);
    }
});

yargs.command({
    command: 'remove',
    describe: 'to delete the contact',
    builder: {
        name: {
            describe: 'Name of the contact to be delete:',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.deleteContact(argv.name);
    }
})

yargs.command({
    command: 'show',
    describe: 'to show the contact',
    handler(argv) {
        contact.showContact(argv.name);
    }
});


yargs.command({
    command: 'list',
    describe: "to list the contacts",
    handler(argv) {
        contact.listContacts();
    }
});




yargs.parse(); 