import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inactiveCardStyle, activeCardStyle } from './cardStyles';

import {
    updateLifeCycle,
    updateLifeMatrix,
    updateFileIndex,
    updateTopology,
    updateNewCard,
    updateRowCol,
    resetGrid,
    startPause,
    handleCellClick,
    handleGridChange,
    getCoordinates,
    adjustRate,
    adjustCellSize,
    selectLifeMatrix,
    selectRows,
    selectCols,
    selectFileIndex,
    selectOnOff,
    selectLifeCycle,
    selectTopology,
    selectRate,
    selectNewCard,
    selectCellSize,

} from './lifeSlice';
import styles from './Life.module.css';
import { fileNames } from "./conwayFilesNames";



function Cell(props) {
    let cellSize = useSelector(selectCellSize);
    const dispatch = useDispatch();
    return (
        <div
            id={props.row + '-' + props.col}
            style={(props.life
                ? {
                    backgroundColor: 'rgb(23, 162, 43)',
                    width: cellSize,
                    height: cellSize,
                    boxSizing: 'border-box',
                    border: '1px solid white',
                    position: 'relative',
                    float: 'left',
                }
                : {
                    backgroundColor: 'rgba(179, 179, 179,.4)',
                    width: cellSize,
                    height: cellSize,
                    boxSizing: 'border-box',
                    border: '1px solid white',
                    position: 'relative',
                    float: 'left',
                })}
            onClick={() => dispatch(handleCellClick(
                { row: Number(props.row), col: Number(props.col), life: Number(props.life) }
            ))}
        >
        </div>
    );
}
function Grid(props) {
    const dispatch = useDispatch();
    let cell = [];
    let rows = useSelector(selectRows);
    let cols = useSelector(selectCols);
    let cellSize = useSelector(selectCellSize);

    let lifeMatrix = useSelector(selectLifeMatrix);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            cell.push(
                <Cell
                    key={j + " " + i}
                    row={j}
                    col={i}
                    life={lifeMatrix[j][i]}
                />
            );
        }
    }
    return <div
        onChange={() => dispatch(handleGridChange())}
        id={styles.innerField}
        style={{
            position: 'relative',
            top: 0,
            left: 0,
            marginTop: 10,
            width: cellSize * cols,
            height: cellSize * rows,
            float: 'left',
        }}
    >
        {cell}
    </div>
}

