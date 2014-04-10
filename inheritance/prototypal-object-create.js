/*
This examples show the use of Object.create formalized in ES5.
It behaves relying on the prototype chaining and is effective when we do not
need to be concerned with types, but we just want to create a chain of objects
that inherit properties from their anchestors.
Keep in mind that such pattern suffers of the problems with using reference types
as those types will be inherited by reference, and a change to an instance on
such a type of property will reflect in all live instances too.
 */
"use strict";

var
    person = {
        age: 25,
        // Note: Array is a reference type!
        friends: ["Roberto", "Mark", "Jane"]
    },
    frank,
    jane;

// frank is an instance that inherit from person
frank = Object.create(person);
jane = Object.create(person);

// Let's change the franck age
frank.age = 31;

// Let's add a couple of friends to jane
jane.friends.push("Sara");
jane.friends.push("Roberto");

// Let's see what we have
console.log("frank age:", frank.age);
console.log("frank friends:", frank.friends);
// Test
console.log("Frank should have 3 friends?", frank.friends.length === 3);

console.log("jane age:", jane.age);
console.log("jane friends:", jane.friends);
// Test
console.log("Jane should have 5 friends?", jane.friends.length === 5);