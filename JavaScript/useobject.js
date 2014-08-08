/**
 * Created by farhan on 7/21/14.
 */
var misc = require("./object");

var p = {
    x: 1.0,
    y: 1.0,
    get r(){ return Math.sqrt(this.x * this.x + this.y * this.y)},
    set r(newValue){
        var oldValue = Math.sqrt(this.x * this.x + this.y * this.y);
        var ratio = newValue /oldValue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta(){return Math.atan2(this.y,this.x)}
}
var q = misc.inherit(p);
q.x = 9,q.y = 9;
//console.log(q.r);
//console.log(q.theta);
console.log(Object.getOwnPropertyDescriptor({x:1}, "x"));
