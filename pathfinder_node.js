"use strict";
class PathfinderNode {
    constructor(x, y, gCost, gCostIncrement, fCost, parent) {
        this.x = x;
        this.y = y;

        this.gCost = gCost;
        this.gCostIncrement = gCostIncrement;
        this.fCost = fCost;
        
        this.parent = parent;
    }

    convertObjectToCoords() {
        const string = `${this.x},${this.y}`;

        return(string);
    }
}