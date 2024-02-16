"use strict";
class Node {
    constructor(canvas, x, y, width, height, blocked) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.wall = blocked;
    }

    draw(fillColor, strokeColor = "DimGray") {
        // Checks if node is a block. If true then creates a filled in rectange, if false creates a stroked rectangle.
        if(this.wall || fillColor !== undefined) {
            // Sets the color of the node to black if fillColor is undefined (so it's a wall), or sets the color of the node to fillColor if it is defined.
            this.ctx.fillStyle = (fillColor === undefined) ? "Black":fillColor;

            // Creates the rectangle
            this.ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        }
        
        // Changes the border's color
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = 5;
        
        // Applies a border to the node.
        this.ctx.strokeRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}