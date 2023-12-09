/**
 * object Person
 * name: string
 * age: number
 * parent: [Person, Person]
 * sibilings: array of Person
 * friends: array of Person
 */

let RELATIONS = [];

let Person = {
  name: "string",
  age: "number",
  parent: [],
  sibilings: [],
  friends: [],
  children: [],
};

/**
 * Utility functions
 */

/**
 *
 * @param {string} name
 * @param {number} age
 * @param {[string, string]} parentName
 */
const createPerson = (name, age, parentNames) => {
  let person = Person;
  person.name = name;
  person.age = age;
  person.parent = [];

  if (parentNames.length > 0) {
    let parents = findParents(parentNames);
    person.parent = parents;
  }

  if (person.parent.length > 0) {
    person.parent.forEach((parent) => {
      parent.children.push(person);
    });
  }

  RELATIONS.push(person);
};

const findPerson = (name) => {
  let person = RELATIONS.find((person) => person.name === name);
  return person;
};

/**
 * Family Tree Utilities
 */
const findParents = (parentNames) => {
  let mother = findPerson(parentNames[0]);
  let father = findPerson(parentNames[1]);

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
