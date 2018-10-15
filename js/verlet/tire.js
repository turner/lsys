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
import Vec2 from "./vec2d.js";

class Tire {

    constructor (simulation, origin, radius, segments, spokeStiffness, treadStiffness) {

        let composite = new Composite();

        // particles
        const stride = (2.0 * Math.PI)/segments;

        for (let i of [...Array(segments).keys()]) {
            const theta = i * stride;
            composite.particles.push(new Particle(new Vec2(origin.x + Math.cos(theta)*radius, origin.y + Math.sin(theta)*radius)));
        }

        let center = new Particle(origin);
        composite.particles.push(center);

        // constraints
        for (let i of [...Array(segments).keys()]) {
            composite.constraints.push(new DistanceConstraint(composite.particles[ i ], composite.particles[(i + 1) % segments], treadStiffness));
            composite.constraints.push(new DistanceConstraint(composite.particles[ i ], center, spokeStiffness));
            composite.constraints.push(new DistanceConstraint(composite.particles[ i ], composite.particles[(i + 5) % segments], treadStiffness));
        }

        this.composite = composite;

        simulation.composites.push(this.composite);
    }

}

export default Tire;