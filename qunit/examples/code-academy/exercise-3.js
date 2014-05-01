/**
 * This exercise shows how nasty bugs can be in JavaScript.
 *
 * Similar problems should not be attributed faults in the JavaScript language
 * design but rather to our level of knowledge of the language itself.
 * 
 * -- If we can't change the world we need to get smarter and deal with it!
 *
 * The exercise is quite simple. The function we are supposed to correct receives
 * a Player object representing a footbal player, carrying details on the skills
 * the player possess.
 * 
 * Based on these skills and a reference table, the program should calculate how
 * much the football player should earn given the skills.
 *
 * Tests will ensure that the calculated values are what they should be, in the
 * end we are messing with people earnings here! 
 *
 * There is a bug in the code which will return a wrong result for some player
 * but all tests are passing. Can you write a test that discovers the bug?
 *
 * When you write such test, that test should obviously fail! But then you will
 * correct the code, fixing the bug and making the test happily pass!
 *
 * Player {}
 * @return {[type]} [description]
 */
(function(){
    "use strict";
    function getPlayersData(){
        return {
            "season": 2013,
            "players": [{
                "id": 1,
                "playerName": "Carlos Tévez",
                "teamName": "Juventus",
                "position": "Attacking Midfielder (Center, Left) / Forward",
                "appearances": 28,
                "goals": 19,
                "yellowCards": 4,
                "redCards": "none",
                "totalShots": 120
            },
            {
                "id": 10,
                "playerName": "Giuseppe Rossi",
                "teamName": "Fiorentina",
                "position": "Attacking Midfielder (Left) / Forward",
                "appearances": 18,
                "goals": 14,
                "yellowCards": 1,
                "redCards": "none",
                "totalShots": 60
            },
            {
                "id": 13,
                "playerName": "Ricardo Álvarez",
                "teamName": "Inter",
                "position": "Attacking Midfielder (Center, Left, Right)",
                "appearances": 24,
                "goals": 4,
                "yellowCards": 3,
                "redCards": "1",
                "totalShots": 47
            },
            {
                "id": 14,
                "playerName": "Rodrigo Palacio",
                "teamName": "Inter",
                "position": "Attacking Midfielder (Center, Left, Right) / Forward",
                "appearances": 34,
                "goals": 15,
                "yellowCards": 3,
                "redCards": "none",
                "totalShots": 88
            },
            {
                "id": 15,
                "playerName": "Gervinho",
                "teamName": "Roma",
                "position": "Attacking Midfielder (Left, Right) / Forward",
                "appearances": 29,
                "goals": 9,
                "yellowCards": 1,
                "redCards": "none",
                "totalShots": 61
            },
            {
                "id": 16,
                "playerName": "Alessandro Diamanti",
                "teamName": "Bologna",
                "position": "Attacking Midfielder (Center, Left, Right) / Forward",
                "appearances": 19,
                "goals": 5,
                "yellowCards": 9,
                "redCards": "",
                "totalShots": 82
            },
            {
                "id": 17,
                "playerName": "Francesco Totti",
                "teamName": "Roma",
                "position": "Attacking Midfielder (Center, Left) / Forward",
                "appearances": 18,
                "goals": 7,
                "yellowCards": 1,
                "redCards": "-",
                "totalShots": 61
            }]
        };
    }

    // Calculates the income of a footbal player based on his reputation
    function calculatePlayerRate(player){
        var rate = (player.goals / player.totalShots) / player.appearances;
        
        if (+player.yellowCards){
            rate -= 0.2 * player.yellowCards;
        }
        if (+player.redCards){
            rate -= 0.5 * player.yellowCards;
        }
        
        // Squares the rate to avoid returning negative numbers
        rate *= rate;
        // Format the result to have two decimal positions
        rate = parseFloat(rate.toFixed(2));

        return rate;
    }

    function runTests(){
        // Given a player
        var player = {
                "id": 17,
                "playerName": "Francesco Totti",
                "teamName": "Roma",
                "position": "Attacking Midfielder (Center, Left) / Forward",
                "appearances": 18,
                "goals": 7,
                "yellowCards": 1,
                "redCards": "none",
                "totalShots": 61
            },
            // Applies the known formula to calculates a correct value:
            // (player.goals / player.totalShots) / player.appearances
            // 
            // also subtracting the penalty for the yellowCard:
            // rate /= 0.2 * player.yellowCards
            expectedScore = 3.19,
            // Runs the function to calculate the actual score
            actual = calculatePlayerRate(player);
            // Compares the results that should match
            console.log(expectedScore === actual, expectedScore, actual);
    }

    function main(){
        var data = getPlayersData(),
            scores;
        scores = data.players.map(function forEachPlayer(player){
            return calculatePlayerRate(player);
        });
        console.log(scores);
        /*console.log(scores.sort(function sortScores(a, b){
            return a.score - b.score;
        }));*/
        runTests();
    }

    main();

}());