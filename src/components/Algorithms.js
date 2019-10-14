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
    let workedJobs = [];

    while (arraySum(execTimes) !== 0) {

        // need to add queue for preference.
        for (let i = 0; i < startTimes.length; i++) {
            if (startTimes[i] <= time && execTimes[i] > 0 && !workedJobs.includes(i)) {
                currentJob = i;
                if (execution !== 0) {
                    finalStarts.push(time - execution);
                    finalExecs.push(execution);
                    jobIndexes.push(workedJobs[0] + 1);
                    execution = 0;
                }
                break;
            } else {
                currentJob = null;
            }
        }
        if (currentJob !== null) {
            while (execTimes[currentJob] > 0 && execution < 2) {
                execTimes[currentJob] = execTimes[currentJob] - 1;
                execution++;
                time++;
            }

            finalStarts.push(time - execution);
            finalExecs.push(execution);
            jobIndexes.push(currentJob + 1);
            execution = 0;
            if (execTimes[currentJob] > 0) {
                workedJobs.push(currentJob);
            }
        } else if (workedJobs.length > 0) {
            console.log(workedJobs, jobIndexes);
            currentJob = workedJobs[0];
            execTimes[currentJob] = execTimes[currentJob] - 1;
            execution++;
            time++;

            if (execTimes[currentJob] === 0) {
                finalStarts.push(time - execution);
                finalExecs.push(execution);
                jobIndexes.push(workedJobs.shift() + 1);
                execution = 0;
            } else if (execution === 2) {
                finalStarts.push(time - execution);
                finalExecs.push(execution);
                jobIndexes.push(workedJobs.shift() + 1);
                execution = 0;
                workedJobs.push(currentJob);
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
    let smallJob = null;
    let bigJob = null;

    while (arraySum(execTimes) !== 0) {

        for (let i = 0; i < startTimes.length; i++) {
            console.log(smallJob, bigJob, execTimes, time);
            if (startTimes[i] <= time && execTimes[i] > 0 && execTimes[i] < 6) {

                if (execution !== 0 && i !== bigJob) {
                    finalStarts.push(time - execution);
                    finalExecs.push(execution);
                    jobIndexes.push(bigJob + 1);
                    execution = 0;
                }
                smallJob = i;
                break;
            } else if (startTimes[i] <= time && execTimes[i] > 5 && bigJob === null) {
                bigJob = i;
                execution = 0;
            }
        }

        if (smallJob !== null) {
            while (0 < execTimes[smallJob]) {
                execTimes[smallJob] = execTimes[smallJob] - 1;
                execution++;
                time++;
            }
            finalStarts.push(time - execution);
            finalExecs.push(execution);
            jobIndexes.push(smallJob + 1);
            execution = 0;
            smallJob = null;
        } else if (bigJob !== null) {
            execTimes[bigJob] = execTimes[bigJob] - 1;
            execution++;
            time++;
            if (execTimes[bigJob] === 0) {
                finalStarts.push(time - execution);
                finalExecs.push(execution);
                jobIndexes.push(bigJob + 1);
                execution = 0;
                bigJob = null;
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