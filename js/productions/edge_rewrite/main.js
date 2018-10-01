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

import Turtle from '../../turtle.js';
import Generator from '../../generator.js';
import Interpreter from '../../interpreter.js'
import Renderer from '../../renderer.js';

export let main = ($container, { angle, axiom, productions }) => {

    let renderer = new Renderer($container);

    let ping,
        pong;

    let generator = new Generator(productions);

    let interpreter = new Interpreter(renderer);

    let turtle = new Turtle({ x: 0, y: 0, alpha: -90 });

    describeStringGeneration(axiom);

    ping = generator.edgeRewrite(axiom);
    describeStringGeneration(ping);

    pong = generator.edgeRewrite(ping);
    describeStringGeneration(pong);

    ping = generator.edgeRewrite(pong);
    describeStringGeneration(ping);

    pong = generator.edgeRewrite(ping);
    describeStringGeneration(pong);

    pong = generator.edgeRewrite(ping);
    describeStringGeneration(pong);

    ping = generator.edgeRewrite(pong);
    describeStringGeneration(ping);

    pong = generator.edgeRewrite(ping);
    describeStringGeneration(pong);

    // interpreter.interpretString({ turtle: turtle, string: axiom.string, delta: renderer.canvas_dimension/4, alpha: angle });
    // interpreter.interpretString({ turtle: turtle, string: ping.string, delta: renderer.canvas_dimension/8, alpha: angle });
    interpreter.interpretString({ turtle: turtle, string: pong.string, delta: renderer.canvas_dimension/200, alpha: angle });

};

let  describeStringGeneration = ({ string, generation }) => {

    // let draw_calls = string.split(/[^A-Za-z]/).join('');

    console.log('generation ' + generation + ' ' + string);

};
