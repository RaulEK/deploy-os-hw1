import React from 'react';
import {FCFS, SRTF, RR4, TwoLevelFCFS} from './Algorithms';

const algorithms = {
    fcfs: FCFS,
    srtf: SRTF,
    rr4: RR4,
    tlfcfs: TwoLevelFCFS
};

const Result = (props) => {
    const SpecificAlgorithm = algorithms[props.algorithm];
    const values = props.values;
    return (
        <SpecificAlgorithm values={values}/>

    )
};

export default Result;