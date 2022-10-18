// import React, { useState } from 'react';
// import { copySelection } from '@testing-library/user-event/dist/types/document';
// import { $, jQuery } from 'jquery';

// import { fileNames } from './conwayFilesNames';
 
export function initMatrix(rows, cols){
    let i;
    let j;
    let a = [];
    let b = [];
    for (i = 0; i < rows; i++)
    {
            for (j = 0; j < cols; j++){
                b.push(0);
            } 
            a.push(b);
            b = [];
    }
    console.log(a[0]);
    console.log(a[1]);
    console.log(a[2]);
    console.log(a[3]);
    return a;
}


/** check a matrix for the minimum x value 
 *      matrix is in the form a = [ x, y, x, y];
 * @param data is the matrix to be checked.
 * @param size is the number of (x, y) points.
 * @return the minimum number, an integer.
 */
export function minX(data, size){
            let min = Number((data[0].split(' '))[0]);
            let i;
            let tmp;
            for (i = 0; i < ((size)); i++){
                tmp = Number((data[i].split(' '))[0]);
                    if (min >= tmp){
                            min = tmp;
                    }
            }
        return min;
}
export function minY(data, size){
    let min = Number((data[0].split(' '))[1]);
    let i;
    let tmp;
    for (i = 0; i < ((size)); i++){
        tmp = Number((data[i].split(' '))[1]);
            if (min >= tmp){
                    min = tmp;
            }
    }
    return min;
}
export function maxX(data, size){
    let max = Number((data[0].split(' '))[0]);
    let i;
    let tmp;
    for (i = 0; i < ((size)); i++){
        tmp = Number((data[i].split(' '))[0]);
            if (max <= tmp){
                    max = tmp;
            }
    }
    return max;
}
export function maxY(data, size){
    let max = Number((data[0].split(' '))[1]);
    let i;
    let tmp;
    for (i = 0; i < ((size)); i++){
        tmp = Number((data[i].split(' '))[1]);
            if (max <= tmp){
                    max = tmp;
            }
    }
    return max;
}
export function coordToCenter(data, xMax, xMin, yMax, 
    yMin, col, row, size){
    let i;
    let a = 0;
    let b = [];
    // j = 1 + (v*2);
    for (i = 0; i < size; i++){
       a = ((data[i].split(' ')));
            a[0] = (a[0] - (xMin)) + (((col/(2))) - ((xMax - xMin)/2)-1);
            a[1] = (a[1] - (yMin)) + (((row/(2))) - ((yMax - yMin)/2)-1);
            b.push([(Math.round(a[1] )), Math.round(a[0])]);
    }
    return b;
}

