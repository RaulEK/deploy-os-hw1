import React from 'react';
import Visualize from "./Visualize";

function inputSeparator(values) {
    values = values.split(/,|;/);
    let startTimes = [];
    let execTimes = [];

    for (let i = 0; i < values.length; i++) {
        if (i % 2 === 0) {
            startTimes.push(parseInt(values[i]))
        } else {
            execTimes.push(parseInt(values[i]))
        }
    }
    return [startTimes, execTimes];
}

const arraySum = (arr) => arr.reduce((a, b) => a + b, 0);

const FCFS = (props) => {

    const input = inputSeparator(props.values);
    const startTimes = input[0];
    const execTimes = input[1];
    let averageWaitTime = 0;
    let serviceTime = 0;


    let jobIndexes = [];

    // averagewaittime doesnt consider red rectangles, empty work should be added to servicetime
    for (let i = 0; i < startTimes.length; i++) {
        if (serviceTime > startTimes[i]) {
            averageWaitTime += serviceTime - startTimes[i];
        }
        serviceTime += execTimes[i];

        jobIndexes.push(i + 1);

    }

    return (
        <Visualize startTimes={startTimes} execTimes={execTimes} jobIndexes={jobIndexes}
                   averageWaitTime={averageWaitTime / startTimes.length}/>
    )
};

const SRTF = (props) => {

    const input = inputSeparator(props.values);
    const startTimes = input[0];
    const execTimes = input[1];

    let finalStarts = [];
    let finalExecs = [];
    let jobIndexes = [];
    let averageWaitTime = 0;

    let time = 0;
    let execution = 0;
    let currentJob = 0;

    averageWaitTime -= arraySum(execTimes) + arraySum(startTimes);

    while (arraySum(execTimes) !== 0) {

        for (let i = 0; i < startTimes.length; i++) {

            if (startTimes[i] <= time && (execTimes[i] < execTimes[currentJob] || execTimes[currentJob] === 0) && execTimes[i] > 0) {
                if (execution !== 0) {
                    finalStarts.push(time - execution);
                    finalExecs.push(execution);
                    jobIndexes.push(currentJob + 1);
                    execution = 0;

                }
                currentJob = i;
            }
        }
        if (execTimes[currentJob] > 0 && startTimes[currentJob] <= time) {
            execTimes[currentJob] = execTimes[currentJob] - 1;
            execution++;
        }
        if (execTimes[currentJob] === 0 && execution > 0) {
            finalStarts.push(time - execution + 1);
            finalExecs.push(execution);
            jobIndexes.push(currentJob + 1);
            execution = 0;
            averageWaitTime += time + 1;
        }

        time++;
    }

    return (
        <Visualize startTimes={finalStarts} execTimes={finalExecs} jobIndexes={jobIndexes}
                   averageWaitTime={averageWaitTime / startTimes.length}/>
    )
};

const RR4 = (props) => {

    const input = inputSeparator(props.values);
    const startTimes = input[0];
    const execTimes = input[1];

    let finalStarts = [];
    let finalExecs = [];
    let jobIndexes = [];
    let averageWaitTime = 0;

    let time = 0;
    let execution = 0;
    let currentJob = null;


    while (arraySum(execTimes) !== 0) {

        let anotherRound = true;

        // need to add queue for preference.
        for (let i = currentJob === null ? 0 : currentJob; i < startTimes.length; i++) {
            if (startTimes[i] <= time && execTimes[i] > 0 && i !== currentJob) {
                currentJob = i;
                break;
            }
            if (i === startTimes.length - 1 && anotherRound) {
                i = -1;
                anotherRound = false;
            }
        }
        if (execTimes[currentJob] > 0 && startTimes[currentJob] <= time) {

            while (execTimes[currentJob] > 0 && execution < 2) {
                execTimes[currentJob] = execTimes[currentJob] - 1;
                execution++;
                time++;

            }

            finalStarts.push(time - execution);
            finalExecs.push(execution);
            jobIndexes.push(currentJob + 1);
            execution = 0;

        } else {
            time++;
        }
    }

    return (
        <Visualize startTimes={finalStarts} execTimes={finalExecs} jobIndexes={jobIndexes}
                   averageWaitTime={averageWaitTime / startTimes.length}/>
    )
};

const TwoLevelFCFS = (props) => {

    const input = inputSeparator(props.values);
    const startTimes = input[0];
    const execTimes = input[1];

    let finalStarts = [];
    let finalExecs = [];
    let jobIndexes = [];
    let averageWaitTime = 0;

    let time = 0;
    let execution = 0;
    let currentJob = null;

    while (arraySum(execTimes) !== 0) {
        for (let i = 0; i < startTimes.length; i++) {
            if (startTimes[i] <= time && execTimes[i] > 0 && execTimes[i] < 6 && i !== currentJob) {

                if (execution !== 0) {
                    finalStarts.push(time - execution);
                    finalExecs.push(execution);
                    jobIndexes.push(currentJob + 1);
                    execution = 0;
                }
                currentJob = i;
                break;
            } else if (startTimes[i] <= time && execTimes[i] > 0 && i !== currentJob) {
                currentJob = i;
                execution = 0;
            }
        }

        if (execTimes[currentJob] > 0 && startTimes[currentJob] <= time) {

            while (1 < execTimes[currentJob] && execTimes[currentJob] < 6) {
                execTimes[currentJob] = execTimes[currentJob] - 1;
                execution++;
                time++;
            }

            execTimes[currentJob] = execTimes[currentJob] - 1;
            execution++;
            time++;

            if (execTimes[currentJob] === 0) {
                finalStarts.push(time - execution);
                finalExecs.push(execution);
                jobIndexes.push(currentJob + 1);
                execution = 0;

            }

        } else {
            time++;
        }
    }

    return (
        <Visualize startTimes={finalStarts} execTimes={finalExecs} jobIndexes={jobIndexes}
                   averageWaitTime={averageWaitTime / startTimes.length}/>
    )
};

export {
    FCFS,
    SRTF,
    RR4,
    TwoLevelFCFS

};