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

import Vec2 from './vec2d.js';
import Composite from './composite.js';
import Particle from './particle.js';
import DistanceConstraint from './distanceConstraint.js';
import PinConstraint from './pinConstraint.js';

class Verlet {

    constructor ($container) {

        this.width = $container.width();
        this.height = $container.height();

        this.$canvas = $('<canvas>');
        $container.append(this.$canvas);

        this.canvas = this.$canvas.get(0);

        this.canvas.style.width = ($container.width() + 'px');
        this.canvas.setAttribute('width', $container.width());

        this.canvas.style.height = ($container.height() + 'px');
        this.canvas.setAttribute('height', $container.height());

        this.ctx = this.canvas.getContext("2d");

        this.ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
        this.ctx.fillRect(0, 0, this.width, this.height);


        this.mouse = new Vec2(0,0);

        this.mouseDown = false;

        this.draggedEntity = null;

        this.selectionRadius = 20;

        this.highlightColor = "#4f545c";

        let _this = this;

        // prevent context menu
        this.canvas.oncontextmenu = function(e) {
            e.preventDefault();
        };

        this.canvas.onmousedown = function(e) {
            _this.mouseDown = true;
            let nearest = _this.nearestEntity();
            if (nearest) {
                _this.draggedEntity = nearest;
            }
        };

        this.canvas.onmouseup = function(e) {
            _this.mouseDown = false;
            _this.draggedEntity = null;
        };

        this.canvas.onmousemove = function(e) {
            const rect = _this.canvas.getBoundingClientRect();
            _this.mouse.x = e.clientX - rect.left;
            _this.mouse.y = e.clientY - rect.top;
        };

        // simulation params
        this.gravity = new Vec2(0,0.2);
        this.friction = 0.99;
        this.groundFriction = 0.8;

        // holds composite entities
        this.composites = [];

    }

    point(pos) {
        let composite = new Composite();
        composite.particles.push(new Particle(pos));
        this.composites.push(composite);
        return composite;
    }

    lineSegments(vertices, stiffness) {

        let composite = new Composite();

        vertices.forEach((vertex, i) => {
            composite.particles.push(new Particle(vertex));
            if (i > 0) {
                composite.constraints.push(new DistanceConstraint(composite.particles[ i ], composite.particles[ i - 1 ], stiffness));
            }

        });

        // for (let i in vertices) {
        //     composite.particles.push(new Particle(vertices[ i ]));
        //     if (i > 0) {
        //         composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[i - 1], stiffness));
        //     }
        // }

        this.composites.push(composite);
        return composite;
    }

    cloth(origin, width, height, segments, pinMod, stiffness) {

        let composite = new Composite();

        let xStride = width/segments;
        let yStride = height/segments;
        for (let y=0;y<segments;++y) {
            for (let x=0;x<segments;++x) {
                let px = origin.x + x*xStride - width/2 + xStride/2;
                let py = origin.y + y*yStride - height/2 + yStride/2;
                composite.particles.push(new Particle(new Vec2(px, py)));

                if (x > 0)
                    composite.constraints.push(new DistanceConstraint(composite.particles[y*segments+x], composite.particles[y*segments+x-1], stiffness));

                if (y > 0)
                    composite.constraints.push(new DistanceConstraint(composite.particles[y*segments+x], composite.particles[(y-1)*segments+x], stiffness));
            }
        }

        for (let x=0;x<segments;++x) {
            if (x % pinMod === 0)
                composite.pin(x);
        }

        this.composites.push(composite);

        return composite;
    }

