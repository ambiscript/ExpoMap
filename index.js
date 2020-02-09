class Booth {
    constructor(id, name, coords) {
        this.id = id;
        this.name = name;
        this.coords = coords;
    }
}

let grid = [];
for (let i = 0; i < 11; i++) {
    grid[i] = [];
    for (let j = 0; j < 18; j++) {
        grid[i][j] = null;
    }
}

let booths = [];

booths.push(new Booth(booths.length+1, "National Coding Association", [6,7]));
booths.push(new Booth(booths.length+1, "City of Citytown", [9,3]));

for (let k = 0; k < booths.length; k++) {
    grid[booths[k].coords[1]-1][booths[k].coords[0]-1] = booths[k];
}

function refreshContent(gridSpace, searchName) {
    $('#boothname').val('');
    $('#xcoord').val('');
    $('#ycoord').val('');
    gridSpace.innerHTML = '';
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                if (!searchName) {
                    gridSpace.innerHTML += `<div class="grid-item booth unselectable">
                        <p class="data">
                            ${grid[i][j].id}
                            <span class="booth-name">${grid[i][j].name}</span>
                        </p>
                    </div>`;
                } else if (searchName === grid[i][j].name) {
                    gridSpace.innerHTML += `<div class="grid-item booth highlighted unselectable">
                            <p class="data">
                                ${grid[i][j].id}
                                <span class="booth-name">${grid[i][j].name}</span>
                            </p>
                        </div>`;
                }
            } else {
                gridSpace.innerHTML += `<div class="grid-item empty unselectable">
                        <span class="coords">
                            (${i+1},${j+1})
                        </span>
                    </div>`;
            }
        }
    }
}

$(document).ready(() => {
    const gridSpace = document.getElementById('grid');
    refreshContent(gridSpace);

    $('#btn').click((event) => {
        let input = $('#add-form').serializeArray();
        if(grid[input[1].value][input[2].value] === null) {
            grid[input[1].value-1][input[2].value-1] = new Booth(booths.length+1, input[0].value, [input[1].value, input[2].value]);
            booths.push(grid[input[1].value-1][input[2].value-1]);
            refreshContent(gridSpace);
        }
    });

    $('#search-btn').click((event) => {
        let input = $('#search-form').serializeArray();
        console.log(input[0].value);
        for (let k = 0; k < booths.length; k++) {
            if (input[0].value === booths[k].name) {
                console.log('found');
                refreshContent(gridSpace, input[0].value);
            }
        }
    });

    $('.empty').click((event) => {
        let x;
        let y;
        if (event.target.nodeName === 'SPAN') {
            x = event.target.innerHTML.match(/\((.*),/).pop();
            y = event.target.innerHTML.match(/,(.*)\)/).pop();
        } else if (event.target.nodeName === 'DIV') {
            x = event.target.childNodes[1].innerHTML.match(/\((.*),/).pop();
            y = event.target.childNodes[1].innerHTML.match(/,(.*)\)/).pop();
        }
        $('#xcoord').val(x);
        $('#ycoord').val(y);
    });
});