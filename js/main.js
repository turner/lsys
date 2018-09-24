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

export let main = ($container, { axiom, productions }) => {

    let ping,
        pong;

    let generator = new Generator(productions);

    let interpreter = new Interpreter();

    let turtle = new Turtle({ x: 0, y: 0, alpha: -90 });

    // describeStringGeneration(axiom);
    // interpreter.interpretString({ turtle: turtle, string: axiom.string, delta: 4, alpha: 90 });

    ping = generator.rewrite(axiom);

    describeStringGeneration(ping);
    interpreter.interpretString({ turtle: turtle, string: ping.string, delta: 4, alpha: 90 });


    let svg = SVG($container.get(0)).size('100%', '100%');

    let root_group = svg.group().transform({ x:32, y:32 });
    let root = svg.rect(736, 736).attr( { fill:'yellow' } );
    root_group.add(root);

    let radius = 8;
    let origin_group = svg.group().transform({ x:368, y:(736-radius) });
    let origin = svg.circle(2 * radius).attr( { fill:'red', 'stroke':"grey", 'stroke-width':2 });

    origin_group.add(origin);
    root_group.add(origin_group);

};

let  describeStringGeneration = ({ string, generation }) => {

    let draw_calls = string.split(/[^A-Za-z]/).join('');

    console.log('generation ' + generation + ' ' + string + ' draw calls ' + draw_calls.length);

};
