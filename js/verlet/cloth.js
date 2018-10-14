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
import Particle from "./particle.js";
import DistanceConstraint from "./distanceConstraint.js";
import Composite from "./composite.js";
import Vec2 from "./vec2d";

class Cloth {

    constructor (simulation, origin, width, height, segments, pinMod, stiffness) {

        let composite = new Composite();

        const xStride = width/segments;
        const yStride = height/segments;

        for (let y of [...Array(segments).keys()]) {
            for (let x of [...Array(segments).keys()]) {

                let px = origin.x + x*xStride - width/2 + xStride/2;
                let py = origin.y + y*yStride - height/2 + yStride/2;

                composite.particles.push(new Particle(new Vec2(px, py)));

                if (x > 0) {
                    composite.constraints.push(new DistanceConstraint(composite.particles[y * segments + x], composite.particles[y * segments + x - 1], stiffness));
                }

                if (y > 0) {
                    composite.constraints.push(new DistanceConstraint(composite.particles[y * segments + x], composite.particles[(y - 1)*segments + x], stiffness));
                }
            }
        }

        for (let x of [...Array(segments).keys()]) {
            if (x % pinMod === 0) {
                composite.pin(x);
            }
        }

        this.composite = composite;

        simulation.composites.push(this.composite);
    }
}

export default Cloth;
