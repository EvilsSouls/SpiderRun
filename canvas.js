"use strict";
function resizeCanvas(canvasEl) {
    // Sets the width & height of the element to the same as the window's
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight - 100;
}

function clearCanvas(ctx, canvasEl) {
    ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
}