import React from 'react';
import Visualize from "./Visualize";

function inputSeparator(values) {
    values = values.split(/,|;/);
    let startTimes = [];
    let execTimes = [];

    for (let i = 0; i < values.length; i++) {
        if (i % 2 === 0) {
            startTimes.push(values[i])
        } else {
            execTimes.push(values[i])
        }
    }
    return [startTimes, execTimes];
}


const FCFS = (props) => {

    const input = inputSeparator(props.values);
    const startTimes = input[0];
    const execTimes = input[1];
    let averageWaitTime = 0;

    let jobIndexes = [];

    for (let i = 0; i < startTimes.length; i++) {
        jobIndexes.push(i + 1);
    }

    return (
        <div>
            <Visualize startTimes={startTimes} execTimes={execTimes} jobIndexes={jobIndexes}/>
        </div>
    )
};

const SJF = (props) => {

    const input = inputSeparator(props.values);
    const startTimes = input[0];
    const execTimes = input[1];

    let finalStarts = [];
    let finalExecs = [];
    let jobIndexes = [];
    let averageWaitTime = 0;

    let time = 0;
    let execution = 0;
    let smallestJob = 0;

    const arraySum = (arr) => arr.reduce((a, b) => a + b, 0);

    while (arraySum(execTimes) !== 0) {

        for (let i = 0; i < startTimes.length; i++) {
            if (startTimes[i] <= time && (execTimes[i] < execTimes[smallestJob] || execTimes[smallestJob] === 0) && execTimes[i] > 0) {
                if (execution !== 0) {
                    averageWaitTime += (time - execution);
                    finalStarts.push(time - execution);
                    finalExecs.push(execution);
                    jobIndexes.push(smallestJob + 1);

                }
                smallestJob = i;
                execution = 0;

            }
        }
        if (execTimes[smallestJob] > 0 && startTimes[smallestJob] <= time) {
            execTimes[smallestJob] = execTimes[smallestJob] - 1;
            execution++;
        } else if (execTimes[smallestJob] === 0 && execution > 0) {
            averageWaitTime += (time - execution);
            finalStarts.push(time - execution);
            finalExecs.push(execution);
            jobIndexes.push(smallestJob + 1);
            execution = 0;
        }

        time++;
    }

    if (execution > 0) {
        averageWaitTime += (time - execution);
        finalStarts.push(time - execution);
        finalExecs.push(execution);
        jobIndexes.push(smallestJob + 1);
    }

    return (
        <div>
            <p>Keskmine ooteaeg: {averageWaitTime/jobIndexes.length}</p>
            <Visualize startTimes={finalStarts} execTimes={finalExecs} jobIndexes={jobIndexes}/>
        </div>
    )
};

export {
    FCFS,
    SJF
};