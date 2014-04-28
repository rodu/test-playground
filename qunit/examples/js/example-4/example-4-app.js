/* global $ */
var app = {};
(function(){
    "use strict";
    var
        loadConversionRate = function loadConversionRate(){
            return $.getJSON("rates.json");
        },
        converters = {
            // Gets an amount in Euro and converts it to US Dollars
            "eu-us": function convertToUSDolla(conversionRate){
                return {
                    convert: function(amount){
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
        makeConversion = function(converter, amount){
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

    function initialize(){
        var 
            $currencies = $("#currencies"),
            $amount = $("#amount");
        
        app.name = "Currency converter";
        // Load conversion rates
        // http://rate-exchange.appspot.com/currency?from=USD&to=EUR
        $.getJSON("js/example-4/rates.json").done(function(data){
            console.log("Conversion rates loaded.");
            var
                conversionRate = parseFloat(data.v),
                converter = converters[$currencies.val()](conversionRate),
                lastAmount = $amount.val();
                
            // Register event to handle converter change
            $currencies.on("change", function(event){
                var converterID = event.target.value;
                console.log("Changing converter to", converterID);
                // Loads the required converter
                converter = converters[converterID](conversionRate);
                // Run the conversion also here
                makeConversion(converter, $amount.val() || 0);
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

                makeConversion(converter, amount);
            });

        }).fail(function(jqXHR, error){
            console.log(error);
        });
    }

    initialize();
}());