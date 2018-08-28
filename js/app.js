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

import Turtle from './turtle.js';
import Generator from './generator.js';

let turtle;
let generator;
export function initialize($container, { axiom, productions, generation }) {

    let ping,
        pong;

    // generate a string
    generator = new Generator(productions);

    describeStringGeneration(axiom);
    ping = generator.rewrite(axiom);

    describeStringGeneration(ping);
    pong = generator.rewrite(ping);

    describeStringGeneration(pong);
    ping = generator.rewrite(pong);

    describeStringGeneration(ping);
    pong = generator.rewrite(ping);

    describeStringGeneration(pong);
    ping = generator.rewrite(pong);

    describeStringGeneration(ping);
    pong = generator.rewrite(ping);

    // create a turtle
    turtle = new Turtle({ x: 4, y: 4, alpha: 45 });

    turtle.interpret({ command: 'f', delta: 8 });
    turtle.interpret({ command: 'F', delta: 4 });

    turtle.interpret({ command: '+', delta: 5 });
    turtle.interpret({ command: '-', delta: 5 });

}

function describeStringGeneration({ string, generation }) {
    console.log('generation ' + generation + ' ' + string);
}
