import toArray from "./htmlToJs.js";
function cellEvent(maze, S){
    let cellChange1 = document.querySelectorAll(".cell1");
    cellChange1.forEach(cell => {
        cell.addEventListener("click", () => {
            cell.classList.toggle("wall");
            maze = toArray(S);
            console.log(maze);
        })
    });
    let cellChange2 = document.querySelectorAll(".cell2");
    cellChange2.forEach(cell => {
        cell.addEventListener("click", () => {
            cell.classList.toggle("wall");
            maze = toArray(S);
            console.log(maze);
        })
    })
}
export default cellEvent;