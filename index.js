class Booth {
    constructor(id, name, coords, positions, requirements) {
        this.id = id;
        this.name = name;
        this.coords = coords;
        this.positions = positions;
        this.requirements = requirements;
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

//booths.push(new Booth(booths.length+1, "National Coding Association", [6,7], "Programmer", "3+ years programming experience"));
//booths.push(new Booth(booths.length+1, "City of Citytown", [9,3], "IT Specialist", "Must be professional and experienced in local government."));

for (let k = 0; k < booths.length; k++) {
    grid[booths[k].coords[1]-1][booths[k].coords[0]-1] = booths[k];
}

function refreshContent(gridSpace) {
    $('#search-field').val('');
    $('#boothname').val('');
    $('#positions').val('');
    $('#requirements').val('');
    $('#xcoord').val('');
    $('#ycoord').val('');
    gridSpace.innerHTML = '';
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                gridSpace.innerHTML += `<div class="grid-item booth unselectable">
                    <p class="data">
                        ${grid[i][j].id}
                        <span class="booth-details">
                            ${grid[i][j].name}<br><br>
                            Positions: ${grid[i][j].positions} <br><br>
                            Requirements: ${grid[i][j].requirements}
                        </span>
                    </p>
                </div>`;
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

    $('.empty').click((event) => {
        let x;
        let y;
        if (event.target.nodeName === 'SPAN') {
            y = event.target.innerHTML.match(/\((.*),/).pop();
            x = event.target.innerHTML.match(/,(.*)\)/).pop();
        } else if (event.target.nodeName === 'DIV') {
            y = event.target.childNodes[1].innerHTML.match(/\((.*),/).pop();
            x = event.target.childNodes[1].innerHTML.match(/,(.*)\)/).pop();
        }
        $('#xcoord').val(x);
        $('#ycoord').val(y);
    }); 

    $('#btn').click((event) => {
        let input = $('#add-form').serializeArray();
        console.log(input);
        if(grid[input[3].value][input[4].value] === null) {
            let boothtemp = new Booth(booths.length+1, input[0].value, [input[4].value, input[3].value], input[1].value, input[2].value);
            grid[input[4].value-1][input[3].value-1] = boothtemp;
            booths.push(boothtemp);
            refreshContent(gridSpace);
        }
    });

    $('#search-btn').click((event) => {
        let input = $('#search-form').serializeArray();
        console.log(input[0].value);
        for (let k = 0; k < booths.length; k++) {
            if (input[0].value === booths[k].name) {
                alert(`${booths[k].name} is at booth ${booths[k].id}`);
            }
        }
    });
});