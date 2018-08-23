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

'use strict';

var app = (function(app) {

    const commands = new Set([ 'F', 'f', '+', '-' ]);

    const interpreter =
        {

            translate: (state, deltaXY) => {
                let newState,
                    radians;

                radians = app.math.degreesToRadians(state.alpha);
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

    app.Turtle = function (config) {

        this.state =
            {
                // position
                x: config.x,
                y: config.y,

                // heading
                alpha:config.alpha,
            };

    };

    app.Turtle.prototype.interpret = function(config) {

        if (commands.has(config.command)) {
            let str;

            str = config.command + ' ';

            this.state = interpreter[ config.command ](this.state, config.delta);

            if ('F' === config.command) {
                this.description(('draw line segment ' + str));
            } else {
                this.description(str);
            }
        }
    };

    app.Turtle.prototype.description = function (blurb = '') {
        let string;
        string = blurb + 'x ' + Math.round(this.state.x) + ' y ' + Math.round(this.state.y) + ' alpha ' + this.state.alpha;
        console.log( string );
    };

    return app;
})(app || {});
