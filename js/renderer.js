class Renderer {
    constructor($container) {

        this.svg = SVG($container.get(0));

        let svg_dimension = $container.width();
        this.svg.size(svg_dimension, svg_dimension);

        let root_group = this.svg.group();

        let margin = 0.05;
        root_group.transform({ x:margin * svg_dimension, y:margin * svg_dimension });

        this.canvas_dimension = 0.9 * $container.width();

        let canvas = this.svg.rect(this.canvas_dimension, this.canvas_dimension);
        root_group.add(canvas);

        canvas.attr( { fill:'white' } );

        let drawing_origin_group = this.svg.group();
        root_group.add(drawing_origin_group);

        // drawing_origin_group.transform({ x:this.canvas_dimension/2, y:(this.canvas_dimension-radius) });
        drawing_origin_group.transform({ x:this.canvas_dimension/2, y:this.canvas_dimension/2 });

        // svg.circle(diameter)
        let origin = this.svg.circle();
        drawing_origin_group.add(origin);

        let radius = 8;
        origin.radius(radius);

        origin.attr( { fill:'gainsboro', 'stroke':'dimgray', 'stroke-width':1 });

        drawing_origin_group.add(this.drawLine(0, 0, this.canvas_dimension/4, -this.canvas_dimension/3));

    }

    drawLine (xStart, yStart, xEnd, yEnd) {

        const line_width = 4;
        const line = this.svg.line(xStart, yStart, xEnd, yEnd);

        line.stroke({ color:'red', width:line_width, linecap:'round' });

        return line;
     }

    drawingDimension () {
        return this.canvas_dimension / 32.0;
    }

}

export default Renderer;