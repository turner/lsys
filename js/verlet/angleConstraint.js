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
class AngleConstraint {

    constructor (a, b, c, stiffness) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.angle = this.b.pos.angle2(this.a.pos, this.c.pos);
        this.stiffness = stiffness;
    }

    relax (stepCoef) {
        let angle = this.b.pos.angle2(this.a.pos, this.c.pos);
        let diff = angle - this.angle;

        if (diff <= -Math.PI)
            diff += 2*Math.PI;
        else if (diff >= Math.PI)
            diff -= 2*Math.PI;

        diff *= stepCoef*this.stiffness;

        this.a.pos = this.a.pos.rotate(this.b.pos, diff);
        this.c.pos = this.c.pos.rotate(this.b.pos, -diff);
        this.b.pos = this.b.pos.rotate(this.a.pos, diff);
        this.b.pos = this.b.pos.rotate(this.c.pos, -diff);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.a.pos.x, this.a.pos.y);
        ctx.lineTo(this.b.pos.x, this.b.pos.y);
        ctx.lineTo(this.c.pos.x, this.c.pos.y);
        let tmp = ctx.lineWidth;
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(255,255,0,0.2)";
        ctx.stroke();
        ctx.lineWidth = tmp;
    }
}

export default AngleConstraint;
