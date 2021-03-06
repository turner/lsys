import Stack from "./stack.js";

class Renderer {
    constructor($container) {

        this.svg = SVG($container.get(0));
        this.svg.attr('id', 'svg_container');

        let svg_dimension = $container.width();
        this.svg.size(svg_dimension, svg_dimension);

        let root_group = this.svg.group();
        root_group.attr('id', 'root_group');

        // const margin = 0.05;
        const margin = 0;
        root_group.transform({ x:margin * svg_dimension, y:margin * svg_dimension });


        // this.canvas_dimension = 0.9 * $container.width();
        this.canvas_dimension = $container.width();

        let canvas = this.svg.rect(this.canvas_dimension, this.canvas_dimension);
        root_group.add(canvas);

        canvas.attr( { fill:'white' } );

        this.origin_group = this.svg.group();
        root_group.add(this.origin_group);
        this.origin_group.attr('id', 'origin_group');

        // const xy = { x:0, y:0 };
        // const xy = { x:this.canvas_dimension * .0625, y:this.canvas_dimension * (1.0 - .0625) };
        const xy = { x:this.canvas_dimension * .5, y:this.canvas_dimension * (1.0 - .0625) };
        // const xy = { x:this.canvas_dimension * .5, y:this.canvas_dimension * .5 };

        // this.origin_group.transform({ x:0, y:0 });
        // this.origin_group.transform({ x:this.canvas_dimension * .0625, y:this.canvas_dimension * (1.0 - .0625) });
        this.origin_group.transform(xy);
        // this.origin_group.transform({ x:this.canvas_dimension * .5, y:this.canvas_dimension * .5 });


        // svg.circle(diameter)
        let origin = this.svg.circle();
        this.origin_group.add(origin);
        origin.attr('id', 'origin');

        let radius = 8;
        origin.radius(radius);

        origin.attr( { fill:'rgba(128, 128, 128, 0.25)', 'stroke':'dimgray', 'stroke-width':1 });

        // we will stack groups to keep track of the hierarchy
        this.groupStack = new Stack();
        this.groupStack.push({ x: 0, y: 0, group: this.origin_group });

    }

    pushGroupWithTranslation(x, y) {

        // get the stack top group
        let top = this.groupStack.top();

        // create a new group
        let group = this.svg.group();

        // position the new group relative to the stack top group
        const dx = x - top.x;
        const dy = y - top.y;
        group.transform({ x: dx, y: dy });

        const str = 'joint_%' + Math.round(dx) + '%' + Math.round(dy) + '%stack_' + this.groupStack.stack.indexOf(top);
        group.attr('id', str);

        // add the new group as a child of the stack top group
        top.group.add(group);

        this.decorateStackGroupItem(group);

        this.groupStack.push({ x: x, y: y, group: group });
        // console.log('renderer push(' + Math.round(this.groupStack.top().x) + ', ' + Math.round(this.groupStack.top().y) + ')');

    }

    decorateStackGroupItem (group) {

        let dot = this.svg.circle();
        group.add(dot);

        const radius = 8;
        dot.radius(radius);

        dot.attr( { fill:'rgba(0, 128, 0, 0.25)', 'stroke':'rgba(32, 32, 32, 0.75)', 'stroke-width':1 });

    }

    popGroup() {
        let top = this.groupStack.pop();
        // console.log('renderer pop(' + Math.round(top.x) + ', ' + Math.round(top.y) + ')');
    }


    drawLine (xStart, yStart, xEnd, yEnd) {

        let top = this.groupStack.top();
        // console.log('top(' + Math.round(top.x) + ', ' + Math.round(top.y) + ')');

        const a = xStart - top.x;
        const b = yStart - top.y;
        const c = xEnd - top.x;
        const d = yEnd - top.y;
        let line = this.svg.line(a, b, c, d);

        const line_width = 1;
        line.stroke({ color: 'red', width: line_width, linecap: 'round' });

        top.group.add(line);

        // console.log('draw line(' + Math.round(a) + ', ' + Math.round(b) + ', '  + Math.round(c) + ', ' + Math.round(d) + ')');
     }

    drawingDimension () {
        return this.canvas_dimension / 10.0;
    }

}

export default Renderer;