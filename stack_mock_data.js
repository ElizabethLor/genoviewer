/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var random = function(min, max) {
    return Math.random() * (max - min) + min;
};

var randomData = function(b, a, min, max) {
    var arr = [];
    for (var i = 0; i < a; i++) {
        arr[i] = [];
        for (var j = 0; j < b; j++) {
            arr[i][j] = Math.floor(random(min, max));
        }
    }
    
    return arr;
};

var mockData = {
    data: randomData(24, 5, 100, 10000),
    labels: ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7", "ch8", "ch9",
        "ch10", "ch11", "ch12", "ch13", "ch14", "ch15", "ch16", "ch17", "ch18", "ch19", "ch20", "ch21", "ch22", "chX", "chY"],
    layerLabels: ["NY", "CO", "CA", "WA", "MN"],
    getData: function(a, b) {
        var a1 = this.labels.indexOf(a);
        var b1 = this.labels.indexOf(b);

        var arr = [];
        for (var i = 0; i < 5; i++) {
            arr[i] = [];
            for (var j = 0; j < b1 - a1; j++) {
                arr[i][j] = this.data[i][j];
            }
        }
        
        return arr;

    },
    getStacks: function(arr){
        var d = [];
        for(var i = 0; i < 5; i++){
            d[i] = [];
            for(var j = 0; j < arr.length; j++){
                var it = this.labels.indexOf(arr[j]);
                d[i][j] = this.data[i][it];
            }
        }
        
        return d;
    },
    getLabels: function(a, b) {
        var a1 = this.labels.indexOf(a);
        var b1 = this.labels.indexOf(b);
        return this.labels.slice(a1, b1 + 1);
    },
    getLayerLabels: function(a, b) {
        return this.layerLabels.slice(a, b + 1);
    }
}