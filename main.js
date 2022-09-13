import {toArray, findTile} from "./htmlToJs.js";
import createGrid from "./gridCreator.js"
import {BFS, path, visited} from "./bfs.js";
import {DSF, walled} from "./dfs.js";
// size input
var size = document.querySelector(".input");
var adj = document.querySelector("#adjustedValue");
var S=size.value;
// maze details
var old;
var maze = [];
var start = [-1, -1];
var end = [-1, -1];
// current button selected
var placement = "w";
window.onload = () => {
    createGrid(S);
    maze = toArray(S);
    cellEvent();
    bsfSolve();
    dsfCreate();
};
// size change on input
size.oninput = function() {
    let cell = 1;
    let grid = document.querySelector(".gridContainer");
    if(this.value.length == 0){
        grid.replaceChildren();
        adj.replaceChildren();
        return;       
    }
    else if(this.value>20){
        S = 20;
        let text = document.createTextNode("Size too large, set to 20");
        adj.replaceChildren(text);
    }
    else if(this.value<5){
        S = 5;
        let text = document.createTextNode("");
        adj.textContent = "Size too small, set to 5";
    }
    else{
        S=this.value;
        adj.replaceChildren();
    }
    createGrid(S);
    maze = toArray(S);
    cellEvent();
    bsfSolve();
    dsfCreate();
}
// sets on click event to make a wall
let wB = document.querySelector(".wB");
let sB = document.querySelector(".sB");
let eB = document.querySelector(".eB");
let bsf = document.querySelector(".bsf");
let dsf = document.querySelector(".dsf");
// on click event for wall button
wB.addEventListener("click", (event) => {
    placement = "w";
})
// on click event for start button
sB.addEventListener("click", (event) => {
    placement = "s";
})
// on click event for end button
eB.addEventListener("click", (event) => {
    placement = "e";
})
// solves maze with bfs on click
let curr;
function bsfSolve () {
    bsf.addEventListener("click", (event) =>{
        console.log(maze);
        BFS(maze);
        let i = 0;
        let ind = 0;
        let int = window.setInterval(function () {
            if(i == visited.length){
                if(ind == path.length){
                    clearInterval(int);
                    bsf.classList.remove("sMethod");
                }
                else{
                    curr= document.querySelector(`.x${path[ind].x+1}.y${path[ind].y+1}`);
                    curr.classList.add("p");
                    curr.classList.remove("v");
                    ind++;
                }
            }
            else{
                curr= document.querySelector(`.x${visited[i].x+1}.y${visited[i].y+1}`);
                curr.classList.add("v");
                i++;
            }
        }, 50);
    })
}
function dsfCreate(){
    dsf.addEventListener("click", (event) =>{
        DSF(maze);
        let i = 0;
        let ind = 0;
        let int = window.setInterval(function() {
            if( i == walled.length){
                clearInterval(int);
                dsf.classList.remove(".sMethod");
            }
            else{
                curr= document.querySelector(`.x${walled[i][1]+1}.y${walled[i][0]+1}`);
                curr.classList.add("p");
                i++;
            }
        }, 100);
    })
}
function cellEvent(){
    let cellChange1 = document.querySelectorAll(".cell1");
    cellChange1.forEach(cell => {
        cell.addEventListener("click", () => {
            let rem = cell.classList.toggle(`${placement}`);
            if(placement == "s"){
                cell.classList.remove("w");
                cell.classList.remove("e");
                maze = toArray(S);
                end = findTile("e");
                if(!rem){// start tile just removed
                    start = [-1,-1];
                }
                else{ // start tile created
                    if(start[0]!=-1){ // pre existing start tile is removed
                        old = document.querySelector(`.x${start[0]+1}.y${start[1]+1}`);
                        old.classList.remove("s");
                        maze = toArray(S);
                        start = findTile(placement);
                    }
                    else{ // adds start tile
                       maze = toArray(S); 
                       start = findTile(placement);
                    }
                }
            }
            else if(placement == "e"){
                cell.classList.remove("w");
                cell.classList.remove("s");
                maze = toArray(S);
                start = findTile("s");
                if(!rem){// end tile just removed
                    end = [-1,-1];
                }
                else{ // end tile created
                    if(end[0]!=-1){ // pre existing end tile is removed
                        old = document.querySelector(`.x${end[0]+1}.y${end[1]+1}`);
                        old.classList.remove("e");
                        maze = toArray(S);
                        end = findTile(placement);
                    }
                    else{ // adds end tile
                       maze = toArray(S); 
                       end = findTile(placement);
                    }
                }
            }
            else{
                cell.classList.remove("s");
                cell.classList.remove("e")
                maze = toArray(S);
                start = findTile("s");
                end = findTile("e");
            }
        })
    });
    let cellChange2 = document.querySelectorAll(".cell2");
    cellChange2.forEach(cell => {
        cell.addEventListener("click", () => {
            let rem = cell.classList.toggle(`${placement}`);
            if(placement == "s"){
                cell.classList.remove("w");
                cell.classList.remove("e");
                maze = toArray(S);
                end = findTile("e");
                if(!rem){// start tile just removed
                    start = [-1,-1];
                }
                else{ // start tile created
                    if(start[0]!=-1){ // pre existing start tile is removed
                        old = document.querySelector(`.x${start[0]+1}.y${start[1]+1}`);
                        old.classList.remove("s");
                        maze = toArray(S);
                        start = findTile(placement);
                    }
                    else{ // adds start tile
                       maze = toArray(S); 
                       start = findTile(placement);
                    }
                }
            }
            else if(placement == "e"){
                cell.classList.remove("w");
                cell.classList.remove("s");
                maze = toArray(S);
                start = findTile("s");
                if(!rem){// end tile just removed
                    end = [-1,-1];
                }
                else{ // end tile created
                    if(end[0]!=-1){ // pre existing end tile is removed
                        old = document.querySelector(`.x${end[0]+1}.y${end[1]+1}`);
                        old.classList.remove("e");
                        maze = toArray(S);
                        end = findTile(placement);
                    }
                    else{ // adds end tile
                       maze = toArray(S); 
                       end = findTile(placement);
                    }
                }
            }
            else{
                cell.classList.remove("s");
                cell.classList.remove("e");
                maze = toArray(S);
                start = findTile("s");
                end = findTile("e");
            }
        })
    })
}