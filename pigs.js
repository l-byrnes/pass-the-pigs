// declare variables

// variables used for roll function
let pig1Roll
let pig1RollNum
let pig2Roll
let pig2RollNum

let dot = .349
let noDot = .651
let razorback = .875
let trotter = .963
let snouter = .993
let leaningJowler = 1
// end variables used for roll function
//variables used for scoring

let razorbackScore = 5
let trotterScore = 5
let snouterScore = 10
let leaningJowlerScore = 15


let player0TotalPoints = 0
let player1TotalPoints = 0
let player2TotalPoints = 0
let player3TotalPoints = 0
let totalPoints = [player0TotalPoints, player1TotalPoints, player2TotalPoints, player3TotalPoints]
let roundScore = 0
let pig1Score = 0
let piggedOut
let piggedPlayer


//end variables used for scoring
// variables used for playerswitch
let player = 0
// end variables used for playerswitch

//variable for AI
// let aiPlayer
//end variable for AI

// end declare variables

//disable buttons not in use
document.getElementById("player1RollButton").disabled = true
document.getElementById("player1PassButton").disabled = true
document.getElementById("player2RollButton").disabled = true
document.getElementById("player2PassButton").disabled = true
document.getElementById("player3RollButton").disabled = true
document.getElementById("player3PassButton").disabled = true
//end disable buttons not in use

//ask if they want to play with ai
// aiPlayer = confirm("Click Ok if you want one player to be ai, click cancel if you would not")
// checkAIPlayer()



function handleClick(id) {
    if (id.includes("Roll")) {
        roll()

    } else if (id.includes("Pass")) {
        pass()
    } else if (id.includes("replay")) {
        replay()
    }
}

// roll function start
function roll() {
    pig1RollNum = Math.random()

    if (pig1RollNum <= dot) {
        pig1Roll = "dot"
    } else if (pig1RollNum <= noDot) {
        pig1Roll = "no dot"
    } else if (pig1RollNum <= razorback) {
        pig1Roll = "razorback"
    } else if (pig1RollNum <= trotter) {
        pig1Roll = "trotter"
    } else if (pig1RollNum <= snouter) {
        pig1Roll = "snouter"
    } else if (pig1RollNum <= leaningJowler) {
        pig1Roll = "leaning jowler"
    }

    pig2RollNum = Math.random()

    if (pig2RollNum <= dot) {
        pig2Roll = "dot"
    } else if (pig2RollNum <= noDot) {
        pig2Roll = "no dot"
    } else if (pig2RollNum <= razorback) {
        pig2Roll = "razorback"
    } else if (pig2RollNum <= trotter) {
        pig2Roll = "trotter"
    } else if (pig2RollNum <= snouter) {
        pig2Roll = "snouter"
    } else if (pig2RollNum <= leaningJowler) {
        pig2Roll = "leaning jowler"
    }

    updatePigs()
    updateRoundScores()


}
// roll function end

// update the text that says what the pigs are
function updatePigs() {
    document.getElementById("player" + player + "Pig1").innerHTML = pig1Roll
    document.getElementById("player" + player + "Pig2").innerHTML = pig2Roll
}
// end update pigs

//update total and round score functions
function updateRoundScores() {

    if (pig1Roll == pig2Roll) {
        if ((pig1Roll == "dot") || (pig1Roll == "no dot")) {
            roundScore = (roundScore + 1)
        } else if ((pig1Roll == "trotter") || (pig1Roll == "razorback")) {
            roundScore = (roundScore + 20)
        } else if (pig1Roll == "snouter") {
            roundScore = (roundScore + 40)
        } else if (pig1Roll == "leaning jowler") {
            roundScore = (roundScore + 60)
        }
    } else {

        if ((pig1Roll == "trotter") || (pig1Roll == "razorback")) {
            roundScore = (roundScore + 5)
        } else if (pig1Roll == "snouter") {
            roundScore = (roundScore + 10)
        } else if (pig1Roll == "leaningJowler") {
            roundScore = (roundScore + 15)
        }

        if ((pig2Roll == "trotter") || (pig2Roll == "razorback")) {
            roundScore = (roundScore + 5)
        } else if (pig2Roll == "snouter") {
            roundScore = (roundScore + 10)
        } else if (pig2Roll == "leaning jowler") {
            roundScore = (roundScore + 15)
        }
    }
    pigOut()
    document.getElementById("player" + player + "HandScore").innerHTML = "Score: " + roundScore

}

