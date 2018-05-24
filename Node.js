class Node
{
    constructor(x, y, angle, length, speed)
    {
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
        this.speed = speed;
        this.ox = undefined; // Old position (used to trace lines)
        this.oy = undefined; // Old position (used to trace lines)
    }

    destroy()
    {
        this.x = null;
        this.y = null;
        this.length = null;
        this.angle = null;
        this.speed = null;
        this.ox = null;
        this.oy = null;
    }
}

class NodeUIElement
{
    constructor(x, y, length, speed)
    {
        this.x = x;
        this.y = y;
        this.lengthSlider = createSlider(1, 100, length, 1);
        this.lengthSlider.position(x, y);
        this.speedSlider = createSlider(-0.05, 0.05, speed, 0.001);
        this.speedSlider.position(x + 200, y);        
    }

    destroy()
    {
        this.speedSlider.remove();
        this.speedSlider = null;
        this.lengthSlider.remove();
        this.lengthSlider = null;
    }
}