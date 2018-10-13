/*
 *  The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 The Regents of the University of California
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

class Vec2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    
    add () {
        return new Vec2(this.x + v.x, this.y + v.y); 
    }
    
    sub (v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
    
    mul () {
        return new Vec2(this.x * v.x, this.y * v.y);
    }
    
    div (v) {
        return new Vec2(this.x / v.x, this.y / v.y);
    }

    scale(coef) {
        return new Vec2(this.x*coef, this.y*coef);
    }

    mutableSet(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    mutableAdd(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    mutableSub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mutableMul(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    mutableDiv(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    mutableScale(coef) {
        this.x *= coef;
        this.y *= coef;
        return this;
    }

    equals(v) {
        return this.x === v.x && this.y === v.y;
    }

    epsilonEquals(v, epsilon) {
        return Math.abs(this.x - v.x) <= epsilon && Math.abs(this.y - v.y) <= epsilon;
    }

    length(v) {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    length2(v) {
        return this.x*this.x + this.y*this.y;
    }

    dist(v) {
        return Math.sqrt(this.dist2(v));
    }

    dist2(v) {
        const x = v.x - this.x;
        const y = v.y - this.y;
        return x*x + y*y;
    }

    normal() {
        const m = Math.sqrt(this.x*this.x + this.y*this.y);
        return new Vec2(this.x/m, this.y/m);
    }

    dot(v) {
        return this.x*v.x + this.y*v.y;
    }

    angle(v) {
        return Math.atan2(this.x*v.y-this.y*v.x,this.x*v.x+this.y*v.y);
    }

    angle2(vLeft, vRight) {
        return vLeft.sub(this).angle(vRight.sub(this));
    }

    rotate(origin, theta) {
        const x = this.x - origin.x;
        const y = this.y - origin.y;
        return new Vec2(x*Math.cos(theta) - y*Math.sin(theta) + origin.x, x*Math.sin(theta) + y*Math.cos(theta) + origin.y);
    }

    description() {
        return "(" + this.x + ", " + this.y + ")";
    }

}

export default Vec2;