function createGrid(S){
    let cell = 1;
    let grid = document.querySelector(".gridContainer");
    let table = document.createElement("table");
    table.classList.add("grid");
    let tbody = document.createElement("tbody");
    tbody.classList.add("tbody");
    for(let i = 1; i <= S; i++){
        let tr = document.createElement("tr");
        tr.setAttribute("id", `row_${i}`);
        for(let ind = 1; ind <= S; ind++){
            let td = document.createElement("td");
            td.classList.add(`cell${cell}`);
            td.classList.add(`x${ind}`);
            td.classList.add(`y${i}`);
            if(cell == 1){
                cell++;
            }
            else{
                cell--;
            }
            tr.appendChild(td);
        }
        if(S%2 == 0){
            if(cell == 1){
                cell++;
            }
            else{
                cell--;
            }
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);   
    grid.replaceChildren(table);
}
export default createGrid;