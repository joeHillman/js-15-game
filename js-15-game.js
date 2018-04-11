// Some upgrades, improvements, thoughts.
// Arrow key controls.
// We could make it the real game by randomizing the tiles.
// Reset button would randomize the tiles.
// A wait screen or just a generic style to shuffle the numbers out while reassigning the ids for new placement.
// We could improve by making it extensible.
// Currently this is set to a 4x4.

// Fisher Yates Shuffle
// http://bost.ocks.org/mike/shuffle/
// Underscores _shuffle, it's based off Fisher Yates.

// For this to be solvable...
// https://en.wikipedia.org/wiki/15_puzzle
// https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
/*  where [a, b...] & [a > b...] = inversion
1 8 2 4 3 7 6 5
---------------
0 6 0 1 0 2 1 0 == 10


5, 13, 15, 8, 12, 3, 14, 10, 1, 11, 9, 7, 6, 4, 2
-------------------------------------------------
4, 12, 13, 6, 9,  3, 8, 6, 0,  5, 4,  3,  2,  1  0
*/

// We don't need all possible solutions, we just need to test the output of shuffle for solvability. Bottom right most tile will always be the blank.

// Bottom right must remain empty.
// Math will determine the other factor.
// http://mathworld.wolfram.com/15Puzzle.html
// Write a script for solvable sequences.



// List out a series of numbers that accomodates the puzzle size (size -1 to account for blank spot).
// Need a variable to house the size of the game. Skip the variable and build a prompt function later on.
// Need to shuffle the size array and submit as a proposal. -- _.shuffle(numList);
// Need an array to house the list of numbers for the proposal function to operate upon.

let numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let shuffleNumList = _.shuffle(numList);

console.log(shuffleNumList);

function countInversions(proposal){
    var proposalHolster = proposal.slice(0);

    var numberOfInversions = 0;
    while (proposal.length>0){
        var key = proposal[0];
        for(i=1; i<proposal.length; i++){
            if(key>proposal[i]){
                numberOfInversions ++;
            }
        }
        proposal.shift();
    }
    return numberOfInversions;
}

function checkSolvability(proposal, size){
  if (proposal % 2 === 0){
    //console.log("The proposed puzzle size is...", size)
    console.log("This puzzle is not solvable, reshuffling array. Number of inversions is " + proposal);
    generatePuzzle(size);
  } else {
    console.log("This puzzle is solvable", "The number of inversions is", proposal);
    createNewPuzzle();
  }
}




// let numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// let shuffleNumList = _.shuffle(numList);












// Keep the solvability functions...
function examineShuffle(){
  numberOfInversions = 0;
  newNumListShuffled = _.shuffle(numList);

  var proposal= newNumListShuffled.slice(0);

  while (newNumListShuffled.length>0){
  	var key = newNumListShuffled[0];
    for(i=1; i<newNumListShuffled.length; i++){
      if(key>newNumListShuffled[i]){
        numberOfInversions ++;
      }
    }
    newNumListShuffled.shift();
  }
  resetMeters();
  reassignTracer();
  checkSolvability(proposal);
}


// key binding from .... https://raw.githubusercontent.com/jstimpfle/tetris-on-a-plane/master/tetris.js
// this part is still being worked on

var container = document.getElementById('board');

var KEY_E = 69;
var KEY_S = 83;
//var KEY_D = 68;
var KEY_F = 70;
var keyHandler = 'null';

function setKeyHandler() {
  keyHandler = window.addEventListener('keydown', function(kev){
    var consumed = true;
    if (kev.keyCode === KEY_E) {
      $('#up').click();
    } if (kev.keycode === KEY_S) {
      $('#down').click();
    } else {
      consumed = false;
    }
    if (consumed) {
      kev.preventDefault();
    }
  });
}

setKeyHandler();