/** Uses matrix A to calculate and write the next generation into matrix B.
 *      Then A is overwritten with B.
 *      The edge of the grid is a hedge: a peristently one cell wide
 *      boarder of dead cells.
 * @param matrixA is the current-gerneration matrix.
 * @param matrixB is the next-gerneration matrix.
 * @param col is the number of columns in matrix A and B.
 * @param row is the number of row in matrix A and B.
 * @return unsigned char ** to the modified matrix A
 */
 export function hedgeLifeDeath(matrixA,
    matrixB, row, col){
    let i;
    let j;
    let live = 0;
    for (i = 1; i < (row-2); i++){        
            for (j = 1; j < (col-2); j++){ 
                    live = 0;
                    if ((i === 1) && (j === 1)){ 
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j+1] === 1) 
                                    ++live;  
                            if (matrixA[i][j+1] === 1) 
                                    ++live; 
                    } else if ((i === (row-2)) && (j === 1)){ 
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j+1] === 1) 
                                    ++live;  
                            if (matrixA[i][j+1] === 1) 
                                    ++live; 
                    } else if ((i === 1) && (j === (col-2))){ 
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j-1] === 1) 
                                    ++live;  
                            if (matrixA[i][j-1] === 1) 
                                    ++live; 
                    } else if ((i === (row-2)) && (j === (col-2))){ 
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j-1] === 1)
                                    ++live;  
                            if (matrixA[i][j-1] === 1) 
                                    ++live; 
                    } else if (i === 1){ 
                            if (matrixA[i][j - 1] === 1)
                                    ++live;
                            if (matrixA[i][j+1] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j-1] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j+1] === 1) 
                                    ++live;
                    } else if (j === (col-2)){ 
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j-1] === 1) 
                                    ++live;
                            if (matrixA[i][j-1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j-1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                    } else if (i === (row-2)){ 
                            if (matrixA[i][j-1] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j-1] === 1) 
                                    ++live;
                            if (matrixA[i-1][j] === 1) 
                                    ++live;
                            if (matrixA[i-1][j+1] === 1) 
                                    ++live;
                            if (matrixA[i][j+1] === 1) 
                                    ++live;
                    } else if (j === 1){ 
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j+1] === 1) 
                                    ++live;
                            if (matrixA[i][j+1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j+1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                    } else { 
                            if (matrixA[i-1][j-1]){ 
                                    ++live; 
                            }
                            if (matrixA[i-1][j+1]){ 
                                    ++live; 
                            }
                            if (matrixA[i-1][j]){ 
                                    ++live; 
                            }
                            if (matrixA[i][j-1]){ 
                                    ++live;
                            }
                            if (matrixA[i][j+1]){ 
                                    ++live; 
                            }
                            if (matrixA[i+1][j+1]){ 
                                    ++live; 
                            }
                            if (matrixA[i+1][j]){ 
                                    ++live; 
                            }
                            if (matrixA[i+1][j-1]){ 
                                    ++live;
                            }
                    }
                    if (matrixA[i][j] === 1){  
                            if (live < 2)
                            {
                                    matrixB[i][j] = 0;  
                            }
                            else if (live > 3)
                            {
                                    matrixB[i][j] = 0;  
                            }
                            else if (live === 3)
                            {
                                    matrixB[i][j] = 1;  
                            }
                            else if (live === 2)
                            {
                                    matrixB[i][j] = 1;  
                            }
                    } else if (matrixA[i][j] === 0){ 
                            if (live === 3)
                            {
                                    matrixB[i][j] = 1;  
                            } else if (live !== 3) {
                                    matrixB[i][j] = 0;  
                            }
                    }
            }
    }
    for (i = 1; i < (row-2); i++)
    {
            for (j = 0; j < (col-2); j++)
            {
                    matrixA[i][j] = matrixB[i][j];
            }
    }
    return matrixA;
}

 export function torusLifeDeath(matrixA, matrixB, row, col){
    // console.log('hello');
    let i = 0;
    let j = 0;
    let live = 0;
    for (i = 0; i < row; i++){ 
        // console.log('top for');      
            for (j = 0; j < col; j++){ 
                // console.log('bottom for');  
                    live = 0;
                    if ((i === 0) && (j === 0)){ 
                    // console.log('if ((i === 0) && (j === 0)');
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j+1] === 1) 
                                    ++live;  
                            if (matrixA[i][j+1] === 1) 
                                    ++live; 
                            if (matrixA[row-1][j+1] === 1) 
                                    ++live; 
                            if (matrixA[row-1][j] === 1) 
                                    ++live; 
                            if (matrixA[row-1][col-1] === 1) 
                                    ++live; 
                            if (matrixA[i][col-1] === 1) 
                                    ++live; 
                            if (matrixA[i+1][col-1] === 1) 
                                    ++live; 
                    } else if ((i === (row-1)) && (j === 0)){ 
                        // console.log('if ((i === (row-1)) && (j === 0)');
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j+1] === 1) 
                                    ++live;  
                            if (matrixA[i][j+1] === 1) 
                                    ++live; 
                            if (matrixA[0][j+1] === 1) 
                                    ++live; 
                            if (matrixA[0][0] === 1)
                                    ++live; 
                            if (matrixA[0][col-1] === 1) 
                                    ++live; 
                            if (matrixA[i][col-1] === 1) 
                                    ++live; 
                            if (matrixA[i][col-1] === 1) 
                                    ++live; 
                    } else if ((i === 0) && (j === (col-1))){ 
                            // console.log('if ((i === 0) && (j === (col-1))');
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j-1] === 1) 
                                    ++live;  
                            if (matrixA[i][j-1] === 1) 
                                    ++live; 
                            if (matrixA[row-1][j-1] === 1) 
                                    ++live; 
                            if (matrixA[row-1][j] === 1) 
                                    ++live; 
                            if (matrixA[row-1][0] === 1) 
                                    ++live; 
                            if (matrixA[0][0] === 1) 
                                    ++live; 
                            if (matrixA[1][0] === 1) 
                                    ++live;
                            
                    } else if ((i === (row-1)) && (j === (col-1))){ 
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j-1] === 1)
                                    ++live;  
                            if (matrixA[i][j-1] === 1) 
                                    ++live; 
                            if (matrixA[0][col-2] === 1) 
                                    ++live; 
                            if (matrixA[0][col-1] === 1) 
                                    ++live; 
                            if (matrixA[0][0] === 1) 
                                    ++live; 
                            if (matrixA[row-1][0] === 1) 
                                    ++live; 
                            if (matrixA[row-2][0] === 1) 
                                    ++live; 
                    } else if (i === 0){ 
                            if (matrixA[row-1][j] === 1)
                                    ++live; 
                            if (matrixA[row-1][j-1] === 1) 
                                    ++live; 
                            if (matrixA[row-1][j+1] === 1) 
                                    ++live; 
                            if (matrixA[i][j - 1] === 1) 
                                    ++live;
                            if (matrixA[i][j+1] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j-1] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                            if (matrixA[i+1][j+1] === 1) 
                                    ++live;
                    } else if (j === (col-1)){ 
                            if (matrixA[i][0] === 1) 
                                    ++live; 
                            if (matrixA[i-1][0] === 1) 
                                    ++live; 
                            if (matrixA[i+1][0] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j-1] === 1) 
                                    ++live;
                            if (matrixA[i][j-1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j-1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 
                    } else if (i === (row-1)){ 
                            if (matrixA[0][j] === 1) 
                                    ++live; 
                            if (matrixA[0][j-1] === 1) 
                                    ++live; 
                            if (matrixA[0][j+1] === 1) 
                                    ++live; 
                            if (matrixA[i][j-1] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j-1] === 1) 
                                    ++live;
                            if (matrixA[i-1][j] === 1) 
                                    ++live;
                            if (matrixA[i-1][j+1] === 1) 
                                    ++live;
                            if (matrixA[i][j+1] === 1) 
                                    ++live;
                    } else if (j === 0){ 
                            if (matrixA[i][col-1] === 1) 
                                    ++live; 
                            if (matrixA[i-1][col-1] === 1) 
                                    ++live; 
                            if (matrixA[i+1][col-1] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j] === 1) 
                                    ++live; 
                            if (matrixA[i-1][j+1] === 1) 
                                    ++live;
                            if (matrixA[i][j+1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j+1] === 1) 
                                    ++live;
                            if (matrixA[i+1][j] === 1) 
                                    ++live; 

                    } else { 
                            if (matrixA[i-1][j-1]){ 
                                    ++live; 
                            }
                            if (matrixA[i-1][j+1]){ 
                                    ++live; 
                            }
                            if (matrixA[i-1][j]){ 
                                    ++live; 
                            }
                            if (matrixA[i][j-1]){ 
                                    ++live;
                            }
                            if (matrixA[i][j+1]){ 
                                    ++live; 
                            }
                            if (matrixA[i+1][j+1]){ 
                                    ++live; 
                            }
                            if (matrixA[i+1][j]){ 
                                    ++live; 
                            }
                            if (matrixA[i+1][j-1]){ 
                                    ++live;
                            }
                    }
                    if (matrixA[i][j] === 1){  
                            if (live < 2)
                            {
                                    matrixB[i][j] = 0;  
                            }
                            else if (live > 3)
                            {
                                    matrixB[i][j] = 0;  
                            }
                            else if (live === 3)
                            {
                                    matrixB[i][j] = 1;  
                            }
                            else if (live === 2)
                            {
                                    matrixB[i][j] = 1;  
                            }
                    } else if (matrixA[i][j] === 0){ 
                            if (live === 3)
                            {
                                    matrixB[i][j] = 1;  
                            } else if (live !== 3) {
                                    matrixB[i][j] = 0;  
                            }
                    }
            }
    }
    for (i = 0; i < row; i++)
    {
            for (j = 0; j < col; j++)
            {
                    matrixA[i][j] = matrixB[i][j];
            }
    }
    return matrixA;
}

