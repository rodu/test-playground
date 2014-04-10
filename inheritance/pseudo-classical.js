"use strict";
/*
Pseudo classical inheritance (or combination inheritance) combines the prototype
chaining technique together with the constructor stealing one.
This allows to inherit properties through construtcor stealing, solving the
problems related to reference types, and to inherit the method with prototype
chaining.
We can see from the console logs that the constructor type is correctly kept
when using the instanceof operator.
 */
var
    Person = function(name){
        this.name = name;
        this.age = 25;
        // Array is a reference type!
        this.friends = ["Roberto", "Mark", "Jane"];
    },
    Male = function(name){
        // Inheriting properties (constructor stealing)
        Person.call(this, name);
        this.sex = "male";
    },
    Female = function(name){
        // Inheriting properties (constructor stealing)
        Person.call(this, name);
        this.sex = "female";
    },
    jack,
    silvia;

// First add prototype method on the base class    
Person.prototype.getAge = function() {
    console.log("age:", this.age);
};

Person.prototype.getName = function() {
    console.log("name:", this.name);
};

Person.prototype.getFriends = function() {
    console.log("friends:", this.friends);
};

// Then, create prototype chain for inheritance of the subclasses
Male.prototype = new Person();
Female.prototype = new Person();

// Now we can create instances
jack = new Male("Jack");
silvia = new Female("silvia");

// Now will add a friend for silvia
silvia.friends.push("Sara");

// Now let's what we have
jack.getName();
jack.getFriends();
console.log("is jack a Male?", jack instanceof Male);
console.log("is jack a Female?", jack instanceof Female);

console.log("---------------");

silvia.getName();
silvia.getFriends();
console.log("is silvia a Female?", silvia instanceof Female);