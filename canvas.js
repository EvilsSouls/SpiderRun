"use strict";
function resizeCanvas(canvasEl) {
    // Sets the width & height of the element to the same as the window's
    canvasEl.width = window.innerWidth;
    canvasEl.height = 0.7 * window.innerHeight;
}

function clearCanvas(ctx, canvasEl) {
    ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
}