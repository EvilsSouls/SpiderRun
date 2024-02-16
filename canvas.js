function resizeCanvas(canvasEl) {
    // Sets the width & height of the element to the same as the window's
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
}

function clearCanvas(ctx, canvasEl) {
    ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
}