/** Uses matrix A to calculate and write the next generation into matrix B.
 *      Then A is overwritten with B.
 *      The edge of the grid is a klein: left and right edge 
 *      are inversely continuous, while the top and bottom 
 *      are directly continuous.
 * @param matrixA is the current-gerneration matrix.
 * @param matrixB is the next-gerneration matrix.
 * @param col is the number of columns in matrix A and B.
 * @param row is the number of row in matrix A and B.
 * @return unsigned char ** to the modified matrix A
 */
export function kleinLifeDeath(matrixA, 
        matrixB, row, col){
        let i;
        let j;
        let live = 0;
        for (i = 0; i < row; i++){        
                for (j = 0; j < col; j++){ 
                        live = 0;
                        if ((i === 0) && (j === 0)){ 
                                if (matrixA[i+1][j] === 1) 
                                        ++live; 
                                if (matrixA[i+1][j+1] === 1) 
                                        ++live;  
                                if (matrixA[i][j+1] === 1) 
                                        ++live; 
                                if (matrixA[row-1][j] === 1) 
                                        ++live; 
                                if (matrixA[row-1][j+1] === 1) 
                                        ++live; 
                                if (matrixA[0][col-1] === 1) 
                                        ++live;
                                if (matrixA[row-1][col-1] === 1) 
                                        ++live;
                                if (matrixA[(row-2)][col-1] === 1) 
                                        ++live;
                        } else if ((i === (row-1)) && (j === 0)){ 
                                if (matrixA[i-1][j] === 1) 
                                        ++live; 
                                if (matrixA[i-1][j+1] === 1)
                                        ++live;  
                                if (matrixA[i][j+1] === 1) 
                                        ++live; 
                                if (matrixA[0][j+1] === 1) 
                                        ++live; 
                                if (matrixA[0][j] === 1) 
                                        ++live; 
                                if (matrixA[row-1][col-1] === 1) 
                                        ++live; 
                                if (matrixA[0][col-1] === 1) 
                                        ++live; 
                                if (matrixA[1][col-1] === 1) 
                                        ++live;
                        } else if ((i === 0) && (j === (col-1))){ 
                                if (matrixA[i+1][j] === 1) 
                                        ++live; 
                                if (matrixA[i+1][j-1] === 1) 
                                        ++live;  
                                if (matrixA[i][j-1] === 1) 
                                        ++live; 
                                if (matrixA[row-1][j-1] === 1) 
                                        ++live; 
                                if (matrixA[row-1][j] === 1)
                                        ++live; 
                                if (matrixA[0][0] === 1) 
                                        ++live;
                                if (matrixA[row-1][0] === 1) 
                                        ++live;
                                if (matrixA[row-2][0] === 1) 
                                        ++live;

                        } else if ((i === (row-1)) && (j === (col-1))){ 
                                if (matrixA[i-1][j] === 1) 
                                        ++live; 
                                if (matrixA[i-1][j-1] === 1) 
                                        ++live;  
                                if (matrixA[i][j-1] === 1) 
                                        ++live; 
                                if (matrixA[0][j-2] === 1) 
                                        ++live; 
                                if (matrixA[0][j] === 1) 
                                        ++live; 
                                if (matrixA[row-1][0] === 1) 
                                        ++live; 
                                if (matrixA[0][0] === 1) 
                                        ++live; 
                                if (matrixA[0][1] === 1) 
                                        ++live; 
                        } else if (i === 0){ 
                                if (matrixA[row-1][j] === 1) 
                                        ++live; 
                                if (matrixA[row-1][j-1] === 1) 
                                        ++live; 
                                if (matrixA[row-1][j+1] === 1) 
                                        ++live; 
                                if (matrixA[i][j - 1] === 1) 
                                        ++live;
                                if (matrixA[i][j+1] === 1) 
                                        ++live; 
                                if (matrixA[i+1][j-1] === 1) 
                                        ++live; 
                                if (matrixA[i+1][j] === 1) 
                                        ++live; 
                                if (matrixA[i+1][j+1] === 1) 
                                        ++live;
                        } else if (j === (col-1)){ 
                                if (matrixA[(row-1)-i][0] === 1) 
                                        ++live; 
                                if (matrixA[(row)-i][0] === 1) 
                                        ++live; 
                                if (matrixA[(row-2)-i][0] === 1) 
                                        ++live; 
                                if (matrixA[i-1][j] === 1)
                                        ++live; 
                                if (matrixA[i-1][j-1] === 1) 
                                        ++live;
                                if (matrixA[i][j-1] === 1) 
                                        ++live;
                                if (matrixA[i+1][j-1] === 1) 
                                        ++live;
                                if (matrixA[i+1][j] === 1) 
                                        ++live; 
                        } else if (i === (row-1)){ 
                                if (matrixA[0][j] === 1) 
                                        ++live; 
                                if (matrixA[0][j-1] === 1) 
                                        ++live; 
                                if (matrixA[0][j+1] === 1) 
                                        ++live; 
                                if (matrixA[i][j-1] === 1) 
                                        ++live; 
                                if (matrixA[i-1][j-1] === 1) 
                                        ++live;
                                if (matrixA[i-1][j] === 1) 
                                        ++live;
                                if (matrixA[i-1][j+1] === 1) 
                                        ++live;
                                if (matrixA[i][j+1] === 1) 
                                        ++live;
                        } else if (j === 0){ 
                                if (matrixA[(row-1)-i][col-1] === 1) 
                                        ++live; 
                                if (matrixA[(row)-i][col-1] === 1) 
                                        ++live; 
                                if (matrixA[(row-2)-i][col-1] === 1) 
                                        ++live; 
                                if (matrixA[i-1][j] === 1) 
                                        ++live; 
                                if (matrixA[i-1][j+1] === 1) 
                                        ++live;
                                if (matrixA[i][j+1] === 1) 
                                        ++live;
                                if (matrixA[i+1][j+1] === 1)
                                        ++live;
                                if (matrixA[i+1][j] === 1)
                                        ++live; 
                        } else { 
                                if (matrixA[i-1][j-1] === 1){ 
                                        ++live; 
                                }
                                if (matrixA[i-1][j+1] === 1){ 
                                        ++live; 
                                }
                                if (matrixA[i-1][j] === 1){ 
                                        ++live; 
                                }
                                if (matrixA[i][j-1] === 1){ 
                                        ++live;
                                }
                                if (matrixA[i][j+1] === 1){ 
                                        ++live; 

                                }
                                if (matrixA[i+1][j+1] === 1){ 
                                        ++live; 

                                }
                                if (matrixA[i+1][j] === 1){ 
                                        ++live; 

                                }
                                if (matrixA[i+1][j-1] === 1){ 
                                        ++live;
                                }
                        }
                        if (matrixA[i][j] === 1){  
                                if (live < 2)
                                {
                                        matrixB[i][j] = 0;  
                                }
                                else if (live > 3)
                                {
                                        matrixB[i][j] = 0;  
                                }
                                else if (live === 3)
                                {
                                        matrixB[i][j] = 1;  
                                }
                                else if (live === 2)
                                {
                                        matrixB[i][j] = 1;  
                                }
                        } else if (matrixA[i][j] === 0){ 
                                if (live === 3)
                                {
                                        matrixB[i][j] = 1;  
                                } else if (live !== 3) {
                                        matrixB[i][j] = 0;  
                                }
                        }
                }
        }
        for (i = 0; i < row; i++)
        {
                for (j = 0; j < col; j++)
                {
                        matrixA[i][j] = matrixB[i][j];
                }
        }
        return matrixA;
}


