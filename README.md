## Project Conway’s Game of Life
Author: Stephen Jurgensen
Date: 2022 October 18

# Introduction 
This is an React–Redux implementation of Conway’s game of life.   By adapting a similar project in the C language, the final   project in a C programming course at New Mexico Tech, into React, I was comforted with many new problems. This project was   independently pursued by me and has no connection with New   Mexico Tech or freeCodeCamp, however, many of the lessons I   learned in association with those organizations have   contributed.  to the success of this project. 
   
## The rules of the game:   
* Any live cell with fewer than two live neighbors dies, as if   by needs caused by under population.   
* Any live cell with more than three live neighbors dies, as if   by overcrowding.  
* Any live cell with two or three live neighbors lives,   unchanged, to the next generation. 
* Any dead cell with exactly three live neighbors cells will   come to life.   
(Note that each cell has up to eight neighbors).

## Live Link: 
https://jurgensen1.github.io/conway-game-of-life-react/

## UX Features:  
* Adjust the size of the grid and the size of cells.  
* Adjust the time between life cycles (1 to 2000   milliseconds).  
* Select from one of three edge topologies: Klein, Torus,   and Hedge. 
* Pause or Play the live cycle progression.  
* Reset the grid and reset the life cycle to 0.   
* Users can click on a given cell to bring it to life or.  kill it.   
* Select a pre-created pattern to load on to the grid   using the index (id) number of the given file.  
* Select a pre-created pattern to load by scrolling   through a list an selecting one file.  
* Select a pre-created pattern to load by incrementing or   decrementing the file index (id).  
* The list of scrollable file names allows users to select   one by clicking, this updates the grid, and changes the   color of the file’s parent element.   
* As a user increments or decrements through the files,   the currently selected file remains in the center and   remains green.   
* As a user increments or decrements through the files,   the currently selected file shifts to the in the center  and remains green.   
* When a user inputs a new file name the file loads and  the file list updates it’s scroll location so that the   file is in view.  
* The app is responsive to different screen sizes down to  600px wide.  
  
## Bugs 
The known bugs include:  
* A file with a pattern of a height or width beyond the  current grid dimensions will not load.  
* The lack of useCallBack Hooks might cause excessive  rendering and slow down the app.  

## Klein, Torus, and Hedge.

### Klein:
This edge setting connects the top to the bottom after a   180 deg rotation.   The left and right edges are connected without any rotataion. 

## Torus: 
This edge setting connects the top to the bottom and the left to the right   edges without any rotataion. 

## Hedge: 
This edge setting is limits the grid to the natural edges, minus one row   (top and bottom) and one column (left and right). This subtracted border of cells forms   the so-called hedge and is persistently dead cells, neither affected by nor affecting the   adjacent cells. 
