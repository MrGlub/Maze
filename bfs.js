import {findTile} from "./htmlToJs.js";
var path = [];
var visited = [];
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
function BFS(maze){
    path=[];
    visited=[];
    let start = findTile("s");
    if(start[0]==-1){
        console.log("no start tile");
        return
    }
    let s = new coord(start[0], start[1], null, null);
    let q = [s];
    let curr;
    let up;
    let down;
    let left;
    let right;
    visited.push(s);
    while(q.length != 0){
        curr = q.shift();
        if(maze[curr.y][curr.x] == "e"){
            while(visited.pop()!=curr);
            visited.push(curr);
            findPath(curr);
            visited.shift();
            visited.pop();
            path.shift();
            path.pop();
            return;
        }
        right = new coord(curr.x+1, curr.y, curr.x, curr.y);
        left = new coord(curr.x-1, curr.y, curr.x, curr.y);
        up = new coord(curr.x, curr.y+1, curr.x, curr.y);
        down = new coord(curr.x, curr.y-1, curr.x, curr.y);
        if(curr.x<maze.length-1 && maze[curr.y][curr.x+1]!="w" && !right.contains(visited)){            
            q.push(right);
            visited.push(right);
        }
        if(curr.x>0 && maze[curr.y][curr.x-1]!="w" && !left.contains(visited)){
            q.push(left);
            visited.push(left);
        }
        if(curr.y<maze.length-1 && maze[curr.y+1][curr.x]!="w" && !up.contains(visited)){
            q.push(up);
            visited.push(up);
        }
        if(curr.y>0 && maze[curr.y-1][curr.x]!="w" && !down.contains(visited)){ 
            q.push(down);
            visited.push(down);
        }
    }
    console.log("no end tile");
    return;
}
function findPath(node){
    let curr = node;
    path.unshift(curr);
    while(curr.parX != null && curr.parY != null){
        curr = curr.find(visited, curr.parX, curr.parY);
        path.unshift(curr);
    }
}
export {BFS, path, visited};