// /**
// * Prints a multidimensional character array
// * @param matrix is the matrix to be printed
// * @param m_rows is the number of rows, starting at one
// * @param n_cols is the number of columns, starting at one
// * @return void
// **/ 
// void print_matrix(unsigned char **matrix, int m_row, int n_col){
//         for (int m = 0; m < m_row; m++) {
//                 for (int n = 0; n < n_col; n++) {
//                         printf("%c\t", matrix[m][n]);
//                 }
//                 printf("\n");
//         }
// }


// /** Sets the specified row to 1
//  * @param matrix is the matrix to modify
//  * @param row is the row to change to ones
//  * @param n_col is the number of columns in matrix
//  * @return unsigned char ** is the modified matrix
//  */
// unsigned char **set_row(unsigned char **matrix, int row, int n_col)
// {
//         int i = row, j;
//         unsigned char **tmp = matrix;

//         for (j = 0; j < n_col; j++)
//                 tmp[i][j] = 1;

//         return tmp;
// }

// /** Sets the specified column to 1
//  * @param matrix is the matrix to modify
//  * @param col is the col to change to 1s
//  * @param m_row is the number of rows in matrix
//  * @return unsigned char ** is the modified matrix
//  */
// unsigned char **set_col(unsigned char **matrix, int col, int n_row)
// {
//         int i, j = col;
//         unsigned char **tmp = matrix;

