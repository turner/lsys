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
import Interpreter from './interpreter.js'
import Renderer from './renderer.js';

export let main = ($container, { angle, axiom, productions }) => {

    let renderer = new Renderer($container);

    let generator = new Generator(productions);

    let interpreter = new Interpreter(renderer);

    let turtle = new Turtle({ x: 0, y: 0, alpha: -90 });

    // 8 generations
    let result = Array.from(new Array(6), (x, i) => i)
        .reduce((accumulator) => {
            const acc = generator.rewrite(accumulator);
            describeStringGeneration(acc);
            return acc;
        }, axiom);

    // remove [+X] or [-X]
    const match = '\\[' + '[-+]X' + '\\]';
    const regex = new RegExp(match, 'g');

    result.string = result.string.replace(regex, '');

    interpreter.interpretString({ turtle: turtle, string: result.string, delta: (0.9 * renderer.canvas_dimension) / Math.pow(2, (1 + result.generation)), alpha: angle });

};

let  describeStringGeneration = ({ string, generation }) => {
    console.log('generation ' + generation + ' ' + string);
};
