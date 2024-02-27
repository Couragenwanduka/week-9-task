const fs = require('fs'); // Importing the file system module
const filePath = './db/contact.json'; // Path to the JSON file storing contact data
let existingData = []; // Variable to store existing contact data

class Telephone {
  constructor(name, phoneNumber) { // Constructor for the Telephone class
    this.name = name; // Initializing the name property
    this.phoneNumber = phoneNumber; // Initializing the phoneNumber property
    this.observer = []; // Array to store observers
  }

  addPhoneNumber(name, phoneNumber) { // Method to add a new phone number
    const numberRegts = /^0\d{10}$/; // Regular expression for validating phone numbers
    if (numberRegts.test(phoneNumber)) { // Checking if the phone number matches the regex pattern
      if (fs.existsSync(filePath)) { // Checking if the JSON file exists
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Reading existing data from the JSON file
        const phoneNumberExist = existingData.some(entry => entry.phoneNumber === phoneNumber); // Checking if the phone number already exists
        if (phoneNumberExist) {
          console.log('Phone Number already exists'); // Logging a message if the phone number already exists
        } else {
          existingData.push({ name: name, phoneNumber: phoneNumber }); // Adding the new phone number to the existing data
          fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8'); // Writing the updated data back to the JSON file
          this.notifyObserver(`${phoneNumber}, "New Number Added"`); // Notifying observers about the new number added
        }
      }
    } else {
      console.log("Invalid Number"); // Logging a message for invalid phone numbers
    }
  }

  removeNumber(phoneNumber) { // Method to remove a phone number
    if (fs.existsSync(filePath)) { // Checking if the JSON file exists
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Reading existing data from the JSON file
      const phoneNumberExist = existingData.find(entry => entry.phoneNumber === phoneNumber); // Checking if the phone number exists in the data
      if (phoneNumberExist) {
        existingData.pop(phoneNumberExist); // Removing the phone number from the existing data
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8'); // Writing the updated data back to the JSON file
        this.notifyObserver(`${phoneNumberExist}, "Was deleted" `); // Notifying observers about the number deletion
      }
    }
  }

  dialPhoneNumber(phoneNumber) { // Method to dial a phone number
    if (fs.existsSync(filePath)) { // Checking if the JSON file exists
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Reading existing data from the JSON file
      const phoneNumberExist = existingData.findIndex(entry => entry.phoneNumber === phoneNumber); // Checking if the phone number exists in the data
      if (phoneNumberExist !== -1) {
        this.notifyObserver(`${phoneNumber}`); // Notifying observers about the phone number being dialed
        this.notifyObserver(`Now Dialling ${phoneNumber}`); // Notifying observers about dialing the phone number
      } else {
        console.log("Number isn't saved"); // Logging a message if the phone number isn't saved
      }
    }
  }

  addObserver(observer) { // Method to add an observer
    this.observer.push(observer); // Adding the observer to the array
  }

  removeObserver(observer) { // Method to remove an observer
    const index = this.observer.findIndex(observe => observe === observer); // Finding the index of the observer in the array
    if (index !== -1) {
      this.observer.pop(index); // Removing the observer from the array
    }
  }

  notifyObserver(Number) { // Method to notify observers
    this.observer.forEach(observer => observer.update(Number)); // Notifying each observer with the updated data
  }
}

class Observer { // Observer class
  constructor() {} // Constructor for the Observer class

  update(Number) { // Method to update the observer
    console.log(`${Number}`); // Logging the updated data
  }
}

const myTelephone = new Telephone(); // Creating a new Telephone object
const myObserver = new Observer(); // Creating a new Observer object

myTelephone.addObserver(myObserver); // Adding the observer to the telephone object

// Testing the methods
// myTelephone.addPhoneNumber("mike", "07049637962");
// myTelephone.removeNumber("07049637962");
myTelephone.dialPhoneNumber("08068090917");