//         for (i = 0; i < n_row; i++)
//                 tmp[i][j] = 1;

//         return tmp;
// }

// /** Sets the specified cell to 1
//  * @param matrix is the matrix to modify
//  * @param col is the col to change to 1s
//  * @param row is the row to change 
//  * @return unsigned char ** to the modified matrix
//  */
// unsigned char **one_cell(unsigned char **matrix, int row, int col)
// {
//         unsigned char **tmp = matrix;
//         tmp[row][col]= 1;
//         return tmp;
// }

// /** Sets all cells to 0 in matrix
//  * @param matrix is the matrix to modify
//  * @param col is the number of columns in matrix
//  * @param row is the number of rows in matrix
//  * @return unsigned char ** to the modified matrix
//  */
// unsigned char **all_zeros(unsigned char **matrix, int row, int col){
//         int i, j;
//         for (i = 0; i < row; i++)
//         {
//                 for (j = 0; j < col; j++)
//                 {
//                         matrix[i][j] = 0;
//                 }
//         }
//         return matrix;
// }

// /** Sets all cells to 1 in matrix
//  * @param matrix is the matrix to modify
//  * @param col is the number of columns in matrix
//  * @param row is the number of rows in matrix
//  * @return unsigned char ** to the modified matrix
//  */
// unsigned char **all_ones(unsigned char **matrix, int row, int col){
//         int i, j;
//         for (i = 0; i < row; i++)
//         {
//                 for (j = 0; j < col; j++)
//                 {
//                         matrix[i][j] = 1;
//                 }
//         }
//         return matrix;
// }



