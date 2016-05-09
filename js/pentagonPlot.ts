/**
 * This file contains logic to create a plot on pentagon.
 * First it uses polar system to set pentagon nodes.
 * Then it draws several pentagons and a custom pentagon with
 * values specified by user. Lastly it adds labels also
 * specified by user.
 *
 * Use:
 * - create a pentagonPlot object, providing canvas id
 * - invoke drawPlot method
 *
 * @summary   Lets you create plots in shape of pentagon.
 *
 * @author    Łukasz Szcześniak
 * @link      http://viters.net/
 * @since     09.05.2016
 */

/**
 * Array of cos values to lower number of calculations
 * needed by script. It calculates cos of angles n * 72 degrees
 * rotated by 90 degrees (to have a summit of pentagon on top).
 * @type {number[]}
 */
let cosArr = [
    Math.cos(1 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.cos(2 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.cos(3 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.cos(4 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.cos(5 / 5 * 2 * Math.PI - Math.PI / 2),
];

/**
 * Array of sin values to lower number of calculations
 * needed by script. It calculates sin of angles n * 72 degrees
 * rotated by 90 degrees (to have a summit of pentagon on top).
 * @type {number[]}
 */
let sinArr = [
    Math.sin(1 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.sin(2 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.sin(3 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.sin(4 / 5 * 2 * Math.PI - Math.PI / 2),
    Math.sin(5 / 5 * 2 * Math.PI - Math.PI / 2),
];

/**
 * Class to create pentagon nodes.
 */
class Point {
    x:number;
    y:number;

    /**
     * Create a point and calculate it position.
     * It transforms (r, deg) position from polar system to
     * (x, y) Cartesian system and holds it afterwards.
     * @param r - distance from center of pentagon
     * @param pos - number of node (0 - 4)
     */
    constructor(r:number, pos:number) {
        this.x = r * cosArr[pos];
        this.y = r * sinArr[pos];
    }
}

/**
 * Class with interface to create and modify the plot.
 */
class pentagonPlot {
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    midX:number;
    midY:number;
    scoresColor:string = '#4383AF';
    borderColor:string = '#d2d2d2';
    fontStyle:string = '300 18px Lato';
    fontColor:string = '#414141';

    constructor(canvasId : string) {
        this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.midX = this.canvas.width / 2;
        this.midY = this.canvas.height / 2;
    }

    /**
     * Draws a line between two points.
     * @param begin - begin point
     * @param end - end point
     * @param color - color of the line
     * @param lineWidth - weight of the line
     */
    drawLine(begin:Point, end:Point, color:string, lineWidth:number) {
        this.ctx.beginPath();
        this.ctx.moveTo(begin.x + this.midX, begin.y + this.midY);
        this.ctx.lineTo(end.x + this.midX, end.y + this.midY);
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    /**
     * Draws pentagon with specified distance from center values.
     * @param list - array of values
     * @param color - color of pentagon
     * @param lineWidth - weight of lines
     */
    drawPentagon(list:Array<number>, color:string, lineWidth:number = 1) {
        let pointsArray = [
            new Point(list[0], 0),
            new Point(list[1], 1),
            new Point(list[2], 2),
            new Point(list[3], 3),
            new Point(list[4], 4)
        ];
        for (var i = 0; i < pointsArray.length; ++i) {
            this.drawLine(pointsArray[i], pointsArray[(i + 1) % 5], color, lineWidth);
        }
    }

    /**
     * Writes labels next to outer pentagon.
     * @param list - array of labels
     */
    writeLabels(list:Array<string>) {
        this.ctx.font = this.fontStyle;
        this.ctx.fillStyle = this.fontColor;
        this.ctx.textAlign = "center";
        this.ctx.fillText(list[4], this.midX, this.midY - 110);

        this.ctx.textAlign = "right";
        this.ctx.fillText(list[3], this.midX - 105, this.midY - 25);

        this.ctx.fillText(list[2], this.midX - 55, this.midY + 105);

        this.ctx.textAlign = "left";
        this.ctx.fillText(list[0], this.midX + 105, this.midY - 25);

        this.ctx.fillText(list[1], this.midX + 55, this.midY + 105);
    }

    /**
     * Utilizes provided functions to draw a whole pentagon plot.
     * @param scores - array of values of user defined pentagon
     * @param labels - array of labels
     */
    drawPlot(scores:Array<number>, labels:Array<string>) {
        // Draw background
        for (var i = 10; i <= 60; i = i + 10) {
            this.drawPentagon([i, i, i, i, i], this.borderColor);
        }
        this.drawPentagon([100, 100, 100, 100, 100], this.borderColor);

        // Draw scores
        this.drawPentagon(scores, this.scoresColor, 1.5);

        this.writeLabels(labels);
    }
}