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

import { degreesToRadians } from './math.js';

const commands = new Set([ 'F', 'f', '+', '-' ]);

const interpreter =
    {

        translate: (state, deltaXY) => {
            let newState,
                radians;

            radians = degreesToRadians(state.alpha);
            newState =
                {
                    x: state.x + deltaXY * Math.cos( radians ),
                    y: state.y + deltaXY * Math.sin( radians ),
                    alpha: state.alpha
                };

            return newState;
        },

        rotate: (state, deltaAlpha) => {
            let newState;
            newState =
                {
                    x: state.x,
                    y: state.y,
                    alpha: state.alpha + deltaAlpha,
                };

            return newState;
        },

        'F': (state, deltaXY) => {
            return interpreter.translate(state, deltaXY);
        },

        'f': (state, deltaXY) => {
            return interpreter.translate(state, deltaXY);
        },

        '+': (state, deltaAlpha) => {
            return interpreter.rotate(state, deltaAlpha);
        },

        '-': (state, deltaAlpha) => {
            return interpreter.rotate(state, -deltaAlpha);
        }

    };

export function interpret({ state, command, delta }) {
    return commands.has(command) ? interpreter[ command ](state, delta) : state;
}
