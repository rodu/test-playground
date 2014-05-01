(function(){
    "use strict";    

    // The function extracts the user name from the given input,
    // knowing that the name is contained between a colon and a comma (: name,)
    function extractUserName(input){
        if (typeof input === "string"){
            return input.substring(input.indexOf(":") + 2, input.indexOf(","));
        }
    }

    // This constitutes the testing function
    function extractUserNameTest(){
        var 
            // Given some input to the tested function...
            given = "The user: joedoe, was looged in.",
            // this is what we expect back from the tested function
            expected = "joedoe",
            // this will hold what we actually got back from the tested function
            actual = "";
        
        // Now we call the logic we want to test 'extractUserName',
        // and save the value it returns to check later if it is what we expect
        actual = extractUserName(given);
        
        // The following implements a very basic assertion with a single line of code.
        // It checks that the actual value is what we expected, just like an
        // assertEqual (or QUnit.equal) in a framework like QUnit would do...
        console.log(actual === expected ?
            "Test pass." :
            ("Test FAIL! Expected: '", expected, "', but was: '", actual, "'"));

        return actual;
    }

    extractUserNameTest();

}());