// Updating switch case method...
// http://designpepper.com/blog/drips/using-dispatch-tables-to-avoid-conditionals-in-javascript
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
*/

// We don't need all possible solutions, we just need to test the output of shuffle for solvability. Bottom right most tile will always be the blank.

// Bottom right must remain empty.
// Math will determine the other factor.
// http://mathworld.wolfram.com/15Puzzle.html
// Write a script for solvable sequences.

var currentTracerPosition,
    newTracerPosition,
    newTracerId;
var numberDestination,
    numberDestinationId,
    numberToMove;

var moveCounter = 1;
var moveTicker = document.getElementById('move-counter');

var tilePositionIds = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
  eleven: '11',
  twelve: '12',
  thirteen: '13',
  fourteen: '14',
  fifteen: '15',
  sixteen: '16'
};

var tilePositionClasses = {
  1: 'tracer tile c1 r1',
  2: 'tracer tile c2 r1',
  3: 'tracer tile c3 r1',
  4: 'tracer tile c4 r1',
  5: 'tracer tile c1 r2',
  6: 'tracer tile c2 r2',
  7: 'tracer tile c3 r2',
  8: 'tracer tile c4 r2',
  9: 'tracer tile c1 r3',
  10: 'tracer tile c2 r3',
  11: 'tracer tile c3 r3',
  12: 'tracer tile c4 r3',
  13: 'tracer tile c1 r4',
  14: 'tracer tile c2 r4',
  15: 'tracer tile c3 r4',
  16: 'tracer tile c4 r4'
}

// Only tracking 1 - 15 to keep the tracer in the bottom right.
var numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var proposedPuzzleNumList = [];
var newNumListShuffled = _.shuffle(numList);

var tileList = $('.board').children();

function reassignTracer(){
  $('.board').find('button[name=left]').parent().addClass('tracer');
}

var numberOfInversions = 0;


function shuffleNumList(){
  newNumListShuffled = _.shuffle(numList);
  examineShuffle(newNumListShuffled);
}

function reassignTileNumber(proposal){
  var tracerId = $('.tracer').attr('id');
  $('.tracer').attr('id', 'resetting');
  $('#n16').attr('id', tracerId);
  $('.tracer').attr('id', 'n16');
  moveCounter = true;

  for(i=0; i<proposal.length; i++){
    $(tileList[i]).html(proposal[i]);
  }
}

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

function checkSolvability(proposal){
  console.log(proposal);
  if (numberOfInversions % 2 === 0){
    //console.log("This puzzle is not solvable, reshuffling array. Number of inversions is " + numberOfInversions);
    examineShuffle();

  } else {
    console.log(numberOfInversions);
    console.log("This puzzle is solvable, enjoy the game.");
    reassignTileNumber(proposal);
  }
}

var commandTables = {
  up: function(){
    //Row = -1
    //N = n-4
    getCurrentTracerPosition();
    newTracerPosition = currentTracerPosition - 4;
    setNewPositionId();
    var distanceToMove = 4;
    setNumberPositionId(newTracerPosition + distanceToMove);
  },

  down: function(){
    //Row = +1
    //N = n+4
    getCurrentTracerPosition();
    newTracerPosition = currentTracerPosition + 4;
    setNewPositionId();
    var distanceToMove = 4;
    setNumberPositionId(newTracerPosition - distanceToMove);
  },

  left: function(){
    //Column = -1
    //N = n-1
    getCurrentTracerPosition();
    newTracerPosition = currentTracerPosition - 1;
    setNewPositionId();
    var distanceToMove = 1;
    setNumberPositionId(newTracerPosition + distanceToMove);
  },
  right: function(){
    //Column = +1
    //N = n+1
    getCurrentTracerPosition();
    newTracerPosition = currentTracerPosition + 1;
    setNewPositionId();
    var distanceToMove = 1;
    setNumberPositionId(newTracerPosition - distanceToMove);
  }
};

function getCurrentTracerPosition(){
  currentTracerPosition = parseInt(currentTracerPosition.substring(1, currentTracerPosition.length), 10);
}

function setNewPositionId(){
  newTracerId = 'n' + newTracerPosition;
  newTracerId = (_.invert(tilePositionIds)[newTracerPosition]);
  $('.tracer').attr('class', tilePositionClasses[newTracerPosition]).attr('id', '');
  numberToMove = document.getElementById('n' + newTracerPosition);
  numberToMove.id = (_.invert(tilePositionIds)[newTracerPosition]);
}

function setNumberPositionId(equationForDistance){
  numberDestination = equationForDistance;
  numberDestinationId = 'n' + numberDestination; //n-1
  numberToMove.id = numberDestinationId;
  resolveNewTracerPosition();
}

function resolveNewTracerPosition(){
  newTracerClass = $('.tracer').attr('class');
  newTracerId = 'n' + (_.invert(tilePositionClasses)[newTracerClass]);
  $('.tracer').attr('class', tilePositionClasses[newTracerPosition]).attr('id', newTracerId);

}

function dispatchTables(path){
  resolveMoveCounter(moveCounter++);
  setGameStatus();
  commandTables[path]();
}

function setGameStatus(){
  if(moveCounter === 1){
    $('.game').toggleClass('is-new-game is-in-progress');
  }else if(moveCounter === false){
    $('.game').removeClass('is-new-game').addClass('is-resetting');
    $('.game').removeClass('is-in-progress').addClass('is-resetting');
    resolveMoveCounter(0);
  }
}

function incrementMoveCounter(){
  moveCounter ++;
  moveTicker.innerHTML = moveCounter;
}

function resolveMoveCounter(moveValue){
  console.log(moveValue);
  document.getElementById('move-counter').innerHTML = (moveValue);
}

function resetMeters(){
  resolveMoveCounter(0);
  setGameStatus();
}

$('#reset').click(function(){
  moveCounter = false;
  examineShuffle();
  reassignTileNumber();
});

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

$('#up').click(function(){
  directionMoving = this.id;
  currentTracerPosition = $(this).parent().attr('id');
  dispatchTables('up');
});


$('#down').click(function(){
  directionMoving = this.id;
  currentTracerPosition = $(this).parent().attr('id');
  dispatchTables('down');
});

$('#right').click(function(){
  directionMoving = this.id;
  currentTracerPosition = $(this).parent().attr('id');
  dispatchTables('right');
});

$('#left').click(function(){
  directionMoving = this.id;
  currentTracerPosition = $(this).parent().attr('id');
  dispatchTables('left');
});

setKeyHandler();
