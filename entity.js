"use strict";
class Entity {
    constructor(plane, x, y, width, height, image) {
        this.plane = plane;
        this.canvas = this.plane.canvas;
        this.ctx = this.canvas.getContext("2d");

        this.coords = [x, y];
        this.movement = [0,0];
        this.dimensions = [width, height];

        this.image = image;
    }

    get x() {
        return(this.coords[0]);
    }

    get y() {
        return(this.coords[1]);
    }

    set x(x) {
        this.coords[0] = x;
    }

    set y(y) {
        this.coords[1] = y;
    }

    get width() {
        return(this.dimensions[0]);
    }

    get height() {
        return(this.dimensions[1]);
    }

    set width(width) {
        this.dimensions[0] = width;
    }

    set height(height) {
        this.dimensions[1] = height;
    }

    move() {
        const oldCoords = this.coords;
        this.coords = addArrays(this.coords, this.movement);
        
        if(!this.plane.inBounds(this) || this.plane.data[this.y][this.x].wall) {
            this.coords = oldCoords;
            // Maybe play sound here?
        }
    }

    draw() {
        const img = document.createElement("img");
        img.src = this.image;
        this.ctx.drawImage(img, this.x * this.width, this.y * this.height, this.width, this.height);
    }

    update() {
        this.move();
        this.draw();
    }
}