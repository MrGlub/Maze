import {findTile} from "./htmlToJs.js";
var path = [];
var visited = [];
class coord{
    constructor(x, y, par, g= 0, h = 0){
        this.x = x;
        this.y = y;
        this.par = par;
        this.g = g;
        this.h = h;
        this.f = h+g;
    }
    contains(arr){
        for(let i = 0;i < arr.length; i ++){
            if(arr[i].x == this.x && arr[i].y == this.y){
                return true;
            }
        }
    }
    find(arr){
        for(let i = 0;i < arr.length; i ++){
            if(arr[i].x == this.x && arr[i].y == this.y){
                return arr[i];
            }
        }
    }
}
function BFS(maze, start){
    path=[];
    visited=[];
    if(start[0]==-1){
        var adj = document.querySelector("#mS");
        let text = document.createTextNode("no start tile");
        adj.replaceChildren(text);
        return
    }
    let s = new coord(start[0], start[1], null);
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
            path = findPath(curr);
            visited.shift();
            visited.pop();
            path.shift();
            path.pop();
            return;
        }
        right = new coord(curr.x+1, curr.y, curr);
        left = new coord(curr.x-1, curr.y, curr);
        up = new coord(curr.x, curr.y+1, curr);
        down = new coord(curr.x, curr.y-1, curr);
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
    visited.shift();
    var adj = document.querySelector("#mS");
    let text = document.createTextNode("no end tile");
    adj.replaceChildren(text);
    return;
}
function findPath(node){
    let p = [];
    let curr = node;
    p.unshift(curr);
    while(curr.par!=null){
        curr = curr.par;
        p.unshift(curr);
    }
    return p;
}
function dist(nodeA, nodeB){
    return Math.sqrt(Math.pow(nodeA.x-nodeB.x,2) + Math.pow(nodeA.y-nodeB.y,2));
}
class priorityQ{
    constructor(arr){
        this.arr = arr;
    }
    enq(el){
        for(let i = 0; i < this.arr.length; i++){
            if(this.arr[i].f > el.f){
                this.arr.splice(i, 0, el);
                return;
            }
        }
        this.arr.push(el);
    }
    deq(){
        return this.arr.shift();
    }
}
function getNeighbours(node, dist, maze){
    let ret = [];
    if(node.x<maze.length-1 && maze[node.y][node.x+1]!="w"){
        ret.push(new coord(node.x+1, node.y, node));
    }
    if(node.x>0 && maze[node.y][node.x-1]!="w"){
        ret.push(new coord(node.x-1, node.y, node));
    }
    if(node.y<maze.length-1 && maze[node.y+1][node.x]!="w"){
        ret.push(new coord(node.x, node.y+1, node));
    }
    if(node.y>0 && maze[node.y-1][node.x]!="w"){ 
        ret.push(new coord(node.x, node.y-1, node));
    }
    return ret;
}
function aStar(maze, start, end){
    if(start[0]==-1){
        var adj = document.querySelector("#mS");
        let text = document.createTextNode("no start tile");
        adj.replaceChildren(text);
        return
    }
    if(end[0]==-1){
        var adj = document.querySelector("#mS");
        let text = document.createTextNode("no end tile");
        adj.replaceChildren(text);
        return
    }
    let open = new priorityQ([]);
    let closed = [];
    let e = new coord(end[0], end[1], null)
    let s = new coord(start[0], start[1], null);
    open.enq(s);
    let int = setInterval(function(){
        if(open.arr.length==0){
            clearInterval(int);
            return;
        }
        let curr = open.deq();
        let neighbours = getNeighbours(curr, 1, maze);
        for(let i = 0; i < neighbours.length; i++){
            let n = neighbours[i];
            if(n.x == end[0] && n.y == end[1]){
                document.querySelector(`.x${curr.x+1}.y${curr.y+1}`).classList.add("v");
                let p = findPath(n);
                p.shift();
                p.pop();
                for(let ind = 0; ind<p.length; ind++){
                    document.querySelector(`.x${p[ind].x+1}.y${p[ind].y+1}`).classList.add("p");
                    document.querySelector(`.x${p[ind].x+1}.y${p[ind].y+1}`).classList.remove("v");
                }
                clearInterval(int);
                return;
            }
            n.g = n.par.g + 1;
            n.h = dist(n, e);
            n.f = n.h+n.g;
            if(!n.contains(closed)){
                if(n.contains(open.arr)){
                    let r = n.find(open.arr);
                    if(r.f > n.f){
                        r.g = n.g;
                        r.h = n.h;
                        r.f = n.f;
                        r.par = n.par;
                    }
                }
                else{
                    open.enq(n);
                }
            }           
        }
        if(curr!=s){
            document.querySelector(`.x${curr.x+1}.y${curr.y+1}`).classList.add("v");
        }
        closed.push(curr);
    }, 50);
    // while(open.length !=0){
    //     console.log(open);
    //     let curr = open.deq();
    //     let neighbours = getNeighbours(curr, 1, maze);
    //     for(let i = 0; i < neighbours.length; i++){
    //         let n = neighbours[i];
    //         if(n.x == end[0] && n.y == end[1]){
    //             document.querySelector(`.x${curr.x+1}.y${curr.y+1}`).classList.add("v");
    //             return;
    //         }
    //         n.f = n.par.f + 1 + dist(n, e);
    //         if(!n.contains(closed)){
    //             if(n.contains(open.arr)){
    //                 let r = n.find(open.arr);
    //                 if(r.f > n.f){
    //                     r.f = n.f;
    //                     r.par = n.par;
    //                 }
    //             }
    //             else{
    //                 open.enq(n);
    //             }
    //         }           
    //     }
    //     document.querySelector(`.x${curr.x+1}.y${curr.y+1}`).classList.add("v");
    //     closed.push(curr);
    // }
}
export {BFS, aStar, path, visited};