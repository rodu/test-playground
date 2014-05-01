/* global $ */
var app = {};
(function(){
    "use strict";
    var
        dataLoader = {
            load: function(url){
                return $.getJSON(url);
            }
        },
        converters = {
            // Gets an amount in Euro and converts it to US Dollars
            "eu-us": function convertToUSDolla(conversionRate){
                return {
                    convert: function(amount){
                        if (conversionRate === 1){
                            return amount;
                        }
                        return 0;
                    },
                    fromLabel: " Euro ",
                    toLabel: " $ "
                };
            },
            // Gets an amount in US Dollars and converts it to Euro
            "us-eu": function convertToEuro(conversionRate){
                return {
                    convert: function(amount){
                        return 0;
                    },
                    fromLabel: " $ ",
                    toLabel: " Euro "
                };
            }
        },
        runConversion = function(converter, amount){
            console.log("Entered new value", amount);

            // Update DOM with results of conversion
            $("#results").text(function(){
                var results = "";
                results += amount;
                results += converter.fromLabel + "equals to ";
                results += converter.convert(amount);
                results += converter.toLabel;

                return results;
            });
        };

    function initialize(converterID){
        var 
            $currencies = $("#currencies"),
            $amount = $("#amount");
        
        app.name = "Currency converter";
        // Load conversion rates
        // http://rate-exchange.appspot.com/currency?from=USD&to=EUR
        dataLoader.load("js/example-4/rates.json").done(function(data){
            console.log("Conversion rates loaded.");
            var
                converter,
                lastAmount = $amount.val(),
                getConversionRate = function getConversionRate(){
                    return parseFloat(data.v);
                },
                setupConverter = function setupConverter(converterID, conversionRate){
                    return converters[converterID](conversionRate);
                };
                
            // Register event to handle converter change
            $currencies.on("change", function(event){
                var converterID = event.target.value;
                // Reassign the converter according to the new converterID
                converter = setupConverter(converterID, getConversionRate());

                console.log("Changing converter to", converterID);
                // Run the conversion also here
                runConversion(converter, $amount.val() || 0);
            });

            // Register change event to trig conversion
            $amount.on("keyup", function(event){
                var amount = event.target.value;

                // Nothing to be done if value is not changed
                if (lastAmount === amount){
                    console.log("Same as previous amount. Terminating.");
                    return;
                }
                lastAmount = amount;
                
                if (!amount){
                    console.log("Empty amount given. Terminating.");
                    return;
                }

                runConversion(converter, amount);
            });

            converter = setupConverter(converterID, getConversionRate());

        }).fail(function(jqXHR, error){
            console.log(error);
        });
    }

    //initialize();

    // Exports for testing purposes
    app.initialize = initialize;
    app.testing = {
        dataLoader: dataLoader,
        converters: converters
    };
}());