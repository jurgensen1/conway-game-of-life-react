import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fileNames } from './conwayFilesNames';
import {
    minX,
    minY,
    maxX,
    maxY,
    initMatrix,
    coordToCenter,
    torusLifeDeath,
    hedgeLifeDeath,
    kleinLifeDeath,

} from './utilityFunctions';


const initialState = {
    text: 0,
    coordinates: [],
    microCoordinates: [],
    lifeMatrix: initMatrix(30, 30),
    rows: 30,
    cols: 30,
    cellSize: 20,
    microRows: 30,
    microCols: 30,
    fileIndex: 643,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    onOff: false,
    lifeCycle: 0,
    topology: 1,
    rate: 1000,
    newCard: false,
    status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getCoordinates = createAsyncThunk(
    'posts/getMiroCo',
    async (e) => {
        const res = await fetch('./conwaylife/' + fileNames[Number(e)]).then(
            (data) => data.text()
        )
        return res
    });

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        updateLifeCycle: (state) => {
            state.lifeCycle += 1;
        },
        updateLifeMatrix: (state) => {
            // Apply life cycle logic
            let matrixB = initMatrix(state.rows, state.cols);
            switch (state.topology) {
                case 0:
                    state.lifeMatrix = hedgeLifeDeath(state.lifeMatrix, matrixB, state.rows, state.cols);
                    break;
                case 1:
                    state.lifeMatrix = torusLifeDeath(state.lifeMatrix, matrixB, state.rows, state.cols);
                    break;
                case 2:
                    state.lifeMatrix = kleinLifeDeath(state.lifeMatrix, matrixB, state.rows, state.cols);
                    break;
                default:
                    break;
            }
        },
        adjustRate: (state, action) => {
            state.rate = action.payload * 1000;
        },
        adjustCellSize: (state, action) => {
            state.cellSize = Number(action.payload);
        },
        updateRowCol: (state, action) => {
            let tmpRow;
            let tmpCol;
            if (Number(action.payload.row) < 1) {
                tmpRow = 1;
            } else if (Number(action.payload.row) > 100) {
                tmpRow = 100;
            } else {
                tmpRow = Number(action.payload.row);
            }

            if (Number(action.payload.col) < 1) {
                tmpCol = 1;
            } else if (Number(action.payload.col) > 100) {
                tmpCol = 100;
            } else {
                tmpCol = Number(action.payload.col);
            }
            state.rows = tmpRow;
            state.cols = tmpCol;
            state.lifeMatrix = initMatrix(tmpRow, tmpCol);
        },
        updateFileIndex: (state, action) => {
            if (Number(action.payload) <= 0) {
                state.fileIndex = 0;
            } else if (Number(action.payload) >= 689) {
                state.fileIndex = 689;
            } else {
                state.fileIndex = Number(action.payload);
            }
        },
        updateTopology: (state, action) => {
            console.log(action.payload);
            state.topology = Number(action.payload);
        },
        startPause: (state) => {
            state.onOff = !state.onOff;
        },
        resetGrid: (state) => {
            state.lifeMatrix = initMatrix(state.rows, state.cols);
            state.lifeCycle = 0;
            state.onOff = false;
        },
        handleCellClick: (state, action) => {
            console.log(action.payload);
            // console.log(state.lifeMatrix[action.payload.row][action.payload.col]);
            if (action.payload.life) {
                state.lifeMatrix[action.payload.row].splice(action.payload.col, 1, 0);
            } else {
                state.lifeMatrix[action.payload.row].splice(action.payload.col, 1, 1);
            }
        },
        handleGridChange: (state) => {
            state.value += 1;
        },
        updateNewCard: (state) => {
            state.newCard = !state.newCard;
        },
        increment: (state) => {
            console.log('increment: ' + state.fileIndex);
            if (state.fileIndex < 689) {
                state.fileIndex += 1;
            }
        },
        decrement: (state) => {
            console.log('decrement: ' + state.fileIndex);
            if (Number(state.fileIndex) > 0) {
                state.fileIndex -= 0;
            }
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCoordinates.pending, (state) => {
                state.status = 'loading';
                console.log('action.payload: loading');
            })
            .addCase(getCoordinates.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.text = action.payload;
                state.coordinates = (action.payload.split('\n'));
                state.coordinates.shift();
                state.coordinates.pop();
                // console.log((state.coordinates[1]));
                // console.log(state.coordinates.length);
                // console.log(state.coordinates);
                let minXC = minX(state.coordinates, state.coordinates.length, 0);
                let minYC = minY(state.coordinates, state.coordinates.length, 1);
                // console.log(minXC);
                // console.log(minYC);
                let maxXC = maxX(state.coordinates, state.coordinates.length, 0);
                let maxYC = maxY(state.coordinates, state.coordinates.length, 1);
                // console.log(maxXC);
                // console.log(maxYC);
                state.coordinates = coordToCenter(
                    state.coordinates,
                    maxXC,
                    minXC,
                    maxYC,
                    minYC,
                    state.cols,
                    state.rows,
                    state.coordinates.length
                );

                for (let i = 0; i < state.coordinates.length; i++) {
                    if (state.coordinates[i][0] < state.rows && state.coordinates[i][0] < state.cols) {
                        state.lifeMatrix[state.coordinates[i][0]].splice(state.coordinates[i][1], 1, 1);
                    }
                    // state.lifeMatrix[state.coordinates[i][0]].splice(state.coordinates[i][1], 1, 1);
                }
            })
        // for Mico Viewer
        // .addCase(microGetCoordinates.pending, (state) => {
        //     // state.status = 'loading';
        //     console.log('action.payload: loading');
        // })
        // .addCase(microGetCoordinates.fulfilled, (state, action) => {
        // state.status = 'idle';
        // state.text = action.payload;
        // state.microCoordinates = (action.payload.split('\n'));
        // state.microCoordinates.shift();
        // state.microCoordinates.pop();
        // console.log((state.microCoordinates[1]));
        // console.log(state.microCoordinates.length);
        // console.log(state.microCoordinates);
        // let minXC = minX(state.microCoordinates, state.microCoordinates.length, 0);
        // let minYC = minY(state.microCoordinates, state.microCoordinates.length, 1);
        // // console.log(minXC);
        // // console.log(minYC);
        // let maxXC = maxX(state.microCoordinates, state.microCoordinates.length, 0);
        // let maxYC = maxY(state.microCoordinates, state.microCoordinates.length, 1);
        // console.log(maxXC);
        // console.log(maxYC);
        // state.microCoordinates = coordToCenter(
        //     state.microCoordinates,
        //     maxXC,
        //     minXC,
        //     maxYC,
        //     minYC,
        //     state.microCols,
        //     state.microRows,
        //     state.microCoordinates.length
        // );
        // for (let i = 0; i < state.microCoordinates.length; i++) {
        //     state.lifeMatrix[state.microCoordinates[i][0]].splice(state.microCoordinates[i][1], 1, 1);
        // }
        // });
    },
});

export const {
    updateLifeCycle,
    updateLifeMatrix,
    updateFileIndex,
    updateTopology,
    updateNewCard,
    startPause,
    resetGrid,
    updateCell,
    handleCellClick,
    handleGridChange,
    increment,
    decrement,
    incrementByAmount,
    adjustRate,
    updateRowCol,
    adjustCellSize
} = lifeSlice.actions;


export const selectText = (state) => state.life.text;
export const selectLifeMatrix = (state) => state.life.lifeMatrix;
export const selectRows = (state) => state.life.rows;
export const selectCols = (state) => state.life.cols;
export const selectFileIndex = (state) => state.life.fileIndex;
export const selectOnOff = (state) => state.life.onOff;
export const selectLifeCycle = (state) => state.life.lifeCycle;
export const selectTopology = (state) => state.life.topology;
export const selectRate = (state) => state.life.rate;
export const selectCellSize = (state) => state.life.cellSize;
export const selectMicroRows = (state) => state.life.microRows;
export const selectMicroCols = (state) => state.life.microCols;
export const selectNewCard = (state) => state.life.newCard;
export default lifeSlice.reducer;