// /** Uses matrix A to calculate and write the next generation into matrix B.
//  *      Then A is overwritten with B.
//  *      The edge of the grid is a torus: left and right 
//  *              edge are directly continuous,
//  *      and the top and bottom are also directly continuous.
//  * @param matrixA is the current-gerneration matrix.
//  * @param matrixB is the next-gerneration matrix.
//  * @param col is the number of columns in matrix A and B.
//  * @param row is the number of row in matrix A and B.
//  * @return unsigned char ** to the modified matrix A
//  */




// /** prints the matrix with squares
//  * @param matrixA is the matrix to be printed.
//  * @param col is the number of columns in the matrix.
//  * @param row is the number of rows in the matrix.
//  * @return void
//  */
// void cell_printer(unsigned char **matrixA, int row, int col){
//         int i,j;
//         for (i = 0; i < row; i++)
//         {
//                 for (j = 0; j < col; j++)
//                 {
//                         if (matrixA[i][j] === 1){
//                                 printf("🟩");
//                         } else if (matrixA[i][j] === 0)
//                         {
//                                 printf("⬜️");
//                         }
//                 }
//                 printf("\n");        
//         }
// }

// /** prints the matrix, each cell is replaced with an integer 
//  *      representing the number of live cells surrounding it. 
//  * @param tmp is the matrix to be printed.
//  * @param col is the number of columns in the matrix.
//  * @param row is the number of rows in the matrix.
//  * @return void
//  */
// void neighbor_printer(int **tmp, int row, int col){
//         int i,j;
//         for (i = 0; i < row; i++)
//         {
//                 for (j = 0; j < col; j++)
//                 {
//                         printf(" %d", tmp[i][j]); 
//                 }
//                 printf("\n");        
//         }

// }



// /** check a matrix for the minimum y value 
//  *      matrix is in the form a = [ x, y, x, y];
//  * @param data is the matrix to be checked.
//  * @param size is the number of (x, y) points.
//  * @return the maximum number, an integer.
//  */
// int min_y_data(int data[], int  size){
//         int min = data[1];
//         int i;
//         for (i = 0; i < ((size)*2); i+=2){
//                 if (min >= data[i+1]){
//                         min = data[i+1];
//                 }
//         }
//         return min;
// }

// /** check a matrix for the maximum x value 
//  *      matrix is in the form a = [ x, y, x, y];
//  * @param data is the matrix to be checked.
//  * @param size is the number of (x, y) points.
//  * @return the maximum number, an integer.
//  */
// int max_x_data(int data[], int  size){
//         int max = data[0];
//         int i;
//         for (i = 0; i < ((size)*2); i+=2){
//                 if (max <= data[i]){
//                         max = data[i];
//                 }
//         }
//         return max;
// }

// /** check a matrix for the maximum y value 
//  *      matrix is in the form a = [ x, y, x, y];
//  * @param data is the matrix to be checked.
//  * @param size is the number of (x, y) points.
//  * @return the maximum number, an integer.
//  */
// int max_y_data(int data[], int size){
//         int max = data[1];
//         int i;
//         for (i = 0; i < ((size)*2); i+=2){
//                 if (max <= data[i+1]){
//                         max = data[i+1];
//                 }
//         }
//         return max;
// }

