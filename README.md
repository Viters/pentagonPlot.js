# pentagonPlot.js
Lets you create plots in shape of pentagon.

### Usage
Create pentagonPlot object providing a canvas id from your HTML file:
```js
myPlot = new pentagonPlot('pentagonPlot');
```
Then invoke drawPlot() method on created object, providing list of values of plot and labels:
```js
myPlot.drawPlot([100, 90, 80, 70, 80], ['Typescript', 'Laravel', 'AJAX', 'Python', 'Haskell']);
```
