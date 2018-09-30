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

import Stack from './stack.js';

import { degreesToRadians } from './math.js';

let describeState = ({ x, y, alpha }) => {
    let string;
    string = Math.round(x) + ' ' + Math.round(y);
    return string;

};

let descripePrettyLine = (x0, y0, x1, y1) => {

    return 'from ' + Math.round(x0) + ' '+ Math.round(y0) + ' to ' + Math.round(x1) + ' '+ Math.round(y1);
};

// SVG line command
// <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

class Interpreter {

    constructor(renderer) {

        let self = this;

        this.stack = new Stack();

        this.commands = {

            'F': (state, deltaXY) => {

                let result = Interpreter.translate(state, deltaXY);

                renderer.drawLine(state.x, state.y, result.x, result.y);

                return result;
            },

            'Fr': (state, deltaXY) => {

                let result = Interpreter.translate(state, deltaXY);

                renderer.drawLine(state.x, state.y, result.x, result.y);

                return result;
            },

            'Fl': (state, deltaXY) => {

                let result = Interpreter.translate(state, deltaXY);

                renderer.drawLine(state.x, state.y, result.x, result.y);

                return result;
            },

            'f': (state, deltaXY) => {
                return Interpreter.translate(state, deltaXY);
            },

            '+': (state, deltaAlpha) => {
                return Interpreter.rotate(state, -deltaAlpha);
            },

            '-': (state, deltaAlpha) => {
                return Interpreter.rotate(state, deltaAlpha);
            },

            '[': (state, ignore) => {

                self.stack.push({ ...state });

                return state;
            },

            ']': (ignore_0, ignore_1) => {

                self.stack.pop();

                return self.stack.top();
            }

        };

        this.tokens = new Set(Object.keys(this.commands));

    }

    interpretString ({ turtle, string, delta, alpha }) {
        let self = this;

        // do all state manipulation via the stack
        self.stack.push({ ...turtle.state });

        for (let token of string) {
            self.stack.assignTop( self.interpret({ state: self.stack.top(), command: token, delta: ('F' === token ? delta : alpha) }) );
        }

    }

    interpret({ state, command, delta }) {

        if (this.tokens.has(command)) {
            let f = this.commands[ command ];
            return f(state, delta);
        } else {
            return state;
        }
    }

    static translate(state, deltaXY) {
        let newState;

        newState =
            {
                x: state.x + deltaXY * Math.cos( degreesToRadians(state.alpha) ),
                y: state.y + deltaXY * Math.sin( degreesToRadians(state.alpha) ),
                alpha: state.alpha
            };

        return newState;
    }

    static rotate(state, deltaAlpha){
        let newState;
        newState =
            {
                x: state.x,
                y: state.y,
                alpha: state.alpha + deltaAlpha,
            };

        return newState;
    }

}

export default Interpreter;
