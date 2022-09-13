// Converts the html table into a 2d array
const open = "o";
const wall = "w";
const start = "s";
const end = "e";
const path = "p";
var maze = [];
function toArray(size) {
    maze = []; 
    for(let i = 0; i < size; i++){
        maze.push([]);
        for(let ind = 0; ind < size; ind++){   
            let curr = document.querySelector(`.x${ind+1}.y${i+1}`);     
            if(curr.classList.contains(wall)){
                maze[i].push(wall);
            }
            else if(curr.classList.contains(start)){
                maze[i].push(start);
            }
            else if(curr.classList.contains(end)){
                maze[i].push(end);
            }
            else if(curr.classList.contains(path)){
                maze[i].push(path);
            }
            else{
                maze[i].push(open);
            }
        }
    }
    return maze;
}

function findTile(tile){
    if(tile != "w" && tile != "p"){
        let coord = [-1,-1];
        for(let i=0;i<maze.length;i++){
            for(let ind=0;ind<maze[i].length;ind++){
                if(maze[i][ind] == tile){
                    coord[0] = ind;
                    coord[1] = i;
                    return coord;
                }
            }
        }
        return coord;
    }
    else{
        return -1;
    }
}
export {toArray, findTile};