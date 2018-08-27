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

import { interpret } from './interpreter.js';

class Turtle {

    constructor({ x, y, alpha }) {

        this.state =
            {
                // position
                x: x,
                y: y,

                // heading
                alpha:alpha
            };

    }

    interpret ({ command, delta }) {
        let str;

        this.state = interpret({ state: this.state, command: command, delta: delta });

        str = command + ' ' + this.describe();

        if ('F' === command) {
            console.log((str + ' draw line segment'));
        } else {
            console.log(str);
        }

    }

    describe() {
        let string;
        string = 'x ' + Math.round(this.state['x']) + ' y ' + Math.round(this.state['y']) + ' alpha ' + this.state['alpha'];
        return string;
    }

}

export default Turtle;
