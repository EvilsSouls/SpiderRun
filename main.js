"use strict";
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const plane = new Plane(canvas, null, null);
const player = new Player(plane, 1, 0, null, null, "./sprites/player.jpeg");

function updateGame() {
    clearCanvas(ctx, canvas);
    plane.draw();
    player.update();

    window.requestAnimationFrame(updateGame);
}

resizeCanvas(canvas);

const urlParams = new URLSearchParams(window.location.search);
plane.initialize(urlParams.get("maze"));

player.width = plane.data[0][0].width - 5; player.height = plane.data[0][0].height - 5;

window.requestAnimationFrame(updateGame);

/*
// When there is a left click, changes the status of the node, the mouse is currently hovering over, from free to wall or from wall to free.
canvas.addEventListener("click", e => {
    if(e.button === 0) {
        const node = plane.getNodeAtCoords(e.clientX, e.clientY);
        plane.data[node.y][node.x].wall = (plane.data[node.y][node.x].wall) ? false:true;

        plane.data[node.y][node.x].draw((plane.data[node.y][node.x].wall) ? "Black":"White");
    }
});
*/

// TODO:
// - Clean up plane.getNodeAtCoords (To give a reference to the value, not copy the value itself)
// - Add back / Clean up the text code to show the fCost of the squares
// - Maybe even change it, so that each node has a wall to another node and instead of having either cell = wall or not you can have 4 walls individually change from on or off
// - Maybe replace this.canvas.width / this.amountX, this.canvas.height / this.amountY (to automatically calculate width and height of cell to draw cell) maybe to a method or something