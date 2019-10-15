import React from 'react';

class Visualize extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startTimes: props.startTimes,
            execTimes: props.execTimes,
            jobIndexes: props.jobIndexes,
            averageWaitTime: props.averageWaitTime,
            algorithm: props.algorithm,
            input: props.input
        };
    }


    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        let distance = 0;

        ctx.font = '16px Comic Sans Mr';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'bottom';
        ctx.fillText(distance / 30, distance, 120);

        for (let i = 0; i < this.state.startTimes.length; i++) {

            if (this.state.startTimes[i] > distance / 30) { // Punaste ristküliku joonistamine, kui ootel ühtegi programmi ei ole.

                // Ristküliku joonistamine
                ctx.beginPath();
                ctx.rect(distance, 0, this.state.startTimes[i] * 30 - distance, 100);
                distance = this.state.startTimes[i] * 30;
                ctx.stroke();
                ctx.fillStyle = 'red';
                ctx.fill();

                // Alla ajaväärtuste kirjutamine
                ctx.font = '16px Comic Sans Mr';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'bottom';
                ctx.fillText(distance / 30, distance, 120);

                // Mustade joonte joonistamine ristkülikute ümber
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'black';
                ctx.stroke();

            }

            // Programmi ristküliku joonistamine
            ctx.beginPath();
            ctx.rect(distance, 0, this.state.execTimes[i] * 30, 100);
            distance += this.state.execTimes[i] * 30;
            ctx.stroke();
            ctx.fillStyle = 'green';
            ctx.fill();

            // Protsessi tähise kirjutamine ristküliku sisse
            ctx.font = '18px Comic Sans Mr';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText('P' + (this.state.jobIndexes[i]), distance - this.state.execTimes[i] * 15, 50);

            // Alla ajaväärtuste kirjutamine
            ctx.font = '16px Comic Sans Mr';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'bottom';
            ctx.fillText(distance / 30, distance, 120);

            // Mustade joonte joonistamine ristkülikute ümber
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.stroke();

        }
    }

    render() {
        return (
            <div>
                <p>{this.state.algorithm} keskmine ooteag sisendil
                    [{this.state.input}]: <strong>{this.state.averageWaitTime}</strong></p>
                <canvas ref="canvas" width={2000} height={120}></canvas>
            </div>
        )
    };
}


export default Visualize;