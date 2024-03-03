const fs = require('fs');
const filePath = './db/contact.json';
let existingData = [];

class Telephone {
  constructor(name, phoneNumber) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.observer = [];
  }

  /* This method is used to add new numbers to the contact.json
   * First, we read the contact information synchronously
   * then we check if the contact exists
   * then we append it to the existingData array
   * then check if the number is already in the contact
   * if it is not then we append it to the array and then write it to the contact.
   */
  addPhoneNumber(name, phoneNumber) {
    const numberRegts = /^0\d{10}$/;
    if (numberRegts.test(phoneNumber)) {
      if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Reading existing data from the JSON file
        const phoneNumberExist = existingData.some(entry => entry.phoneNumber === phoneNumber);
        if (phoneNumberExist) {
          console.log('Phone Number already exists');
        } else {
          existingData.push({ name: name, phoneNumber: phoneNumber });
          fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
          this.notifyObserver(`${phoneNumber}, "New Number Added"`);
        }
      }
    } else {
      // console.log("Invalid Number");
      this.notifyObserver("Invalid Number");
    }
  }

  /* This method is used to remove numbers from the contact.json
   * First we read the contact information synchronously
   * then we check if the contact exists
   * then we find the index of the number in the existingData array
   * then we remove the number from the existingData array
   */
  removeNumber(phoneNumber) {
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const phoneNumberExist = existingData.find(entry => entry.phoneNumber === phoneNumber);
      if (phoneNumberExist) {
        existingData.pop(phoneNumberExist);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
        this.notifyObserver(`${phoneNumber}, "Was deleted"`);
      } else {
        this.notifyObserver(`${phoneNumber}, " This number does not exist"}`);
      }
    }
  }

  /*  
   * In this method we check if the phone number exists 
   * if it exists then we print the number
   * otherwise we print that the phone number does not exist 
   */
  dialPhoneNumber(phoneNumber) {
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const phoneNumberExist = existingData.findIndex(entry => entry.phoneNumber === phoneNumber);
      if (phoneNumberExist !== -1) {
        this.notifyObserver(`${phoneNumber}`);
        this.notifyObserver(`Now Dialling ${phoneNumber}`);
      } else {
        // console.log("Number isn't saved");
        this.notifyObserver("Number isn't saved");
      }
    }
  };

  /*  
   * This method adds observers to the observers array
   */
  addObserver(observer) {
    this.observer.push(observer);
  }

  /*  
   * This method removes observers from the observers array
   */
  removeObserver(observer) {
    const index = this.observer.findIndex(observe => observe === observer);
    if (index !== -1) {
      this.observer.pop(index);
    }
  }

  /*  
   * This method is used to check observers
   */
  notifyObserver(Number) {
    this.observer.forEach(observer => observer.update(Number));
  }
}

class Observer {
  constructor() {}

  /*  
   * This method is used to print the current update to the console
   */
  update(Number) {
    console.log(`${Number}`);
  }

}

const myTelephone = new Telephone();
const myObserver = new Observer();

myTelephone.addObserver(myObserver);

// Testing the methods
// myTelephone.addPhoneNumber("nnamdi", "09055443677");
// myTelephone.removeNumber("09055443677");
myTelephone.dialPhoneNumber("08068090917");
