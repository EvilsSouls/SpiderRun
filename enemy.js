"use strict";
class Enemy extends Entity {
    constructor(plane, x, y, width, height, image, headStart) {
        super(plane, x, y, width, height, image);

        this.pathfinder = new Pathfinder(this.plane, "0,0", "0,0", {finalPathColor: null, openColor: null, closedColor: null});
        this.headStart = headStart;
    }

    changeDirection(targetPlayerLoc) {
        this.pathfinder.startNodeID = this.coords.join(",");
        this.pathfinder.endNodeID = targetPlayerLoc.join(",");
        this.pathfinder.pathfind(0);

        const loc1 = this.pathfinder.path[0].split(",");
        let loc2 = this.pathfinder.path[1]?.split(",");

        if(loc2 === undefined) {loc2 = loc1;}

        this.movement = [loc2[0] - loc1[0], loc2[1] - loc1[1]];

        this.pathfinder.path = [];
    }
}