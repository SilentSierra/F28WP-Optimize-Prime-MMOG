import { LAYOUT, OBJECT_TYPE } from "./setup";
import Arena from './arena';
import Pacman from "./pacman";

// DOM elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
var username = document.getElementById("username").value;
const usernameContainer = document.querySelector('#username');


// Game constants
const GLOBAL_SPEED = 80; //ms
const arena = Arena.createArena(gameGrid, LAYOUT);

// Initial setup
let score = 0;
let timer = null;

//array containing indexes of empty cells in layout (arena.js)
let emptyCells = [];
for (var i = 0; i < LAYOUT.length; i++) {
    if (LAYOUT[i] == 0)
        emptyCells.push(i);
}

//food variables, for food spawning
const maxFood = Math.floor(emptyCells.length / 4);
let currentFood = 0;

function checkCollision(pacman, ghosts) {

}

function gameLoop(pacman, ghosts) {
    arena.moveCharacter(pacman);
    while (currentFood < maxFood / 3) spawnFood();

    // check if pacman eats food
    if (arena.objectExist(pacman.pos, OBJECT_TYPE.FOOD)) {
        arena.removeObject(pacman.pos, [OBJECT_TYPE.FOOD]);
        currentFood--;
        score += 10;
    }

    scoreTable.innerHTML = score;
}

// Spawn a food in random empty location
function spawnFood(){
// Find and choose empty position
    var index = emptyCells.splice(Math.floor(Math.random() * emptyCells.length), 1);

    // Create and position food

    arena.addObject(index, [OBJECT_TYPE.FOOD]);

    currentFood++;
}

function startGame(){
    usernameContainer.innerHTML = username;
    arena.createGrid(LAYOUT);
    const pacman = new Pacman(2, 30);
    arena.addObject(30, [OBJECT_TYPE.PACMAN]);

    document.addEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, arena.objectExist.bind(arena))
    );

    timer = setInterval(() => gameLoop(pacman), GLOBAL_SPEED);
}

// Initialize game
startGame();