/*
                                                                       _ooOoo_
                                                                      o8888888o
                                                                      88" . "88
                                                                      (| -_- |)
                                                                      O\  =  /O
                                                                   ____/`---'\____
                                                                 .'  \\|     |//  `.
                                                                /  \\|||  :  |||//  \
                                                               /  _||||| -:- |||||-  \
                                                               |   | \\\  -  /// |   |
                                                               | \_|  ''\---/''  |   |
                                                               \  .-\__  `-`  ___/-. /
                                                             ___`. .'  /--.--\  `. . __
                                                          ."" '<  `.___\_<|>_/___.'  >'"".
                                                         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
                                                         \  \ `-.   \_ __\ /__ _/   .-` /  /
                                                    ======`-.____`-.___\_____/___.-`____.-'======
                                                                       `=---='
                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                                        NO BUG
*/
/* eslint-disable */
/* global $, describe, it, xit, xdescribe, after, afterEach, expect*/

describe("composeImages", function() {
    var placeholder, plot;
    var composeImages = $.plot.composeImages,
        canvasData = window.colors.canvasData;

    beforeEach(function() {
        jasmine.addMatchers(window.colors.jasmineMatchers);
    });

    it('should call composeImages on an empty array of sources, so the destination canvas should stay unmodified', function (done) {
        var sources = placeholder.html('<div id="test-container" style="width: 600px;height: 400px">' +
        '</div>' +
        '<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;"></canvas>'
        ).find('svg').toArray();

        var destinationCanvas = document.getElementById("myCanvas");

        function drawCircleOnToCanvas(canvas) {
            var ctx = canvas.getContext('2d');
            ctx.arc(80, 10, 5, 0, 2 * Math.PI);
            ctx.fill();
        }

        drawCircleOnToCanvas(destinationCanvas); //make sure composeImages won't modify this content

        composeImages(sources, destinationCanvas).then(function() {
            expect(canvasData(destinationCanvas, 80, 10, 1, 1)).toMatchPixelColor([0, 0, 0, 255]);
            expect(destinationCanvas.width).toBe(300);
            expect(destinationCanvas.height).toBe(150);
            expect(canvasData(destinationCanvas, 10, 10, 1, 1)).toMatchPixelColor([0, 0, 0, 0]);
            expect(canvasData(destinationCanvas, 30, 40, 1, 1)).toMatchPixelColor([0, 0, 0, 0]);
            expect(canvasData(destinationCanvas, 50, 70, 1, 1)).toMatchPixelColor([0, 0, 0, 0]);
            expect(canvasData(destinationCanvas, 10, 110, 1, 1)).toMatchPixelColor([0, 0, 0, 0]);
            expect(canvasData(destinationCanvas, 30, 140, 1, 1)).toMatchPixelColor([0, 0, 0, 0]);
            expect(canvasData(destinationCanvas, 50, 170, 1, 1)).toMatchPixelColor([0, 0, 0, 0]);

            done();
        }, null);
    });


    it('should call composeImages on one SVG as a source', function (done) {
        var sources = placeholder.html('<div id="test-container" style="width: 600px;height: 400px">' +
        '<svg id="svgSource" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100" title="svg">' +
            '<circle id="c1" cx="10" cy="10" r="5" style="fill:red"/>' +
            '<circle id="c2" cx="30" cy="40" r="7" style="fill:#00FF00"/>' +
            '<circle id="c3" cx="50" cy="70" r="9" style="fill:blue"/>' +
        '</svg>' +
        '</div>' +
        '<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;"></canvas>'
        ).find('svg').toArray();

        var destinationCanvas = document.getElementById("myCanvas");

        composeImages(sources, destinationCanvas).then(function() {
            expect(destinationCanvas.width).toBe(100);
            expect(destinationCanvas.height).toBe(100);
            expect(canvasData(destinationCanvas, 10, 10, 1, 1)).toMatchPixelColor([255, 0, 0, 255]);
            expect(canvasData(destinationCanvas, 30, 40, 1, 1)).toMatchPixelColor([0, 255, 0, 255]);
            expect(canvasData(destinationCanvas, 50, 70, 1, 1)).toMatchPixelColor([0, 0, 255, 255]);

            done();
        }, null);
    });


    it('should call composeImages on two identical SVGs, one near the other', function (done) {
        var sources = placeholder.html('<div id="test-container" style="width: 600px;height: 400px">' +
        '<svg id="svgSource" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100" title="svg">' +
            '<circle id="c1" cx="10" cy="10" r="5" style="fill:red"/>' +
            '<circle id="c2" cx="30" cy="40" r="7" style="fill:#00FF00"/>' +
            '<circle id="c3" cx="50" cy="70" r="9" style="fill:blue"/>' +
        '</svg>' +
        '<svg id="svgSource2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100" title="svg2">' +
            '<circle id="c1" cx="10" cy="10" r="5" style="fill:red"/>' +
            '<circle id="c2" cx="30" cy="40" r="7" style="fill:#00FF00"/>' +
            '<circle id="c3" cx="50" cy="70" r="9" style="fill:blue"/>' +
        '</svg>' +
        '</div>' +
        '<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;"></canvas>'
        ).find('svg').toArray();

        var destinationCanvas = document.getElementById("myCanvas");

        composeImages(sources, destinationCanvas).then(function() {
            expect(destinationCanvas.width).toBe(200); //204 - //200 + 2 * 2px_spacing
            expect(destinationCanvas.height).toBe(100);
            expect(canvasData(destinationCanvas, 10, 10, 1, 1)).toMatchPixelColor([255, 0, 0, 255]);
            expect(canvasData(destinationCanvas, 30, 40, 1, 1)).toMatchPixelColor([0, 255, 0, 255]);
            expect(canvasData(destinationCanvas, 50, 70, 1, 1)).toMatchPixelColor([0, 0, 255, 255]);
            expect(canvasData(destinationCanvas, 110, 10, 1, 1)).toMatchPixelColor([255, 0, 0, 255]); //110 + 4
            expect(canvasData(destinationCanvas, 130, 40, 1, 1)).toMatchPixelColor([0, 255, 0, 255]); //130 + 4
            expect(canvasData(destinationCanvas, 150, 70, 1, 1)).toMatchPixelColor([0, 0, 255, 255]); //150 + 4

            done();
        }, null);
    });


    it('should call composeImages on two identical SVGs, one after the other', function (done) {
        var sources = placeholder.html('<div id="test-container" style="width: 600px;height: 400px">' +
        '<svg id="svgSource" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100" title="svg">' +
            '<circle id="c1" cx="10" cy="10" r="5" style="fill:#FF0000"/>' +
            '<circle id="c2" cx="30" cy="40" r="7" style="fill:#00FF00"/>' +
            '<circle id="c3" cx="50" cy="70" r="9" style="fill:#0000FF"/>' +
        '</svg>' +
        '<br>' +
        '<svg id="svgSource2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100" title="svg2">' +
            '<circle id="c1" cx="10" cy="10" r="5" style="fill:#FF0000"/>' +
            '<circle id="c2" cx="30" cy="40" r="7" style="fill:#00FF00"/>' +
            '<circle id="c3" cx="50" cy="70" r="9" style="fill:#0000FF"/>' +
        '</svg>' +
        '</div>' +
        '<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;"></canvas>'
        ).find('svg').toArray();

        var destinationCanvas = document.getElementById("myCanvas");

        composeImages(sources, destinationCanvas).then(function() {
            expect(destinationCanvas.width).toBe(100);
            expect(destinationCanvas.height).toBe(200);  //204 - //200 + 2 * 2px_spacing
            expect(canvasData(destinationCanvas, 10, 10, 1, 1)).toMatchPixelColor([255, 0, 0, 255]);
            expect(canvasData(destinationCanvas, 30, 40, 1, 1)).toMatchPixelColor([0, 255, 0, 255]);
            expect(canvasData(destinationCanvas, 50, 70, 1, 1)).toMatchPixelColor([0, 0, 255, 255]);
            expect(canvasData(destinationCanvas, 10, 110, 1, 1)).toMatchPixelColor([255, 0, 0, 255]); //110 + 4
            expect(canvasData(destinationCanvas, 30, 140, 1, 1)).toMatchPixelColor([0, 255, 0, 255]); //140 + 4
            expect(canvasData(destinationCanvas, 50, 170, 1, 1)).toMatchPixelColor([0, 0, 255, 255]); //170 + 4

            done();
        }, null);
    });

    it('should call composeImages on three identical SVGs, placed in an L-shape', function (done) {
        var sources = placeholder.html('<div id="test-container" style="width: 600px;height: 400px">' +
        '<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;"></canvas>'
        ).find('svg').toArray();

        var destinationCanvas = document.getElementById("myCanvas");

        composeImages(sources, destinationCanvas).then(function() {
            expect(destinationCanvas.width).toBe(200);  //204 - //200 + 2 * 2px_spacing
            expect(destinationCanvas.height).toBe(200);  //204 - //200 + 2 * 2px_spacing
            expect(canvasData(destinationCanvas, 10, 10, 1, 1)).toMatchPixelColor([255, 0, 0, 255]);
            expect(canvasData(destinationCanvas, 30, 40, 1, 1)).toMatchPixelColor([0, 255, 0, 255]);
            expect(canvasData(destinationCanvas, 50, 70, 1, 1)).toMatchPixelColor([0, 0, 255, 255]);
            expect(canvasData(destinationCanvas, 110, 10, 1, 1)).toMatchPixelColor([255, 0, 0, 255]); //110 + 4
            expect(canvasData(destinationCanvas, 130, 40, 1, 1)).toMatchPixelColor([0, 255, 0, 255]); //130 + 4
            expect(canvasData(destinationCanvas, 150, 70, 1, 1)).toMatchPixelColor([0, 0, 255, 255]); //150 + 4
            expect(canvasData(destinationCanvas, 10, 110, 1, 1)).toMatchPixelColor([255, 0, 0, 255]); //110 + 4
            expect(canvasData(destinationCanvas, 30, 140, 1, 1)).toMatchPixelColor([0, 255, 0, 255]); //140 + 4
            expect(canvasData(destinationCanvas, 50, 170, 1, 1)).toMatchPixelColor([0, 0, 255, 255]); //170 + 4

            done();
        }, null);
    });



















































    








            