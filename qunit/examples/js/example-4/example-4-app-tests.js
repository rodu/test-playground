/* global QUnit, $, app */
(function testSuite(QUnit){
    "use strict";

    // Creates a mock data loader that returns working sample data
    var
        mockedJSONData = {
            "to": "EUR",
            "rate": 0.72104400000000002,
            "from": "USD",
            "v": 0.72104400000000002
        },
        mockedDataLoader = {
            load: function load(){
                return new $.Deferred().resolve(mockedJSONData);
            }
        };

    QUnit.module("Currency converter", {
        setup: function setup(){
            //app.dataLoader = mockedDataLoader;
            //app.initialize();
        },
        teardown: function teardown(){}
    });

    QUnit.test("Converting from Euro to US dollars with rate of 1", function testEUtoUS_rate_1(){
        var amount = 10,
            rate = 1,
            converterFactory = app.testing.converters["eu-us"],
            converter = converterFactory(rate);

        QUnit.equal(converter.convert(amount), 10, "Conversion result should equal amount");
    });

    QUnit.test("Converting from US dollars to Euro with rate of 1", function testUStoEN_rate_1() {
        var amount = 10,
            rate = 1,
            converterFactory = app.testing.converters["us-eu"],
            converter = converterFactory(rate);

        QUnit.equal(converter.convert(amount), 10, "Conversion result should equal amount");
    });

}(QUnit));