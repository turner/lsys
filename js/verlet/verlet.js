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
        this.ctx = this.canvas.getContext("2d");

        this.canvas.style.width  = (this.width + 'px');
        this.canvas.style.height = (this.height + 'px');

        const dpr = window.devicePixelRatio || 1;
        this.canvas.width  = dpr * this.width;
        this.canvas.height = dpr * this.height ;

        this.ctx.scale(dpr, dpr);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

    cloth(origin, width, height, segments, pinMod, stiffness) {

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

        this.composites.push(composite);

        return composite;
    }

    nearestEntity() {

        let d2Nearest = 0;
        let entity = null;
        let nearestConstraints = null;
        for (let composite of this.composites) {

            for (let particle of composite.particles) {

                let d2 = particle.pos.dist2(this.mouse);

                let selectedRadius2 = this.selectionRadius * this.selectionRadius;

                if (d2 <= selectedRadius2 && (entity === null || d2 < d2Nearest)) {
                    entity = particle;
                    nearestConstraints = composite.constraints;
                    d2Nearest = d2;
                }
            }
        }

        // search for pinned constraints for this entity
        if (nearestConstraints) {

            for (let nearestConstraint of nearestConstraints) {

                if (nearestConstraint instanceof PinConstraint) {

                    if (entity === nearestConstraint.a) {
                        entity = nearestConstraint
                    }

                }

            }

        }

        return entity;
    }

    frame(step) {

        for (let composite of this.composites) {

            for (let particle of composite.particles) {

                // calculate velocity
                let velocity = particle.pos.sub(particle.lastPos).scale(this.friction);

                // ground friction
                if (particle.pos.y >= this.height-1 && velocity.length2() > 0.000001) {

                    const m = velocity.length();

                    velocity.x /= m;
                    velocity.y /= m;
                    velocity.mutableScale(m*this.groundFriction);
                }

                // save last good state
                particle.lastPos.mutableSet(particle.pos);

                // gravity
                particle.pos.mutableAdd(this.gravity);

                // inertia
                particle.pos.mutableAdd(velocity);
            }

        }

        // handle dragging of entities
        if (this.draggedEntity) {
            this.draggedEntity.pos.mutableSet(this.mouse);
        }

        // relax
        const stepCoef = 1/step;
        for (let composite of this.composites) {
            for (let i of [...Array(step).keys()]) {
                for (let constraint of composite.constraints) {
                    constraint.relax(stepCoef);
                }
            }
        }

        // bounds checking
        for (let composite of this.composites) {
            for (let particle of composite.particles) {
                bounds(particle.pos, this.width, this.height);
            }
        }
    }

    draw() {

        // clear to transparent black
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let composite of this.composites) {

            // draw constraints
            if (composite.drawConstraints) {
                composite.drawConstraints(this.ctx, composite);
            } else {
                for (let constraint of composite.constraints) {
                    constraint.draw(this.ctx);
                }
            }

            // draw particles
            if (composite.drawParticles) {
                composite.drawParticles(this.ctx, composite);
            } else {
                for (let particle of composite.particles) {
                    particle.draw(this.ctx);
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
    pos.x = Math.min(Math.max(pos.x, 0),  width - 1);
    pos.y = Math.min(Math.max(pos.y, 0), height - 1);
}

export default Verlet;
