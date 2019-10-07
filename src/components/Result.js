import React from 'react';
import {FCFS, SJF} from './Algorithms';

const algorithms = {
    fcfs: FCFS,
    sjf: SJF
};

const Result = (props) => {
    const SpecificAlgorithm = algorithms[props.algorithm];
    const values = props.values;
    return (
        <SpecificAlgorithm values={values}/>

    )
};

export default Result;