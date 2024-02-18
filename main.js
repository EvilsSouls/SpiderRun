"use strict";
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const plane = new Plane(canvas, null, null);
const player = new Player(plane, 1, 0, null, null, "./sprites/player.jpeg");
const enemy = new Enemy(plane, 1, 0, null, null, "./sprites/enemy.png", 5);

document.getElementById("up-button").addEventListener("touchend", () => {player.movement = [0,-1]});
document.getElementById("down-button").addEventListener("touchend", () => {player.movement = [0,1]});
document.getElementById("left-button").addEventListener("touchend", () => {player.movement = [-1,0]});
document.getElementById("right-button").addEventListener("touchend", () => {player.movement = [1,0]});

let gameClock = 0;
function updateGame() {
    if(gameClock >= 60) {
        if(enemy.headStart > 0) {enemy.headStart--;}
        gameClock = 0;
    }

    if(gameClock % 10 === 0) {
        clearCanvas(ctx, canvas);
        player.update();

        if(player.x == goal[0] && player.y == goal[1]) {
            console.log("Player won");
            if(typeof AppInventor !== "undefined") {AppInventor.setWebViewString("Player won");}
        }

        if(enemy.headStart === 0) {
            enemy.changeDirection(player.coords);
            enemy.update();
            enemy.coords = [0,0]

            if(player.x === enemy.x && player.y === enemy.y) {
                console.log("Player lost");
                location.reload();
            }
        }
        plane.draw();

        const goalImg = document.createElement("img");
        goalImg.src = "./sprites/goal.png";
        ctx.drawImage(goalImg, goal[0] * player.width, goal[1] * player.height, player.width, player.height);
    }

    gameClock++;

    window.requestAnimationFrame(updateGame);
}

resizeCanvas(canvas);

const urlParams = new URLSearchParams(window.location.search);
const goal = urlParams.get("goal").split(",");
plane.initialize(urlParams.get("maze"));

player.width = plane.data[0][0].width; player.height = plane.data[0][0].height;
enemy.width = plane.data[0][0].width; enemy.height = plane.data[0][0].height;

window.requestAnimationFrame(updateGame);


// When there is a left click, changes the status of the node, the mouse is currently hovering over, from free to wall or from wall to free.
canvas.addEventListener("click", e => {
    if(e.button === 0) {
        const node = plane.getNodeAtCoords(e.clientX, e.clientY);
        plane.data[node.y][node.x].wall = (plane.data[node.y][node.x].wall) ? false:true;

        plane.data[node.y][node.x].draw((plane.data[node.y][node.x].wall) ? "Black":"White");
    }
});

// TODO:
// - Clean up plane.getNodeAtCoords (To give a reference to the value, not copy the value itself)
// - Add back / Clean up the text code to show the fCost of the squares
// - Maybe even change it, so that each node has a wall to another node and instead of having either cell = wall or not you can have 4 walls individually change from on or off
// - Maybe replace this.canvas.width / this.amountX, this.canvas.height / this.amountY (to automatically calculate width and height of cell to draw cell) maybe to a method or something
// - Maybe replace the arrays for movement in entity and coords in entity with a Vector (as an object, so that you can have method to easily add/subtract/get absolute value with subtraction. Maybe even easier with getters/setters to easily do multiple array stuff)
// - Maybe add object class, which other classes can inherit from (it'd have x, y, draw method, etc...), so that end goal can be object. (Also improve goal code, as it's very lazy right now)