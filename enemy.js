"use strict";
class Enemy extends Entity {
    constructor(plane, x, y, width, height, image) {
        super(plane, x, y, width, height, image);

        this.pathfinder = new Pathfinder(this.plane, "0,0", "0,0", {finalPathColor: null, openColor: null, closedColor: null});
    }
}