function updateTotalScore() {
    totalPoints[player] = totalPoints[player] + roundScore
    document.getElementById("player" + player + "TotalScore").innerHTML = ("Total score: " + totalPoints[player])

}
//end update scores

//pig out function
function pigOut() {
    if ((pig1Roll == "dot" && pig2Roll == "no dot") || (pig1Roll == "no dot" && pig2Roll == "dot")) {
        

        roundScore = 0
        document.getElementById("player" + player + "HandScore").innerHTML = "Score: " + roundScore
        pass()
        // pigOutImg()
        // setTimeout(resetPiggedPlayer, 3000)
    }

}
// end pig out function

//pass function
function pass() {
    updateTotalScore()
    roundScore = 0
    document.getElementById("player" + player + "HandScore").innerHTML = "Score: " + roundScore


    document.getElementById("player" + player).classList.remove('w3-dark-gray')
    document.getElementById("player" + player).classList.add('w3-light-gray')
    if (totalPoints[player] >= 100) {
        endGame()
    } else {
        disableButtons()
        playerswitch()
        document.getElementById("player" + player).classList.remove('w3-light-gray')
        document.getElementById("player" + player).classList.add('w3-dark-gray')
        enableButtons()
    }

    // if (player == 0 && aiPlayer == true) {
    //     AIPlayer()
    // }




}
//end pass function

// player switch function

function playerswitch() {
    if (player == 3) {
        player = 0
    } else {
        player = (player + 1)
    }
    
}
// end player switch function

//switch buttons
// disable buttons function
function disableButtons() {
    document.getElementById("player" + player + "RollButton").disabled = true
    document.getElementById("player" + player + "PassButton").disabled = true
}
// end disable buttons functions

//enable buttons function
function enableButtons() {
    document.getElementById("player" + player + "RollButton").disabled = false
    document.getElementById("player" + player + "PassButton").disabled = false
}
// end enable buttons function
//end switch buttons

// end game function
function endGame() {
   
    //update color of winners box
    document.getElementById("player" + player).classList.remove('w3-light-gray')
    document.getElementById("player" + player).classList.add('w3-yellow')
    // bring out replay button
    document.getElementById("replay").classList.remove('w3-hide')
    document.getElementById("replay").classList.add('w3-show')

    disableButtons()


}
//end end game function

//replay function
function replay() {

    roundScore = 0
    //remove yellow background color
    document.getElementById("player" + player).classList.remove('w3-yellow')
    document.getElementById("player" + player).classList.add('w3-light-gray')
    //update player & enable their buttons
    player = 0
    enableButtons()
    //update so current player's background color is dark
    document.getElementById("player" + player).classList.remove('w3-light-gray')
    document.getElementById("player" + player).classList.add('w3-dark-gray')
    //show replay button
    document.getElementById("replay").classList.remove('w3-show')
    document.getElementById("replay").classList.add('w3-hide')

    //update writing & text on UI
    for (let i = 0; i < 4; i++) {
        totalPoints[i] = 0
        document.getElementById("player" + i + "Pig1").innerHTML = "/"
        document.getElementById("player" + i + "Pig2").innerHTML = "/"
        document.getElementById("player" + i + "TotalScore").innerHTML = ("Total score: " + totalPoints[i])
        document.getElementById("player" + i + "HandScore").innerHTML = "Score: " + roundScore
    }
}
//end replay function

//add pig out images
// function pigOutImg() {
//     piggedPlayer = document.getElementById("player" + (player - 1))
//     console.log(piggedPlayer)
//     document.getElementById("player" + (player - 1)).innerHTML = "<img src= 'piggedOut.png' style='width:100%;max-width:400px'>"
//     document.getElementById("player" + (player - 1)).classList.add("w3-image")

// }

// function resetPiggedPlayer() {
//     document.getElementById("player" + (player - 1)).innerHTML = piggedPlayer
// }

//end pig out images

//AI Player
// function AIPlayer() {
//     console.log("AI Player")
//     while (roundScore <= 20) {
//         roll()
//         console.log(" AI Player while")
//     }
//     pass()
// }

// function checkAIPlayer() {
//     if (aiPlayer && player == 0) {
//         AIPlayer()
//         console.log("Check AI Player if statement")
//     }
// }