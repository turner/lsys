class Renderer {
    constructor($container) {

        let svg = SVG($container.get(0));

        let svg_dimension = $container.width();
        svg.size(svg_dimension, svg_dimension);

        let root_group = svg.group();

        let margin = 0.05;
        root_group.transform({ x:margin * svg_dimension, y:margin * svg_dimension });

        this.canvas_dimension = 0.9 * $container.width();

        let canvas = svg.rect(this.canvas_dimension, this.canvas_dimension);
        root_group.add(canvas);

        canvas.attr( { fill:'white' } );

        let drawing_origin_group = svg.group();
        root_group.add(drawing_origin_group);

        // drawing_origin_group.transform({ x:this.canvas_dimension/2, y:(this.canvas_dimension-radius) });
        drawing_origin_group.transform({ x:this.canvas_dimension/2, y:this.canvas_dimension/2 });

        // svg.circle(diameter)
        let origin = svg.circle();
        drawing_origin_group.add(origin);

        let radius = 8;
        origin.radius(radius);

        origin.attr( { fill:'gainsboro', 'stroke':'dimgray', 'stroke-width':1 });

        let line_width = 4;
        let line = svg.line(0, 0, this.canvas_dimension/4, -this.canvas_dimension/3);
        line.stroke({ 'color':'red', 'width':line_width, 'linecap':'round' });
        drawing_origin_group.add(line);

    }

    drawingDimension () {
        return this.canvas_dimension / 32.0;
    }

}

export default Renderer;