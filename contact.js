const fs = require('fs'); //package for working with files
const chalk = require('chalk'); //for colorfull responses

const add = function (name, telNum) {
    const contactsArray = readContactsFromFile();

    const arrayOfContactsWithSameName = contactsArray.filter(function (contact) { //triggers the function for each array element
        return contact.personName === name;
    });
    if (arrayOfContactsWithSameName.length === 0) {
        contactsArray.push({
            personName: name,
            tel: telNum
        });
        writeContactsToFile(contactsArray);
        console.log(chalk.green.inverse("Contact is successfully added..."));

    } else {
        console.log(chalk.red.inverse(name + " already exists..."));
    }
}

const writeContactsToFile = function (contactsArray) {
    const jsonData = JSON.stringify(contactsArray);  //array to json format
    fs.writeFileSync('contacts.json', jsonData); //path to write, item to be written
}

const readContactsFromFile = function () {
    try { // try to run the code below first
        const dataBuffer = fs.readFileSync('contacts.json');  //turns data as buffer
        const dataJSON = dataBuffer.toString(); //buffer to json format
        return JSON.parse(dataJSON); //return the json as js
    } catch (e) { //run this if the code above does not work
        return [];
    }
}

const remove = function (name) {
    const allContacts = readContactsFromFile();
    const conctactsToBeWrittenToFileAgain = allContacts.filter(function (contact) {
        return contact.personName !== name;
    });
    if (allContacts.length > conctactsToBeWrittenToFileAgain.length) { //a contact is removed
        console.log(chalk.green.inverse("Contact is deleted successfully..."));
        writeContactsToFile(conctactsToBeWrittenToFileAgain);
    } else {
        console.log(chalk.red.inverse(name + " could not be found..."));
    }
}


const show = function (name) {
    const contactsArray = readContactsFromFile();
    const foundContact = contactsArray.find(function (contact) {
        return contact.personName === name;
    });
    if (foundContact) {
        console.log(chalk.yellow.inverse("Number of the contact: " + foundContact.tel));
    } else {
        console.log(chalk.red.inverse("Contact could not be found..."));
    }
}

const list = function () {
    const contactsArray = readContactsFromFile();
    contactsArray.forEach(function (contact) { 
        console.log(chalk.yellow.inverse("Name: " + contact.personName + " Phone number: " + contact.tel));
    });
}

module.exports = {
    addContact: add,
    deleteContact: remove,
    showContact: show,
    listContacts: list,
};