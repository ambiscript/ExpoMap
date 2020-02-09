class Booth {
    constructor(id, name, coords) {
        this.id = id;
        this.name = name;
        this.coords = coords;
    }
}

let grid = [];
for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
        grid[i][j] = null;
    }
}

let booths = [];

booths.push(new Booth(booths.length+1, "National Coding Association", [6,7]));
booths.push(new Booth(booths.length+1, "City of Citytown", [9,3]));

for (let k = 0; k < booths.length; k++) {
    grid[booths[k].coords[1]-1][booths[k].coords[0]-1] = booths[k];
}

function refreshContent(gridSpace) {
    gridSpace.innerHTML = '';
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                gridSpace.innerHTML += `<div class="grid-item booth unselectable">
                        <p class="data">
                            ${grid[i][j].id}
                            <span class="booth-name">${grid[i][j].name}</span>
                        </p>
                    </div>`;
            } else {
                gridSpace.innerHTML += '<div class="grid-item"></div>';
            }
        }
    }
}

$(document).ready(() => {
    const gridSpace = document.getElementById('grid');
    refreshContent(gridSpace);

    $('#btn').click(() => {
        let input = $('form').serializeArray();
        if(grid[input[1].value][input[2].value] === null) {
            console.log(grid[input[1].value][input[2].value]);
            grid[input[1].value-1][input[2].value-1] = new Booth(booths.length+1, input[0].value, [input[1].value, input[2].value]);
            booths.push(grid[input[1].value-1][input[2].value-1]);
            refreshContent(gridSpace);
        }
    })
});