import {toArray} from "./htmlToJs.js";
var walled = [];
function contains(arr, coord){
    for(let i = 0;i < arr.length; i ++){
        if(arr[i][1] == coord[1] && arr[i][0] == coord[0]){
            return true;
        }
    }
}
function toWall(maze){
    let i = 0;
    let ind = 0;
    let curr;
    // let inter = setInterval(function() {
        for(let i = 0 ; i < maze.length; i++){
            for(let ind = 0; ind < maze.length; ind++){
                curr = document.querySelector(`.x${ind+1}.y${i+1}`)
                if(!curr.classList.contains("e") && !curr.classList.contains("s")){
                    curr.classList.add("w");
                }
            }
        }
        maze = toArray(maze.length);
    //     if(i == maze.length){
    //         clearInterval(inter);
    //         maze = toArray(maze.length);
    //     }
    //     else if(ind == maze.length){
    //         i++;
    //         ind = 0;
    //     }
    //     else{
    //         curr = document.querySelector(`.x${ind+1}.y${i+1}`)
    //         console.log(curr);
    //         if(!curr.classList.contains("e") && !curr.classList.contains("s")){
    //             curr.classList.add("w");
    //         }
    //         ind++;
    //     }
    // }, 10)
}   
function DSF(maze){
    let start = [0, 0];
    walled = [];
    walled.push(start);
    let q = [];
    q.push(start);
    toWall(maze);
    let curr;
    while(q.length != 0){
        curr = q.pop();
        //checks if start or end are on odd squares
        // if(curr[1]+1<maze.length && (maze[curr[0]][curr[1]+1] == "s" || maze[curr[0]][curr[1]+1] == "e") && !contains(walled, [curr[0], curr[1]+1])){
        //     q.push([curr[0], curr[1]+1]);
        // }
        // if(curr[1]>0 && (maze[curr[0]][curr[1]-1] == "s" || maze[curr[0]][curr[1]-1] == "e") && !contains(walled, [curr[0], curr[1]-1])){
        //     q.push([curr[0], curr[1]-1]);
        // }
        // if(curr[0]+1<maze.length && (maze[curr[0]+1][curr[1]] == "s" || maze[curr[0]+1][curr[1]] == "e") && !contains(walled, [curr[0]+1, curr[1]])){
        //     q.push([curr[0]+1, curr[1]]);
        // }
        // if(curr[0]>0 && (maze[curr[0]-1][curr[1]] == "s" || maze[curr[0]-1][curr[1]] == "e") && !contains(walled, [curr[0]-1, curr[1]])){
        //     q.push([curr[0]-1, curr[1]]);
        // }
        //actual dfs
        if(curr[1]+2<maze.length && !contains(walled, [curr[0], curr[1]+2])){
            q.push([curr[0], curr[1]+2]);
        }
        if(curr[1]-1>0 && !contains(walled, [curr[0], curr[1]-2])){
            q.push([curr[0], curr[1]-2]);
        }
        if(curr[0]+2<maze.length && !contains(walled, [curr[0]+2, curr[1]])){
            q.push([curr[0]+2, curr[1]]);
        }
        if(curr[0]-1>0 && !contains(walled, [curr[0]-2, curr[1]])){
            q.push([curr[0]-2, curr[1]]);
        }
        walled.push(curr);
    }
    console.log(walled);
}
export {DSF, walled};