export function Life() {
    const fileIndex = useSelector(selectFileIndex);
    const onOff = useSelector(selectOnOff);
    const lifeCycle = useSelector(selectLifeCycle);
    const topology = useSelector(selectTopology);
    const rate = useSelector(selectRate);
    const cellSize = useSelector(selectCellSize);
    const newCard = useSelector(selectNewCard);
    const row = useSelector(selectRows);
    const col = useSelector(selectCols);
    const dispatch = useDispatch();
    const [changeFileIndex, setFileIndex] = useState(fileIndex);
    const [changeRow, setRow] = useState(col);
    const [changeCol, setCol] = useState(row);
    let tmp;
    let scrollToCard;
    
    function setCardScroll(id) {
        scrollToCard = document.getElementById("card" + id);
        scrollToCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    function setGridtoCenter(id) {
        let temRow = row / 2;
        let temCol = col / 2;
        scrollToCard = document.getElementById(temRow + "-" + temCol);
        scrollToCard.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }

    function handleSetFileIndexDec(newIndex) {
        if (newIndex > 0) {
            tmp = Number(newIndex) - 1;
            setFileIndex(tmp);
            dispatch(getCoordinates(tmp));
            dispatch(updateFileIndex(tmp));
            setCardScroll(tmp);
            setGridtoCenter();
        } else {
            setFileIndex(0);
            dispatch(getCoordinates(0));
            dispatch(updateFileIndex(0));
            setCardScroll(0);
            setGridtoCenter();
        }
    }
    function handleSetFileIndexInc(newIndex) {
        if (newIndex < 689) {
            tmp = Number(newIndex) + 1;
            setFileIndex(tmp);
            dispatch(getCoordinates(tmp));
            dispatch(updateFileIndex(tmp));
            setCardScroll(tmp);
            setGridtoCenter();
        } else {
            setFileIndex(689);
            dispatch(getCoordinates(689));
            dispatch(updateFileIndex(689));
            setCardScroll(689);
            setGridtoCenter();
        }
    }

    useEffect(() => {
        if (newCard) {
            setFileIndex(fileIndex);
            dispatch(updateNewCard());
            setCardScroll(fileIndex);
            setGridtoCenter();
        }
    }, [newCard, fileIndex, dispatch, setCardScroll, setGridtoCenter]);
    useEffect(() => {
        let timerID = setInterval(
            () => {
                tick();
            },
            rate
        );
        return function cleanup() {
            clearInterval(timerID);
        };
    });
    function tick() {
        if (onOff) {
            dispatch(updateLifeMatrix());
            dispatch(updateLifeCycle());
        }
    };

    return (
        <div id={styles.wrapper}>
            <div id={styles.topMenu}>
                <div className={styles.topMenuInfo}>PATTERN: {((fileNames[fileIndex]).split('_')[0]).toUpperCase()}</div>
                <div className={styles.topMenuInfo}>TOPOLOGY: {
                    (topology === 0)
                        ? "HEDGE"
                        : ((topology === 1)
                            ? "TORUS" : "KLEIN")
                }
                </div>
                <div className={styles.topMenuInfo}>LIFE CYCLE: {lifeCycle}</div>
            </div>
            <div id={styles.lowerWrapper}>

                <div className={styles.interface}>
                    <div className={styles.mainControls}>
                        <button
                            className={styles.startStopButton}
                            onClick={() => dispatch(startPause())}
                            style={
                                onOff
                                    ? { color: 'rgb(114, 114, 114)' }
                                    : { color: 'rgb(23, 162, 43)' }}
                        >
                            {
                                onOff
                                    ? <i className="fa-solid fa-2x fa-pause"></i>
                                    : <i className="fa-solid fa-2x fa-play"></i>
                            }
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => {
                                dispatch(resetGrid());
                                setCardScroll(fileIndex);
                                setGridtoCenter();
                            }}
                        >
                            RESET
                        </button>
                    </div>
                    <div className={styles.basicForm}>
                        <label>LIFE-CYCLE DELAY</label>
                        <div className={styles.slider}>
                            <input
                                max='2'
                                min='0'
                                onChange={(e) => dispatch(adjustRate(e.target.value))}
                                step='0.001'
                                type='range'
                                value={rate / 1000}
                            />
                        </div>
                    </div>
                    <div className={styles.basicForm}>
                        <label>GRID SIZE</label> 
                        <div className={styles.rowColInputs}>
                            <input
                                type='text'
                                className={styles.controlInput}
                                value={changeRow}
                                aria-label="Input rows"
                                id={styles.rowInput}
                                onChange={(e) => setRow(e.target.value)}
                            ></input>
                            X
                            <input
                                type='text'
                                className={styles.controlInput}
                                aria-label="Input columns"
                                value={changeCol}
                                id={styles.colInput}
                                onChange={(e) => setCol(e.target.value)}
                            ></input>
                            <button
                            className={styles.buttonRowCol}
                            aria-label="submit rows and columns"
                            onClick={() => {
                                dispatch(updateRowCol({ row: changeRow, col: changeCol }));
                            }}
                        >
                            SUBMIT
                        </button>
                        </div>
                    </div>
                    <div className={styles.basicForm}>
                        <label>CELL SIZE</label>
                        <div className={styles.slider}>
                            <input
                                max='30'
                                min='0'
                                onChange={(e) => dispatch(adjustCellSize(e.target.value))}
                                step='2'
                                type='range'
                                value={cellSize}
                            />
                        </div>
                    </div>
                    <div className={styles.topoForm}>
                        <label>EDGE TOPOLOGY</label>
                        <select name="topology" id={styles.topologySelect} onChange={(e) => dispatch(updateTopology(e.target.value))}>
                            <option value={1}> Select the Edge Type</option>
                            <option value={0}>Hedge</option>
                            <option selected value={1}>Torus</option>
                            <option value={2}>Klein</option>
                        </select>
                    </div>
                </div>
                <div id={styles.gridWrapper}>
                    <Grid />
                </div>
                <div className={styles.interface}>

                    <div id={styles.fileForm}>
                        <div className={styles.contolHeader}>FILE NUMBER</div>
                        <div id={styles.incDecButtonsWrapper}>
                            <button
                                className={styles.buttonIncr}
                                aria-label="Decrement file"
                                onClick={() => {
                                    dispatch(resetGrid());
                                    handleSetFileIndexDec(fileIndex);
                                }}
                            >
                                -
                            </button>
                            <input
                                type='text'
                                className={styles.controlInput}
                                value={changeFileIndex}
                                onChange={(e) => (setFileIndex((e.target.value)))}
                            >
                            </input>
                            <button
                                className={styles.buttonIncr}
                                aria-label="Increment file"
                                onClick={() => {
                                    dispatch(resetGrid());
                                    handleSetFileIndexInc(fileIndex);
                                }}
                            >
                                +
                            </button>

                        </div>
                        <button
                            className={styles.button}
                            onClick={() => {
                                dispatch(resetGrid());
                                dispatch(getCoordinates(changeFileIndex));
                                dispatch(updateFileIndex(changeFileIndex));
                                setCardScroll(changeFileIndex);
                                setGridtoCenter();
                            }}
                        >
                            SUBMIT
                        </button>
                    </div>
                    <div id={styles.fileSelector}>
                        <div className={styles.filesDisplayForm}>
                            <label>FILES</label>
                            <Cards fileIndex={fileIndex} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.mobileInterface}>
                <button
                    className={styles.startStopButton}
                    onClick={() => dispatch(startPause())}
                    style={
                        onOff
                            ? { color: 'rgb(114, 114, 114)' }
                            : { color: 'rgb(23, 162, 43)' }}
                >
                    {
                        onOff
                            ? <i className="fa-solid fa-2x fa-pause"></i>
                            : <i className="fa-solid fa-2x fa-play"></i>
                    }
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(resetGrid());
                        setCardScroll(fileIndex);
                        setGridtoCenter();
                    }}
                >
                    RESET
                </button>
                <div className={styles.basicForm}>
                    <label>LIFE-CYCLE DELAY</label>
                    <div className={styles.slider}>
                        <input
                            max='2'
                            min='0'
                            onChange={(e) => dispatch(adjustRate(e.target.value))}
                            step='0.001'
                            type='range'
                            value={rate / 1000}
                        />
                    </div>
                </div>
                <div className={styles.topoForm}>
                    <label>EDGE TOPOLOGY</label>
                    <select name="topology" id={styles.topologySelect} onChange={(e) => dispatch(updateTopology(e.target.value))}>
                        <option value={1}> Select the Edge Type</option>
                        <option value={0}>Hedge</option>
                        <option selected value={1}>Torus</option>
                        <option value={2}>Klein</option>
                    </select>
                    <div className={styles.rowColContol}>
                        <div className={styles.rowColInputs}>
                            ROWS:
                            <input
                                type='text'
                                className={styles.controlInput}
                                value={changeRow}
                                aria-label="Input rows"
                                id={styles.rowInput}
                                onChange={(e) => setRow(e.target.value)}
                            ></input>
                            COLS:
                            <input
                                type='text'
                                className={styles.controlInput}
                                aria-label="Input columns"
                                value={changeCol}
                                id={styles.colInput}
                                onChange={(e) => setCol(e.target.value)}
                            ></input>
                        </div>
                        <button
                            className={styles.button}
                            aria-label="submit rows and columns"
                            onClick={() => {
                                dispatch(updateRowCol({ row: changeRow, col: changeCol }));
                            }}
                        >
                            SUBMIT
                        </button>
                    </div>
                    <label>CELL SIZE</label>
                    <div className={styles.slider}>
                        <input
                            max='30'
                            min='0'
                            onChange={(e) => dispatch(adjustCellSize(e.target.value))}
                            step='2'
                            type='range'
                            value={cellSize}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.mobileInterface}>

                <div id={styles.fileForm}>
                    <div className={styles.contolHeader}>FILE NUMBER</div>
                    <div id={styles.incDecButtonsWrapper}>
                        <button
                            className={styles.buttonIncr}
                            aria-label="Decrement file"
                            onClick={() => {
                                dispatch(resetGrid());
                                handleSetFileIndexDec(fileIndex);
                            }}
                        >
                            -
                        </button>
                        <input
                            type='text'
                            className={styles.controlInput}
                            value={changeFileIndex}
                            onChange={(e) => (setFileIndex((e.target.value)))}
                        >
                        </input>
                        <button
                            className={styles.buttonIncr}
                            aria-label="Increment file"
                            onClick={() => {
                                dispatch(resetGrid());
                                handleSetFileIndexInc(fileIndex);
                            }}
                        >
                            +
                        </button>

                    </div>
                    <button
                        className={styles.button}
                        onClick={() => {
                            dispatch(resetGrid());
                            dispatch(getCoordinates(changeFileIndex));
                            dispatch(updateFileIndex(changeFileIndex));
                            setCardScroll(changeFileIndex);
                            setGridtoCenter();
                        }}
                    >
                        SUBMIT
                    </button>
                </div>
                <div id={styles.fileSelector}>
                    <div className={styles.filesDisplayForm}>
                        <label>FILES</label>
                        <Cards fileIndex={fileIndex} />
                    </div>
                </div>
            </div>

        </div >
    );
}