// /** Given a set of (x,y) points representing a pattern, it adjusts those
//  *       points so that the pattern is set to the center of the grid.
//  * @param data is the matrix of (x, y) points.
//  * @param max_x is the largest x-component in pattern.
//  * @param max_y is the largest y-component in pattern.
//  * @param min_x is the smallest x-component in pattern.
//  * @param min_y is the smallest y-component in pattern.
//  * @param col is the number of columns in the data matrix.
//  * @param row is the number of rows in the data matrix.
//  * @param size number of (x, y) points, i.e. half the number 
//  * @param t is the number files being read into the grid
//  * @param v is the current file number in the set of three.
//  *      of elements in data.
//  * @return void
//  */


// /** Given a set of (x,y) points, it shifts a pattern to  
//  *      that (x, y) postion in the grid.
//  * @param data is the matrix of (x, y) points.
//  * @param x is the value to be added to the x (columns)
//  * @param y is the value to be added to the y (columns)
//  * @param max_x is the largest x-component in pattern.
//  * @param max_y is the largest y-component in pattern.
//  * @param min_x is the smallest x-component in pattern.
//  * @param min_y is the smallest y-component in pattern.
//  * @param col is the number of columns in the data matrix.
//  * @param row is the number of rows in the data matrix.
//  * @param size number of (x, y) points, i.e. half the number 
//  *      of elements in data.
//  * @return void
//  */
// void coordinate_adjust(int data[], int size, int min_y, int min_x, int max_x,
//          int max_y, int col, int row, int x, int y, int game){
//                /* if x or y are less than 0 */
//                int i = 0;
//         for (i = 0; i < ((size)*2); i+=2){
//                 if(game != 0){
//                         data[i] = (data[i] - (min_x)) + x;
//                         while(data[i] < 0){
//                                 data[i] = (col) + data[i]; 
//                         }
//                         while (data[i] > (col - 1)){
//                                 data[i] = data[i] - (col); 
//                         }
//                 } else {        
//                         data[i] = (data[i] - (min_x)+1) + x;
//                         while(data[i] < 1){
//                                 data[i] = (col - 3) + data[i]; 
//                         }
//                         while (data[i] > (col - 3)){
//                                 data[i] = data[i] - (col-2); 
//                         }
//                 }
//         }
//         for (i = 0; i < ((size)*2); i+=2){
//                 data[i+1] = (data[i+1] - (min_y)) + y;
//                 if(game != 2){
//                         if (game != 0){
//                                 while(data[i+1] < 0){
//                                         data[i+1] = (row) + data[i+1]; 
//                                 }
//                                 while (data[i+1] > (row - 1)){
//                                         data[i+1] = data[i+1] - (row); 
//                                 }
//                         } else {
//                                 data[i+1] = data[i+1] + 1;
//                                 while(data[i+1] < 1){
//                                         data[i+1] = (row-2) + data[i+1]; 
//                                 }
//                                 while (data[i+1] > (row - 1)){
//                                         data[i+1] = data[i+1] - (row-2); 
//                                 }
//                         }
//                 } else {
//                         while(data[i+1] < 0){
//                                 data[i+1] = (row) + data[i+1];
//                                 data[i] = (col - 1) - data[i];
//                         }
//                         while (data[i+1] > (row - 1)){
//                                 data[i+1] = data[i+1] - (row); 
//                                 data[i] = (col - 1) - data[i];
//                         }
//                 }
//         }
// }

// /** Transposes matrix A (n x m) into C (m x n). I.e, C is 
//  *      overwritten with A's data.
//  * @param matrixA is the original matrix, (n x m).
//  * @param matrixc is the matrix to be updated (m x n).
//  * @param row is the number of rows in matrix A and columns in B.
//  * @param col is the number of columns in matrix A and rows in B.
//  * @return unsigned char ** to the modified matrix C
//  */
// unsigned char **transpose(unsigned char **matrixA,
//          unsigned char **matrixc, int row, int col){
//         int i, j;
//         for (i = 0; i < row; i++){
//                 for (j = 0; j < col; j++){
//                         matrixc[j][i] = matrixA[i][j];
//                 }
//         }
//         return matrixc;
// }