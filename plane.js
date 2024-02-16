"use strict";
class Plane {
    constructor(canvas, amountX, amountY) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.amountX = amountX;
        this.amountY = amountY;
        
        this.data = [];
    }

    createEmptyNodes() {
        // Creates a 2D Array of empty nodes for the plane.
        for(let y = 0; y < this.amountY; y++) {
            const currentArray = [];
            for(let x = 0; x < this.amountX; x++) {
                const node = new Node(this.canvas, x, y, this.canvas.width / this.amountX, this.canvas.height / this.amountY, false);
                currentArray.push(node);
            }

            this.data.push(currentArray);
        }
    }

    initialize(blueprint = null) {
        if(blueprint !== null) {
            // Blueprint format = xSize,ySize;data (Binary: 0b[binary data]) (Hexadecimal: 0x[hex data])
            blueprint = blueprint.split(";");

            // Gets the x and y size of the plane and then creates the empty 2D Array
            const planeSize = blueprint[0].split(",");
            this.amountX = planeSize[0];
            this.amountY = planeSize[1];
            this.createEmptyNodes();
            
            const amountNodes = this.amountX * this.amountY;

            // Gets the actual data from the blueprint. Also converts the text to lowercase so that 0B or 0X is treated same as 0b or 0x.
            let data = blueprint[1].toLowerCase();

            if(data.at(1) === "x") {
                data = convertHexToBin(data);
            }

            data = data.replace("0b", "");

            // If the length of the data does not match the length it should be, it means that 0s have been added to the start of the binary number to easily convert it to hexadecimal.
            // This removes the leading zeros, since all data would be pushed x forward if the leading zeros weren't to be removed.
            if(data.length > amountNodes) {
                const delta = Math.abs(data.length - amountNodes);
                const searchRegExp = new RegExp(`^0{${delta}}`);
                data = data.replace(searchRegExp, "");
            }

            // Splits the data into a list, where each entry equals one node.
            data = data.split("");
            // Repeats over all of the nodes inside this plane.
            for(let x = 0; x < this.amountX; x++) {
                for(let y = 0; y < this.amountY; y++) {
                    // Converts the x & y indices into the actual position inside the binary string. Then checks whatever or not the current node should be a wall and stores that in currentNodeWall.
                    const currentNodeWall = parseInt(data[(y * this.amountX) + x], 10);
                    this.data[y][x].wall = (currentNodeWall === 1) ? true:false;
                }
            }
        } else {this.createEmptyNodes();}
    }

    draw() {
        // Loops through each node and draws them.
        for(let y = 0; y < this.amountY; y++) {
            const currentArray = this.data[y];
            for(let x = 0; x < this.amountX; x++) {
                const currentNode = currentArray[x];
                currentNode.draw();

                //new CanvasText(this.canvas, `X: ${currentNode.x}, Y: ${currentNode.y}`, undefined, currentNode.x * 100 + 100, currentNode.y * 100 + 100, 100, "black", 1).draw();
            }
        }
    }

    drawNodesInArray(nodes, color) {
        for(let nodeID of nodes) {
            const nodeCoords = nodeID.split(",");
            const node = this.data[nodeCoords[1]][nodeCoords[0]];
            node.draw(color);
        }
    }

    inBounds(coord) {
        if(coord.x < 0 || coord.x >= this.amountX || coord.y < 0 || coord.y >= this.amountY) {
            return(false);
        } else {
            return(true);
        }
    }

    distance(coord1, coord2) {
        // Returns the Euclidean Distance between two points.
        return(Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2)));
    }

    lazyDistance(coord1, coord2) {
        // Gets the distance between two nodes by adding how many times you need to take a 45° Angled Diagonal (weighted 14) and a 90° Angled Straight (weighted 10) from the first node to the second one. 

        let deltaX = Math.abs(coord1.x - coord2.x);
        let deltaY = Math.abs(coord1.y - coord2.y);

        // Gets the amount of 45° Diagonals you'd have to take (By just taking the larger of the two deltas)
        const diagonals = (deltaX < deltaY) ? deltaX:deltaY;

        // Gets the amount of Straights you'd have to take (By taking the larger of the two deltas and subtracting the smaller of the two deltas)
        const straights = (deltaX < deltaY) ? deltaY - diagonals:deltaX - diagonals;
        
        const distance = (diagonals * 14) + (straights * 10);
        return(distance);
    }

    getNodeAtCoords(x, y) {
        const coordX = Math.floor(x * this.amountX / this.canvas.width);
        const coordY = Math.floor(y * this.amountY / this.canvas.height);

        return(this.data[coordY][coordX]);
    }

    savePlaneAsBlueprint() {
        // Blueprint format = xSize,ySize;data (Binary: 0b[binary data]) (Hexadecimal: 0x[hex data])
        let blueprint = "";
        blueprint += `${this.amountX},${this.amountY};`

        let data = "0b";
        for(let y = 0; y < this.amountY; y++) {
            const currentArray = this.data[y];
            for(let x = 0; x < this.amountX; x++) {
                data += (currentArray[x].wall) ? "1":"0";
            }
        }

        blueprint += convertBinToHex(data);

        return(blueprint);
    }
}