"use strict";
var
    Person = function Person(){
        this.age = 25;
        this.friends = ["Roberto", "Rigel", "Greg", "Mark"];
    },
    Man = function Man(){
        this.sex = "male";
    },
    karl,
    stephen;

Person.prototype.getAge = function() {
    console.log("age:", this.age);
};

Person.prototype.getFriends = function() {
    console.log("friends:", this.friends);
};


// Chaining prototypes for inheritance
Man.prototype = new Person();
Man.prototype.getName = function() {
    console.log("name: male name");
};

karl = new Man();
stephen = new Man();

karl.getAge();
karl.getName();

// Will add a friend for karl
karl.friends.push("Jane");

// The friend will be visible to stephen too!
// Because the array is a referenfe type!
stephen.getFriends();