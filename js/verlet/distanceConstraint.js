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
class DistanceConstraint {
    constructor (a, b, stiffness, distance) {
        this.a = a;
        this.b = b;
        this.distance = typeof distance !== "undefined" ? distance : a.pos.sub(b.pos).length();
        this.stiffness = stiffness;
    }

    relax (stepCoef) {
        let normal = this.a.pos.sub(this.b.pos);
        let m = normal.length2();
        normal.mutableScale(((this.distance*this.distance - m)/m)*this.stiffness*stepCoef);
        this.a.pos.mutableAdd(normal);
        this.b.pos.mutableSub(normal);
    }

    draw = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.a.pos.x, this.a.pos.y);
        ctx.lineTo(this.b.pos.x, this.b.pos.y);
        ctx.strokeStyle = "#d8dde2";
        ctx.stroke();
    }
}

export default DistanceConstraint;