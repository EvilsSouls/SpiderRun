"use strict";
class Player extends Entity {
    constructor(plane, x, y, width, height, image) {
        super(plane, x, y, width, height, image);

        const boundChangeDirection = this.changeDirection.bind(this);
        document.addEventListener("keydown", boundChangeDirection);
        document.addEventListener("touchstart", (e) => {
            touchStart = [e.clientX, e.clientY];
        });
        document.addEventListener("touchend", (e) => {
            touchEnd = [e.clientX, e.clientY];
            alert(`TouchStart: ${touchStart}, TouchEnd: ${touchEnd}`);
        });
    }

    changeDirection(e) {
        switch(e.key) {
            case "w":
                this.movement = [0,-1];
                break;
            case "a":
                this.movement = [-1, 0];
                break;
            case "s":
                this.movement = [0, 1];
                break;
            case "d":
                this.movement = [1, 0];
        }
    }
}