    tire(origin, radius, segments, spokeStiffness, treadStiffness) {

        let composite = new Composite();

        // particles
        let stride = (2*Math.PI)/segments;
        for (let i=0;i<segments;++i) {
            const theta = i*stride;
            composite.particles.push(new Particle(new Vec2(origin.x + Math.cos(theta)*radius, origin.y + Math.sin(theta)*radius)));
        }

        let center = new Particle(origin);
        composite.particles.push(center);

        // constraints
        for (let i=0;i<segments;++i) {
            composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[(i+1)%segments], treadStiffness));
            composite.constraints.push(new DistanceConstraint(composite.particles[i], center, spokeStiffness));
            composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[(i+5)%segments], treadStiffness));
        }

        this.composites.push(composite);

        return composite;
    }

    nearestEntity() {

        let d2Nearest = 0;
        let entity = null;
        let constraintsNearest = null;
        let c;
        let i;
        for (c in this.composites) {
            let particles = this.composites[c].particles;
            for (i in particles) {
                let d2 = particles[i].pos.dist2(this.mouse);
                let selectedRadius2 = this.selectionRadius * this.selectionRadius;
                if (d2 <= selectedRadius2 && (entity === null || d2 < d2Nearest)) {
                    entity = particles[ i ];
                    constraintsNearest = this.composites[c].constraints;
                    d2Nearest = d2;
                }
            }
        }

        // search for pinned constraints for this entity
        for (i in constraintsNearest) {
            let instance = constraintsNearest[i];
            if (instance instanceof PinConstraint) {
                if (entity === constraintsNearest[i].a) {
                    entity = constraintsNearest[i]
                }
            }
        }

        return entity;
    }

    frame(step) {

        for (let c in this.composites) {
            for (let i in this.composites[c].particles) {

                let particles = this.composites[c].particles;

                // calculate velocity
                let velocity = particles[i].pos.sub(particles[i].lastPos).scale(this.friction);

                // ground friction
                if (particles[i].pos.y >= this.height-1 && velocity.length2() > 0.000001) {

                    const m = velocity.length();

                    velocity.x /= m;
                    velocity.y /= m;
                    velocity.mutableScale(m*this.groundFriction);
                }

                // save last good state
                particles[i].lastPos.mutableSet(particles[i].pos);

                // gravity
                particles[i].pos.mutableAdd(this.gravity);

                // inertia
                particles[i].pos.mutableAdd(velocity);
            }
        }

        // handle dragging of entities
        if (this.draggedEntity) {
            this.draggedEntity.pos.mutableSet(this.mouse);
        }

        // relax
        const stepCoef = 1/step;
        for (let c in this.composites) {

            let constraints = this.composites[ c ].constraints;

            for (let i = 0; i < step; ++i) {
                for (let j in constraints) {
                    constraints[ j ].relax(stepCoef);
                }
            }
        }

        // bounds checking
        for (let c in this.composites) {
            let particles = this.composites[c].particles;
            for (let i in particles) {
                bounds(particles[i].pos, this.width, this.height);
            }
        }
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let c in this.composites) {

            // draw constraints
            if (this.composites[c].drawConstraints) {
                this.composites[c].drawConstraints(this.ctx, this.composites[c]);
            } else {
                let constraints = this.composites[c].constraints;
                for (let i in constraints) {
                    constraints[i].draw(this.ctx);
                }
            }

            // draw particles
            if (this.composites[c].drawParticles) {
                this.composites[c].drawParticles(this.ctx, this.composites[c]);
            } else {
                let particles = this.composites[c].particles;
                for (let i in particles) {
                    particles[i].draw(this.ctx);
                }
            }
        }

        // highlight nearest / dragged entity
        let nearest = this.draggedEntity || this.nearestEntity();

        if (nearest) {
            this.ctx.beginPath();
            this.ctx.arc(nearest.pos.x, nearest.pos.y, 8, 0, 2*Math.PI);
            this.ctx.strokeStyle = this.highlightColor;
            this.ctx.stroke();
        }
    }
}

function bounds(pos, width, height) {
    if (pos.y > height-1)
        pos.y = height-1;

    if (pos.x < 0)
        pos.x = 0;

    if (pos.x > width-1)
        pos.x = width-1;
}

export default Verlet;
