/* global QUnit */
QUnit.test("Extracting integer code", function() {
    var codeValue = "000012.34",
        integerCode;
        
    //integerCode = parseIntegerCode(codeValue);
    
    // Tests
    QUnit.equal(integerCode, 12, "The integer value should match");
});

QUnit.test("Extracting students count", function() {
    var students = "the count is 30",
        studentsCount;
    
    //studentsCount = parseStudentsCount(students);

    // Tests
    QUnit.equal(studentsCount, 30, "The number of students should be correctly extracted");
});