function Cards(props) {
    const dispatch = useDispatch();
    let list = [];
    for (let i = 0; i < fileNames.length; i++) {
        list.push(
            <div
                key={i}
                id={'card' + i}
                className={styles.fileCard}
                style={(props.fileIndex === i) ? activeCardStyle : inactiveCardStyle}
                onClick={() => {
                    dispatch(resetGrid());
                    dispatch(getCoordinates(i));
                    dispatch(updateFileIndex(i));
                    dispatch(updateNewCard());
                }}
            >
                {((fileNames[i]).split('_')[0]).toUpperCase() + ' (index: ' + i + ")"}
            </div>
        );
    }
    return <div
        id={styles.cardsWrapper}
    >
        {list}

    </div>
}


// function PreviewSquares(props) {
//     const dispatch = useDispatch();
//     let cell = [];
//     // const lifeMatrix = useSelector(selectLifeMatrix);
//     for (let j = 0; j < fileNames.length; j++) {
//             cell.push(
//                 <PreviewGrids
//                     key={"square-" + j}
//                     index={j}
//                 />
//             );
//     }
//     return <div
//         // onChange={() => dispatch(handleGridChange())}
//         className={styles.square}
//         style={{
//             marginTop: 10,
//             width: 30,
//             height: 30,
//             float: 'left',
//         }}
//     >
//         {cell}
//     </div>
// }
// function PreviewGrids(props) {
//     // const dispatch = useDispatch();
//     let rows = useSelector(selectMicroRows);
//     let cols = useSelector(selectMicroCols);
//     let cell = [];
//     const currentMatrix = getCoordinates(props.index);
//     for (let j = 0; j < rows; j++) {
//         for (let i = 0; i < cols; i++) {
//             cell.push(
//                 <MicoCell
//                     key={props.fileName + " " + j + " " + i}
//                     row={j}
//                     col={i}
//                     life={currentMatrix[j][i]}
//                 />
//             );
//         }
//     }
//     return <div
//         // onChange={() => dispatch(handleGridChange())}
//         className={styles.microField}
//         style={{
//             marginTop: 10,
//             width: 30,
//             height: 30,
//             float: 'left',
//         }}
//     >
//         {cell}
//     </div>
// }
// function MicoCell(props) {
//     // const [padStyle, setPadStyle] = useState(deadStyle);
//     const dispatch = useDispatch();
//     return (
//         <div className={styles.padButtonContiner} >
//             <div
//                 // onClick={dispatch(dispatch)}
//                 id={props.id}
//                 style={props.life ? microAliveStyle : microDeadStyle}
//                 onClick={() => dispatch(
//                     // handleCellClick(
//                     //     { row: props.row, col: props.col, life: props.life }
//                     // )
//                     )}
//             >
//                 {props.keyTrigger}
//             </div>
//         </div>
//     );
// }