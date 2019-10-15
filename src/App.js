import React, {useState, useEffect} from 'react';
import './App.css';
import Result from "./components/Result";


const App = () => {
    const [arrays] = useState([
        {id: 1, name: 'Esimene', value: "0,7;1,5;2,3;3,1;4,2;5,1"},
        {id: 2, name: 'Teine', value: "0,2;0,4;12,4;15,5;21,10"},
        {id: 3, name: 'Kolmas', value: "0,4;1,5;2,2;3,1;4,6;6,3"},
        {id: 4, name: 'Enda oma', value: ""}
    ]);
    // for testing
    // 2,3;5,7;6,10;12,4;13,3
    // 0,7;1,6;1,2;3,1;4,6;5,3;27,8;29,3;30,1;30,5;48,3

    const [userArray, setUserArray] = useState('');

    const [choice, setChoice] = useState('0');

    const [render, setRender] = useState(true);

    const [algorithm, setAlgorithm] = useState('fcfs');

    const handleUserArray = (event) => {
        setUserArray(event.target.value.trim().replace(/,{2,}/, ',').replace(/;{2,}/, ';').replace(/[^0-9,;]/, ""));
    };

    const handleChoice = (event) => {
        setChoice(event.target.value);
    };

    const handleButton = (event) => {
        setAlgorithm(event.target.value);
    };

    const start = (event) => {
        event.preventDefault();
        setRender(false);
        arrays[3].value = userArray;
    };

    useEffect(() => {
        setRender(true)
    }, [render]);

    return (
        <div>
            <h3>Vali või sisesta järjend (kujul 1,10;4,2;12,3;13,2).</h3>
            <div>
                <form onSubmit={start}>
                    <div className="radio">

                        <label className='label'>
                            <input type="radio" value={'0'} checked={choice === '0'} onChange={handleChoice}/>
                            {arrays[0].name}
                        </label>

                        {arrays[0].value}

                    </div>

                    <div className="radio">

                        <label className='label'>
                            <input type="radio" value={'1'} checked={choice === '1'} onChange={handleChoice}/>
                            {arrays[1].name}
                        </label>

                        {arrays[1].value}

                    </div>
                    <div className="radio">

                        <label className='label'>
                            <input type="radio" value={'2'} checked={choice === '2'} onChange={handleChoice}/>
                            {arrays[2].name}{}
                        </label>

                        {arrays[2].value}

                    </div>
                    <div className="radio">
                        <label className='label'>
                            <input type="radio" value={'3'} checked={choice === '3'} onChange={handleChoice}/>
                            {arrays[3].name}
                        </label>
                        <input value={userArray} onChange={handleUserArray}/>
                    </div>
                    <h4>Vajuta nupule, et algoritm käivitada.</h4>
                    <div>
                        <button onClick={handleButton} value="fcfs" type="submit">FCFS</button>
                        <button onClick={handleButton} value="srtf" type="submit">SRTF</button>
                        <button onClick={handleButton} value="rr4" type="submit">RR4</button>
                        <button onClick={handleButton} value="tlfcfs" type="submit">2xFCFS</button>
                    </div>
                </form>
            </div>
            <div className="graph">
                {render && <Result values={arrays[parseInt(choice)].value} algorithm={algorithm}/>}
            </div>
        </div>
    );
};

export default App;
