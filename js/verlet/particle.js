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

import Vec2 from './vec2d.js';

class Particle {

    constructor (vec2) {
        this._pos = (new Vec2()).mutableSet(vec2);
        this._lastPos = (new Vec2()).mutableSet(vec2);
    }

    get pos() {
        return this._pos;
    }

    set pos(value) {
        this._pos = value;
    }

    get lastPos() {
        return this._lastPos;
    }

    set lastPos(value) {
        this._lastPos = value;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 2, 0, 2*Math.PI);
        ctx.fillStyle = "#2dad8f";
        ctx.fill();
    }
}

export default Particle;