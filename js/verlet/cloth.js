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

import Composite from "./composite.js";
import Vec2 from "./vec2d.js";
import Particle from "./particle.js";
import DistanceConstraint from "./distanceConstraint.js";
import PinConstraint from './pinConstraint.js';

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

        composite.drawConstraints = makeDrawConstraints(width, height, segments);

        this.composite = composite;

        simulation.composites.push(this.composite);

    }

}

function makeDrawConstraints(width, height, segments) {

    return function(ctx, composite) {

        let particles = composite.particles;
        let constraints = composite.constraints;

        const stride = width/segments;

        for (let y = 1; y < segments; ++y) {

            for (let x = 1; x < segments; ++x) {

                ctx.beginPath();

                const i1 = (y - 1) * segments + x - 1;
                const i2 = (y    ) * segments + x;

                ctx.moveTo(particles[ i1     ].pos.x, particles[ i1     ].pos.y);
                ctx.lineTo(particles[ i1 + 1 ].pos.x, particles[ i1 + 1 ].pos.y);

                ctx.lineTo(particles[ i2     ].pos.x, particles[ i2     ].pos.y);
                ctx.lineTo(particles[ i2 - 1 ].pos.x, particles[ i2 - 1 ].pos.y);

                let off = particles[ i2 ].pos.x - particles[ i1 ].pos.x;
                off += particles[ i2 ].pos.y - particles[ i1 ].pos.y;
                off *= 0.25;

                let coef = Math.round((Math.abs(off)/stride)*255);
                if (coef > 255) {
                    coef = 255;
                }

                ctx.fillStyle = "rgba(" + coef + ",0," + (255 - coef)+ "," + lerp(0.25, 1, coef/255.0)+")";

                ctx.fill();
            }
        }

        for (let constraint of constraints) {

            if (constraint instanceof PinConstraint) {
                ctx.beginPath();
                ctx.arc(constraint.pos.x, constraint.pos.y, 1.2, 0, 2*Math.PI);
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fill();
            }
        }

        function lerp(a, b, p) {
            return (b-a)*p + a;
        }

    }

}


export default Cloth;
