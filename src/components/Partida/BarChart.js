import React from 'react';
import {
    select,
    scaleBand,
    scaleLinear,
} from 'd3';

// hoc that wraps a component inside another component with lifecycle
// events
function Responsive(Component) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = { width: 1880, height: 1100 };
            this.resize = this.resize.bind(this);
        }

        componentDidMount() {
            window.addEventListener('resize', this.resize);
            this.resize();
        }

        resize() {
            const node = this.node;
            const bounds = node.getBoundingClientRect();
            const width = bounds.width;
            const height = bounds.height;
            this.setState({ width, height });
        }

        componentWillMount() {
            window.removeEventListener('resize', this.resize);
        }

        render() {
            const { width, height } = this.state;
            const { props } = this;
            return (
                <div
                    style={{ width: '100%', height: '100%' }}
                    ref={node => this.node = node}
                >
                    {
                        width && <Component
                            width={width}
                            height={height}
                            {...props}
                        />
                    }
                </div>
            );
        }
    }
}

class BarChart extends React.Component {
    constructor() {
        super();
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.draw();
    }

    draw() {
        const node = select(this.node);
        const {
            width: w,
            height: h,
            partida,
            maxVal,
        } = this.props;

        const arreglo = partida.puntajes.map((puntaje, index) => {
            var rObj = {};
            rObj["id"] = index;
            rObj["puntaje"] = puntaje;
            return rObj;
        });

        const xscale = scaleBand();
        xscale.domain(arreglo.map(d => d.id));
        xscale.padding(0.2);
        xscale.range([0, w]);



        //console.log(arreglo);

        const yscale = scaleLinear();
        yscale.domain([0, 100]);
        yscale.range([0, h]);
        const upd = node.selectAll('rect').data(arreglo);

        var myColor = scaleLinear().domain([1, 100])
            .range(["orange", "green"])
        //console.log(myColor);
        upd.enter()
            .append('rect')
            .merge(upd)
            .attr('x', d => xscale(d.id))
            .attr('y', d => h - yscale(d.puntaje / maxVal))
            .attr('width', xscale.bandwidth())
            .attr('height', d => yscale(d.puntaje))
            .attr('fill', function (d) { return myColor(d.puntaje / maxVal) });
    }

    componentDidUpdate() {
        this.draw();
    }


    render() {
        //make svg stretch fully in width and height of parent node
        return (
            <svg
                style={{ width: '100%', height: '100%' }}
                ref={node => {
                    this.node = node;
                }}
            >
            </svg>
        );
    }
}

export default Responsive(BarChart);