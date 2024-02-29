const fs = require('fs');
const filePath = './db/contact.json'; 
let existingData = []; 

class Telephone {
  constructor(name, phoneNumber) { 
    this.name = name; 
    this.phoneNumber = phoneNumber; 
    this.observer = []; 
  }

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
      this.notifyObserver("Invalid Number")
    }
  }

  removeNumber(phoneNumber) { 
    if (fs.existsSync(filePath)) { 
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8')); 
      const phoneNumberExist = existingData.find(entry => entry.phoneNumber === phoneNumber); 
      if (phoneNumberExist) {
        existingData.pop(phoneNumberExist); 
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8'); 
        this.notifyObserver(`${phoneNumberExist}, "Was deleted" `);
      }
    }
  }

  dialPhoneNumber(phoneNumber) { 
    if (fs.existsSync(filePath)) { 
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf8')); 
      const phoneNumberExist = existingData.findIndex(entry => entry.phoneNumber === phoneNumber); 
      if (phoneNumberExist !== -1) {
        this.notifyObserver(`${phoneNumber}`); 
        this.notifyObserver(`Now Dialling ${phoneNumber}`); 
      } else {
        // console.log("Number isn't saved"); 
        this.notifyObserver("Number isn't saved")
      }
    }
  }

  addObserver(observer) { 
    this.observer.push(observer); 
  }

  removeObserver(observer) { 
    const index = this.observer.findIndex(observe => observe === observer); 
    if (index !== -1) {
      this.observer.pop(index); 
    }
  }

  notifyObserver(Number) { 
    this.observer.forEach(observer => observer.update(Number)); 
  }
}

class Observer { 
  constructor() {} 

  update(Number) {
    console.log(`${Number}`); 
  }
  
}

const myTelephone = new Telephone(); 
const myObserver = new Observer(); 

myTelephone.addObserver(myObserver); 

// Testing the methods
// myTelephone.addPhoneNumber("obiohar", "091611069");
// myTelephone.removeNumber("07049637962");
myTelephone.dialPhoneNumber("08068090917");
