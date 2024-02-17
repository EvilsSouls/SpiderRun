"use strict";
class Pathfinder {
    constructor(plane, start, end, visualizationData = {finalPathColor: "DodgerBlue", openColor: "GreenYellow", closedColor: "IndianRed"}) {
        this.plane = plane;

        this.startNodeID = start;
        this.endNodeID = end;

        this.currentNode = null;
        this.startNode = null;
        this.endNode = null;

        this.gCost = 0;
        this.openNodes = new Map();
        this.sortedOpenNodes = [];
        this.closedNodes = new Map();

        this.visualizationData = visualizationData;

        this.path = [];

        this.interval = null;
    }

    reset() {
        this.startNodeID = null;
        this.endNodeID = null;
        this.startNode = null;
        this.endNode = null;
        this.currentNode = null;

        this.gCost = 0;
        this.openNodes = new Map();
        this.sortedOpenNodes = [];
        this.closedNodes = new Map();
    }

    convertCoordsToObject(string, gCost, gCostIncrement, fCost, parent) {
        string = string.split(",", 2);
        string[0] = parseInt(string[0], 10);
        string[1] = parseInt(string[1], 10);

        return(new PathfinderNode(string[0], string[1], gCost, gCostIncrement, fCost, parent));
    }

    evalNeighbors(node) {
        for(let y = -1; y < 2; y++) {
            for(let x = -1; x < 2; x++) {
                let gCost = node.gCost;

                // Checks if the "neighbor" is actually just the origin. If so, skips this iteration.
                if(x === 0 && y === 0) {continue;}

                const neighborNode = new PathfinderNode(node.x + x, node.y + y, null, null, null, node.convertObjectToCoords());

                if(!this.plane.inBounds(neighborNode)) {continue;}
                // Checks if the node in the plane at the current coords is a wall. If so, skips this iteration.
                if(this.plane.data[neighborNode.y][neighborNode.x].wall) {continue;}

                const neighborNodeID = neighborNode.convertObjectToCoords();

                // Checks if the neighbor is already in the closed nodes. If so, skips this iteration.
                if(this.closedNodes.has(neighborNodeID)) {continue;}

                // Checks if diagonal, if so adds √2 * 10 (~14) to temporary G Cost. Else adds 10
                if(Math.abs(x) === 1 && Math.abs(y) === 1) {
                    neighborNode.gCostIncrement = 14;
                    gCost += neighborNode.gCostIncrement;
                } else {
                    neighborNode.gCostIncrement = 10;
                    gCost += neighborNode.gCostIncrement;
                }

                const hCost = this.plane.lazyDistance(neighborNode, this.endNode);
                
                neighborNode.gCost = gCost;
                neighborNode.fCost = gCost + hCost;

                // Checks if neighbor is already in the open nodes. If so updates the old node.
                if(this.openNodes.has(neighborNodeID)) {
                    // Checks if the old node has a higher F Cost than the new one. If so updates the old one, if not skips this iteration.
                    const oldNode = this.openNodes.get(neighborNodeID);
                    if(neighborNode.fCost < oldNode.fCost) {
                        this.openNodes.set(neighborNodeID, neighborNode);
                    } else {
                        continue;
                    }
                } else {
                    // Adds the neighbor to the open lists
                    this.openNodes.set(neighborNodeID, neighborNode);
                    this.sortedOpenNodes.push(neighborNodeID);
                }

                if(this.visualizationData.openColor !== null) {
                    // Uses the neighbor's coords to get the same node in the plane. Then, uses the draw method of the node to draw it.
                    const planeNode = this.plane.data[neighborNode.y][neighborNode.x];
                    planeNode.draw(this.visualizationData.openColor);
                }
            }
        }
    }

    tracePath(originNode) {
        let continueLoop = true;
        while(true === true) {
            this.path.push(originNode.convertObjectToCoords());
            originNode = this.closedNodes.get(originNode.parent);

            if(!continueLoop) {break;}

            // If the parent of the future current node is null then will continue for one more iteration, but will then stop.
            if(originNode.parent === null) {continueLoop = false;}
        }
        // Reverses the path, as it's currently reversed.
        this.path.reverse();
        return(this.path);
    }

    update() {
        if(this.openNodes.size !== 0) {
            // Sets the new current node to the one in the open list with the lowest F-Cost. Also removes the node from the open list and adds it to the closed list.
            const newNodeID = this.sortedOpenNodes[0];
            this.currentNode = this.openNodes.get(newNodeID);
            this.closedNodes.set(newNodeID, this.currentNode);
            this.openNodes.delete(newNodeID);
            this.sortedOpenNodes.shift();

            if(this.visualizationData.closedColor !== null) {
                // Draws the current node to the closedColor (defined in the visualizationData)
                const planeNode = this.plane.data[this.currentNode.y][this.currentNode.x];
                planeNode.draw(this.visualizationData.closedColor);
            }

            if(newNodeID === this.endNodeID) {
                this.tracePath(this.currentNode);
                console.log(`Path found. Saved to ${this}.path`);

                if(this.visualizationData.finalPathColor !== null) {
                    this.plane.drawNodesInArray(this.path, this.visualizationData.finalPathColor);
                }

                clearInterval(this.interval);
                this.interval = null;

                this.reset();
            } else {
                this.evalNeighbors(this.currentNode);

                this.sortedOpenNodes.sort((a, b) => {
                    const node1 = this.openNodes.get(a);
                    const node2 = this.openNodes.get(b);

                    const deltaFCost = node1.fCost - node2.fCost;

                    if(deltaFCost === 0) {
                        const node1HCost = node1.fCost - node1.gCost;
                        const node2HCost = node2.fCost - node2.gCost;

                        if((node1HCost - node2HCost) < 0) {
                            return(-1);
                        } else {return(1);}
                    } else {
                        return(node1.fCost - node2.fCost);
                    }
                });
            }
        } else {
            clearInterval(this.interval);
            this.interval = null;

            console.error("Error: Impossible end location");

            this.reset();
        }
    }

    pathfind(delay) {
        this.startNode = this.convertCoordsToObject(this.startNodeID, 0, 0, null, null);
        this.endNode = this.convertCoordsToObject(this.endNodeID, null, null, null, null);

        this.openNodes.set(this.startNodeID, this.startNode);
        this.sortedOpenNodes.push(this.startNodeID);

        const boundUpdate = this.update.bind(this);
        if(delay !== 0) {
            this.interval = setInterval(boundUpdate, delay);
        } else {
            this.interval = 1;
            while(this.interval !== null) {boundUpdate();}
        }
        
        /*
        document.body.addEventListener("keypress", (e) => {
            console.log(e);
            if(e.key === "Enter") {
                boundUpdate();
            }
        });
        */
    }
}