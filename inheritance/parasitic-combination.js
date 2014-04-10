/*
This script shows how the most reliable pattern for inheritance can be used.
It is called parasitic combination because it uses the parasitic constructor
stealing method to inherit the property, and the Object.create method to copy
the methods.
It allows a single call to the Super class constructor by using the
Object.create to copy the prototype of the super class in a prototype object
that will then be assigned to the sub class.
 */
"use strict";
var
    // The extend method does the job of wiring the inheritance chain using
    // the Object.create
    extend = function(Sub, Super){
        var prototype = Object.create(Super.prototype);
        prototype.constructor = Sub;
        Sub.prototype = prototype;
    },
    // The base class (or super class)
    Person = function(name){
        this.name = name;
        this.friends = [];
    },
    // A derived class
    Male = function(name, age){
        Person.call(this, name);
        this.sex = "male";
        this.age = age;
    },
    // A derived class
    Female = function(name, age){
        Person.call(this, name);
        this.age = age;
        this.sex = "female";
    };

// Add methods to the super class
Person.prototype.getAge = function() {
    console.log("age:", this.age);
};

Person.prototype.getSex = function() {
    console.log("sex:", this.sex);
};

Person.prototype.getName = function() {
    console.log("name:", this.name);
};

Person.prototype.addFriend = function(friendName) {
    this.friends.push(friendName);
};

Person.prototype.getFriends = function() {
    console.log("friends:", this.friends);
};

// Creates inheritance chain
extend(Male, Person);
extend(Female, Person);

// Here additional method could be added to specialize a subclass
Male.prototype.canFly = function() {
    console.log("Boo, he can't fly!");
};

// Instantiate a few objects from sub classes
var chris = new Male("Chris", 25);
var jane = new Female("Jane", 24);

chris.addFriend("Jack");
jane.addFriend("Sarah");

chris.getName();
chris.getSex();
chris.getAge();
chris.getFriends();
// We can call the canFly method on the Male class
if ("canFly" in chris){
    chris.canFly();
}

jane.getName();
jane.getSex();
jane.getAge();
jane.getFriends();
// We can NOT call the canFly method on the Male class, therefore this statement
// should resolve to the else body
if ("canFly" in jane){
    jane.canFly();
}
else {
    console.log("We don't know if a female can fly..?");
}
