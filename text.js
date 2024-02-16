"use strict"
class CanvasText {
    constructor(canvas, text, font, x, y, maxWidth, strokeColor, strokeWidth, fillColor) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.text = text;
        this.font = font;

        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;

        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.fillColor = fillColor;
    }

    draw() {
        // Sets the font, if defined.
        if(this.font != undefined) {
            this.ctx.font = this.font;
        }

        // Makes a stroke-only text, if stroke color is defined.
        if(this.strokeColor != undefined) {
            // Sets the context's stroke color.
            this.ctx.strokeStyle = this.strokeColor;

            // Changes context's stroke width, if defined.
            if(this.strokeWidth != undefined) {
                this.ctx.lineWidth = this.strokeWidth;
            }

            // Creates the Text
            this.ctx.strokeText(this.text, this.x, this.y, this.maxWidth);
        }

        // Makes a fill-only text, if fill color is defined.
        if(this.fillColor != undefined) {
            // Sets the context's fill color.
            this.ctx.fillStyle = this.fillColor;
            
            // Creates the Text
            this.ctx.fillText(this.text, this.x, this.y, this.maxWidth);
        }
    }
}