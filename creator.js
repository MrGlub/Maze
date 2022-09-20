import {toArray, toHtml} from "./htmlToJs.js";
var walled = [];
var prev = [];
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
                curr.classList.add("w");    
            }
        }
        maze = toArray(maze.length);
}  
function Getneighbours(arr, dist){
    let ret = [];
    ret.push([arr[0], arr[1]+dist]);
    ret.push([arr[0], arr[1]-dist]);
    ret.push([arr[0]+dist, arr[1]]);
    ret.push([arr[0]-dist, arr[1]]);
    return ret;
}
function rand(max){
    return Math.floor(Math.random() * max);
}
function findTargets(maze){
    for(let i = 0 ; i < maze.length; i++){
        for(let ind = 0 ; ind < maze.length; ind++){
            let curr = document.querySelector(`.x${ind+1}.y${i+1}`);
            if(curr.classList.contains("s")){
                curr.classList.remove("w");
            }
            else if(curr.classList.contains("e")){
                curr.classList.remove("w");
            }
        }
    }
}
function DSF(maze){
    toHtml();
    toWall(maze);
    let q = [];
    q.push([0,0]);
    let start = document.querySelector(`.x${1}.y${1}`);
    start.classList.remove("w");
    let int = setInterval(function() {
        if(q.length==0){
            findTargets(maze);                       
            let dsf = document.querySelector(".dsf");
            dsf.classList.remove("sMethod");
            clearInterval(int);  
        }
        else{
            let curr = q.pop();
            let neighbours = Getneighbours(curr, 2);
            while(neighbours.length!=0){
                let ran = rand(neighbours.length);
                let n = neighbours[ran];
                neighbours.splice(ran, 1);
                let tile = document.querySelector(`.x${n[1]+1}.y${n[0]+1}`);
                if(n[0] >= 0 && n[0] < maze.length && n[1] >=0 && n[1] < maze.length && tile.classList.contains("w")){
                    tile.classList.remove("w");
                    let tileBefore = document.querySelector(`.x${(n[1]+1 + curr[1]+1)/2}.y${(n[0]+1 + curr[0]+1)/2}`);
                    tileBefore.classList.remove("w");
                    q.push(n);
                }
            }
        }
    },50);
}
function setContains(set, coord){
    for(let i = 0; i<set.length; i++){
        if(set[i][0] == coord[0] && set[i][1] == coord[1])
            return true;
    }
    return false;
}
function findSet(set, coord){
    for(let i = 0; i<set.length; i++){
        if(setContains(set[i], coord))
            return i;
    }
    return -1;
}
function Kruskal(maze){
    toHtml();
    toWall(maze);
    let walls = [];
    let set = [];
    for(let i = 0; i < maze.length; i++){
        for(let ind = 0; ind < maze.length; ind++){
            if(i % 2 == 0 && ind % 2 == 0){
                set.push([[ind, i]]);
                document.querySelector(`.x${ind+1}.y${i+1}`).classList.remove("w");
            }
            else if(!(ind%2 == 1 && i%2 == 1)){
                walls.push([ind, i]);
            }
        }
    }
    let int = setInterval(function(){
        if(walls.length==0){
            findTargets(maze);  
            let kruskal = document.querySelector(".kruskal");
            kruskal.classList.remove("sMethod");
            clearInterval(int);
        }
        else{
            let ind = rand(walls.length);
            let curr = walls[ind];
            walls.splice(ind, 1);
            if(curr[1] % 2 == 0){
                if(curr[0] > 0 && curr[0] < maze.length-1){
                    let right = findSet(set, [curr[0]-1, curr[1]]);
                    let left = findSet(set, [curr[0]+1, curr[1]]);
                    if(right != left){
                        set[right]= set[right].concat(set[left]);
                        set.splice(left, 1);
                        document.querySelector(`.x${curr[0]+1}.y${curr[1]+1}`).classList.remove("w");
                    }
                }
            }
            else{
                if(curr[1] >0 && curr[1] < maze.length-1){
                    let up = findSet(set, [curr[0], curr[1]-1]);
                    let down = findSet(set, [curr[0], curr[1]+1]);
                    if(up != down){
                        set[up] = set[up].concat(set[down]);
                        set.splice(down, 1);
                        document.querySelector(`.x${curr[0]+1}.y${curr[1]+1}`).classList.remove("w");
                    }
                }
            }
        }
    }, 50);
}
export {DSF, Kruskal, walled, prev};