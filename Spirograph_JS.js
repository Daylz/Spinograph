var screenW = 1024;
var screenH = 1024;

var bgCanvas;
var bgColor = 240;

// Nodes
var nodes = [];
var numNodes = 2;
var minNodes = 1;
var maxNodes = 10;
var drawingNodes = true;

// Drawing
var drawSpeed = 1;

// UI
var leftMargin = 15;
var topMargin = 25;
var text_size = 12;
var visibleNodesBtn;
var clearBGBtn;
var nodeSlider;
var speedSlider;
var nodeUIElements = [];

function setup()
{
    createCanvas(screenW, screenH);
    bgCanvas = createGraphics(screenW, screenH);
    bgCanvas.background(bgColor);
    bgCanvas.translate(screenW / 2, screenH / 2);

    initNodes();

    // UI
    initUI();
}

function initUI()
{
    textSize(text_size);    

    // # of nodes slider
    nodeSlider = createSlider(minNodes, maxNodes, numNodes, 1);
    nodeSlider.position(leftMargin, topMargin);
    nodeSlider.input(updateNodes);    

    // drawing speed slider
    speedSlider = createSlider(0, 50, drawSpeed, 1);
    speedSlider.position(leftMargin, nodeSlider.y + 25);
    speedSlider.input(updateDrawSpeed);

    // toggle visibility of nodes
    visibleNodesBtn = createButton('Toggle Nodes');
    visibleNodesBtn.position(leftMargin, speedSlider.y + 30);
    visibleNodesBtn.mousePressed(nodesVisibilityToggle);

    // clears the background
    clearBGBtn = createButton('Clear Lines');
    clearBGBtn.position(visibleNodesBtn.x + visibleNodesBtn.width + 10, visibleNodesBtn.y);
    clearBGBtn.mousePressed(function(){ bgCanvas.background(bgColor); });

    updateNodeSliders();
}

function initNodes()
{
    /*for (var i = 0; i < numNodes; ++i)
    {
        nodes[i] = new Node(0, 0, 0, random(10, 100), random(-1, 1)/20);
    }*/
	
	nodes[0] = new Node(0, 0, 0, 100, 0.009); 
	nodes[1] = new Node(0, 0, 0, 75, -0.04);
}

function updateNodes()
{
    bgCanvas.background(bgColor);

    numNodes = nodeSlider.value();

    nodes = [];

    for (var i = 0; i < numNodes; ++i)
    {
        nodes[i] = new Node(0, 0, 0, random(10, 100), random(-1, 1)/20);
    }    

    console.log(nodes);

    updateNodeSliders();
}

function updateNodeSliders()
{
    // destroys existing sliders
    for (var i = 0; i < nodeUIElements.length; ++i)
    {
        nodeUIElements[i].destroy();
    }

    nodeUIElements.length = numNodes;

    // create sliders for each node to control their speed and length
    for (var i = 0; i < numNodes; ++i)
    {
        nodeUIElements[i] = new NodeUIElement(width / 2, topMargin + i * 25, nodes[i].length, nodes[i].speed);
    }
}

function draw()
{    
    background(145);
    imageMode(CORNER);
    image(bgCanvas, 0, 0, screenW, screenH);  

    updateUI();

    updateNodeValues();

    translate(width / 2, height / 2);  

    drawNodes();

    var lastNode = nodes[nodes.length - 1];

    bgCanvas.stroke(0);
    bgCanvas.strokeWeight(1);   
    bgCanvas.line(lastNode.x, lastNode.y, lastNode.ox, lastNode.oy);

    lastNode.ox = lastNode.x;
    lastNode.oy = lastNode.y;
}

function drawNodes()
{
    for (var i = 0; i < nodes.length; i++)
    {
        var node = nodes[i];
        var offsetX = 0;
        var offsetY = 0;

        if (i > 0)
        {
            offsetX = nodes[i - 1].x;
            offsetY = nodes[i - 1].y;
        }

        node.x = offsetX + node.length * sin(node.angle);
        node.y = offsetY + node.length * cos(node.angle);

        if (drawingNodes)
        {
            stroke(0);
            strokeWeight(2);
            line(offsetX, offsetY, node.x, node.y);
            fill(0);
            ellipse(node.x, node.y, 5, 5);
        }

        node.angle += node.speed * drawSpeed;
    }
}

function updateNodeValues()
{
    for (let i = 0; i < nodeUIElements.length; ++i)
    {
        const uiElement = nodeUIElements[i];
        const node = nodes[i];
        node.length = uiElement.lengthSlider.value();
        node.speed = uiElement.speedSlider.value();
    }
}

function updateUI()
{
    strokeWeight(0);
    textAlign(CENTER, CENTER);

    text("# of nodes: "+ numNodes, (nodeSlider.x + nodeSlider.width + 60), (nodeSlider.y + text_size));
    text("drawing speed: "+ drawSpeed, (speedSlider.x + speedSlider.width + 60), (speedSlider.y + text_size));
    text("length", nodeUIElements[0].lengthSlider.x + (nodeUIElements[0].lengthSlider.width / 2), topMargin - 10);
    text("speed", nodeUIElements[0].speedSlider.x + (nodeUIElements[0].speedSlider.width / 2), topMargin - 10);

    for (var i = 0; i < nodeUIElements.length; ++i)
    {
        text("node #"+ i, nodeUIElements[i].x - 75, nodeUIElements[i].y + text_size);
        text(nodes[i].length, nodeUIElements[0].lengthSlider.x + nodeUIElements[0].lengthSlider.width + 25, nodeUIElements[i].y + text_size);
        text(nodes[i].speed, nodeUIElements[0].speedSlider.x + nodeUIElements[0].speedSlider.width + 25, nodeUIElements[i].y + text_size);
    }
}

function updateDrawSpeed()
{
    drawSpeed = speedSlider.value();
}

function nodesVisibilityToggle()
{
    drawingNodes = !drawingNodes;
}