import {toArray} from "./htmlToJs.js";
var walled = [];
class coord{
    constructor(x, y, parX,parY){
        this.x = x;
        this.y = y;
        this.parX = parX;
        this.parY = parY;
    }
    contains(arr){
        for(let i = 0;i < arr.length; i ++){
            if(arr[i].x == this.x && arr[i].y == this.y){
                return true;
            }
        }
    }
    find(arr, fX, fY){
        for(let i = 0;i < arr.length; i ++){
            if(arr[i].x == fX && arr[i].y == fY){
                return arr[i];
            }
        }
    }
}
function toWall(maze){
    let i = 0;
    let ind = 0;
    let curr;
    let inter = setInterval(function() {
        // for(let i = 0 ; i < maze.length; i++){
        //     for(let ind = 0; ind < maze.length; ind++){
        //         if(maze[i][ind]!= "s" && maze[i][ind]!= "e"){
        //             maze[i][ind] = "w";
        //         }
        //     }
        // }
        if(i == maze.length){
            clearInterval(inter);
            maze = toArray(maze.length);
        }
        else if(ind == maze.length){
            i++;
            ind = 0;
        }
        else{
            curr = document.querySelector(`.x${ind+1}.y${i+1}`)
            console.log(curr);
            if(!curr.classList.contains("e") && !curr.classList.contains("s")){
                curr.classList.add("w");
            }
            ind++;
        }
    }, 10)
}   
function DSF(maze){
    walled = [];
    toWall(maze);
}
export {DSF, walled};