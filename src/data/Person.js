/**
 *   _   _ _   _ _ _ _            __                  _   _                 
 | | | | |_(_) (_) |_ _   _   / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
 | | | | __| | | | __| | | | | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 | |_| | |_| | | | |_| |_| | |  _| |_| | | | | (__| |_| | (_) | | | \__ \
  \___/ \__|_|_|_|\__|\__, | |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                      |___/                                              
 */

import { MAX_RELATED_PERSONS, Person } from "../constants/constants.js";
import { readFileSync, writeFileSync } from "fs";
/**
 * object Person
 * id: number
 * name: string
 * age: number
 * gender: string
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
const createPerson = (name, age, gender) => {
  let person = Person;

  person.id = Math.floor(Math.random() * MAX_RELATED_PERSONS);
  while (fetchPersonById(person.id)) {
    person.id++;
  }

  person.name = name;
  person.age = age;
  person.gender = gender;

  // write to store
  readFileSync("./People.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let People = JSON.parse(data);
      People.people.push(person);
      writeFileSync("./People.json", JSON.stringify(People));
    }
  });
};

/**
 *
 * @param {string} personName
 * @returns Person | null
 */
const fetchPersonByName = (personName) => {
  const RELATIONS = JSON.parse(readFileSync("./People.json", "utf8")).people;
  let person = RELATIONS.find((person) => person.name === personName);
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
  const RELATIONS = JSON.parse(readFileSync("./People.json", "utf8")).people;
  let person = RELATIONS.find((person) => person.id === personID);
  if (person) {
    return person;
  }
  return null;
};

// Todo: add optional parameters to search
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
};

/**
 * Family Tree Utilities
 */

const addRelative = (personName, relativeName, relation) => {
  let person = fetchPersonByName(personName);
  let relative = fetchPersonByName(relativeName);

  if (!relative) {
    relative = createPerson(relativeName, -1, "unknown");
  }

  if (person && relative) {
    if (relation === "parent") {
      if (relative.gender === "male") person.parent = [null, relative];
      else person.parent = [relative, null];
      relative.children.push(person);
    } else if (relation === "child") {
      person.children.push(relative);
      relative.parent.push(person);
    } else if (relation === "sibling") {
      person.sibilings.push(relative);
      relative.sibilings.push(person);
    }
  }

  // update store
  updateStore(person, relative);
};
/**
 *
 * @param {string, string} parentNames
 * @returns [Preson|null, Person|null]
 */
const findParentsByName = (parentNames) => {
  let mother = fetchPersonByName(parentNames[0]);
  let father = fetchPersonByName(parentNames[1]);

  if (mother && father) {
    return [mother, father];
  } else if (mother) {
    return [mother, null];
  } else if (father) {
    return [null, father];
  } else {
    return [null, null];
  }
};

/**
 * Friend Tree Utilities
 */
const addFriend = (personName, friendName) => {
  let person = fetchPersonByName(personName);
  let friend = fetchPersonByName(friendName);

  if (!friend) {
    friend = createPerson(friendName, -1, "unknown");
  }

  if (person && friend) {
    person.friends.push(friend);
    friend.friends.push(person);
  }

  // update store
  updateStore(person, friend);
};

/**
 * Other Utilities
 */

/**
 * @param  {Person[]} updatedPeople
 */
const updateStore = (...updatedPeople) => {
  const RELATIONS = JSON.parse(readFileSync("./People.json", "utf8")).people;
  updatedPeople.forEach((updatedPerson) => {
    let person = RELATIONS.find((person) => person.id === updatedPerson.id);
    if (person) {
      let index = RELATIONS.indexOf(person);
      RELATIONS[index] = updatedPerson;
    } else {
      RELATIONS.push(updatedPerson);
    }
  });

  writeFileSync("./People.json", JSON.stringify(RELATIONS));
};
