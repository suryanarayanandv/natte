/**
 *   _   _ _   _ _ _ _            __                  _   _                 
 | | | | |_(_) (_) |_ _   _   / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
 | | | | __| | | | __| | | | | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 | |_| | |_| | | | |_| |_| | |  _| |_| | | | | (__| |_| | (_) | | | \__ \
  \___/ \__|_|_|_|\__|\__, | |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                      |___/                                              
 */



import { MAX_RELATED_PERSONS, RELATIONS, Person } from "../constants/constants.js";
import {readFileSync, writeFileSync} from "fs";
/**
 * object Person
 * id: number
 * name: string
 * age: number
 * parent: [Person, Person]
 * sibilings: array of Person
 * friends: array of Person
 */


/**
 *
 * @param {string} name
 * @param {number} age
 * @param {[string, string]} parentName
 */
const createPerson = (name, age) => {
  let person = Person;
  person.id = Math.floor(Math.random() * MAX_RELATED_PERSONS);
  person.name = name;
  person.age = age;

  readFileSync("./People.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let People = JSON.parse(data);
      People.people.push(person);
      writeFileSync("./People.json", JSON.stringify(people));
    }
  });

};


/**
 * 
 * @param {string} name 
 * @returns Person | null
 */
const fetchPersonByName = (name) => {
  let person = RELATIONS.find((person) => person.name === name);
  JSON.parse
  if (person) {
    return person;
  }
  return null;
};

/**
 * 
 * @param {number} personID 
 * @returns Person | null
 */
const fetchPersonById = (personID) => {
  let person = RELATIONS.find((person) => person.id === personID);
  if (person) {
    return person;
  }
  return null;
};


// Todo: add other parameters as needed
/**
 * 
 * @param {string} personName 
 * @returns number | null
 */
const findPersonId = (personName) => {
  let person = fetchPersonByName(personName);
  if (person) {
    return person.id;
  }
  return null;
}


/**
 * Family Tree Utilities
 */

const addRelative = (personName, relativeName, relation) => {
  let person = findPerson(personName);
  let relative = null;
  if (relation === "parent") {
    
  }

  person[relation].push(relative);
  relative[relation].push(person);  
}
/**
 * 
 * @param {string, string} parentNames 
 * @returns [Preson, Person]
 */
const findParentsByName = (parentNames) => {
  let mother = fetchPersonByName(parentNames[0]);
  let father = fetchPersonByName(parentNames[1]);

  return [father, mother];
};

const addChild = (personName, childName) => {
  let person = findPerson(personName);

  person.children.push(child);
  child.parent.push(person);
};

/**
 * Friend Tree Utilities
 */
const addFriend = (personName, friendName, exists) => {
  let person = findPerson(personName);
  let friend = null;
  if (exists) {
    friend = findPerson(friendName);
  } else {
    friend = createPerson(friendName, -1, []);
  }

  person.friends.push(friend);
  friend.friends.push(person);
};
