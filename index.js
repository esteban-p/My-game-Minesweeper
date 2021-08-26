// ------------ Create board in DOM  -------------

let htmlToAdd = '';
htmlToAdd += `
<table id='table-board'>
<tbody>
`;
for (let i = 1; i < board.length - 1; i++) {
    htmlToAdd += `
    <tr>
`;
    for (let j = 1; j < board[i].length - 1; j++) {
        htmlToAdd += `
        <td id='r${board[i][j].row}c${board[i][j].col}' class='cell covered'><span>${board[i][j].value}</span></td>
    `
    }
    htmlToAdd += `
    </tr>
`;
}
htmlToAdd += `
</tbody>
</table>
`;

document.querySelector('#board-div').innerHTML = htmlToAdd;

const cellsWithZeros = [];

const alreadyCheckedCells = [];

function checkCell(el) {
    //console.log('Cell clicked: ', element);
    // only if the parameter is a dom element we can use it directly  
    // otherwise we have to use the target of the event
    if (el === null) return;
    let element;
    if (el instanceof Element || element instanceof HTMLDocument) {
        element = el;
    } else {
        element = el.currentTarget;
    }

    if (el === null) return;
    const elementValue = element.querySelector('span').innerHTML;
    const elementID = element.getAttribute('id');
    const elementRow = elementID.slice(1, 2);
    const elementCol = elementID.slice(3, 4);

    const element_N_Id = 'r' + (+elementRow - 1) + 'c' + (+elementCol);
    const element_NE_Id = 'r' + (+elementRow - 1) + 'c' + (+elementCol + 1);
    const element_E_Id = 'r' + (+elementRow) + 'c' + (+elementCol + 1);
    const element_SE_Id = 'r' + (+elementRow + 1) + 'c' + (+elementCol + 1);
    const element_S_Id = 'r' + (+elementRow + 1) + 'c' + (+elementCol);
    const element_SW_Id = 'r' + (+elementRow + 1) + 'c' + (+elementCol - 1);
    const element_W_Id = 'r' + (+elementRow) + 'c' + (+elementCol - 1);
    const element_NW_Id = 'r' + (+elementRow - 1) + 'c' + (+elementCol - 1);



    // --- When a mine is left-clicked ---

    if (elementValue === 'm') {
        element.className = 'cell exploded';
        playAudio(boom);
        document.querySelectorAll('.cell').forEach((el) => {
            const elValue = el.querySelector('span').innerHTML;
            if (el.getAttribute('id') !== element.getAttribute('id')) {
                if (elValue === 'm') { el.className = 'cell mined'; }
                else if (elValue === '0') { el.className = 'cell value-0'; }
                else if (elValue === '1') { el.className = 'cell value-1'; }
                else if (elValue === '2') { el.className = 'cell value-2'; }
                else if (elValue === '3') { el.className = 'cell value-3'; }
                else if (elValue === '4') { el.className = 'cell value-4'; }
                else if (elValue === '5') { el.className = 'cell value-5'; }
                else if (elValue === '6') { el.className = 'cell value-6'; }
                else if (elValue === '7') { el.className = 'cell value-7'; }
                else if (elValue === '8') { el.className = 'cell value-8'; }
            }
        });

        document.querySelector('#message').innerHTML = gameOverPick;



        // ---  To blank cells ---

    } else if (elementValue === '0') {
        element.className = 'cell value-0';

        function uncoverAroundZero(coords) {
            checkAdjCells(element_N_Id);
            checkAdjCells(element_NE_Id);
            checkAdjCells(element_E_Id);
            checkAdjCells(element_SE_Id);
            checkAdjCells(element_S_Id);
            checkAdjCells(element_SW_Id);
            checkAdjCells(element_W_Id);
            checkAdjCells(element_NW_Id);
        }
        uncoverAroundZero(elementID)


        // -------- Function called for each adjacent when the left-clicked cell is value zero  ---------

        function checkAdjCells(coordinates) {

            if (coordinates.length > 4) { return };
            let row = coordinates.slice(1, 2);
            let col = coordinates.slice(3, 4);

            let cellToCheck = document.querySelector(`#r${row}c${col}`);
            if (col == '0') { return; }
            if (row == '0') { return; }

            let valueToCheck = document.querySelector(`#r${row}c${col} span`).innerHTML;


            if (valueToCheck === '0' && !alreadyCheckedCells.includes(coordinates)) {
                //console.log(coordinates + ' is a zero... Now what!?');
                cellsWithZeros.push(coordinates);
                //console.log(cellsWithZeros);


            }
            else if (valueToCheck === '1') { cellToCheck.className = 'cell value-1'; }
            else if (valueToCheck === '2') { cellToCheck.className = 'cell value-2'; }
            else if (valueToCheck === '3') { cellToCheck.className = 'cell value-3'; }
            else if (valueToCheck === '4') { cellToCheck.className = 'cell value-4'; }
            else if (valueToCheck === '5') { cellToCheck.className = 'cell value-5'; }
            else if (valueToCheck === '6') { cellToCheck.className = 'cell value-6'; }
            else if (valueToCheck === '7') { cellToCheck.className = 'cell value-7'; }
            else if (valueToCheck === '8') { cellToCheck.className = 'cell value-8'; }


        }



        // ---  Change class to the numbered cells ---
    }
    else if (elementValue === '1') {element.className = 'cell value-1';}
    else if (elementValue === '2') {element.className = 'cell value-2';}
    else if (elementValue === '3') {element.className = 'cell value-3';}
    else if (elementValue === '4') {element.className = 'cell value-4';}
    else if (elementValue === '5') {element.className = 'cell value-5';}
    else if (elementValue === '6') {element.className = 'cell value-6';}
    else if (elementValue === '7') {element.className = 'cell value-7';}
    else if (elementValue === '8') {element.className = 'cell value-8';}

    while (cellsWithZeros.length !== 0) {
        const checkedCell = cellsWithZeros.pop();
        alreadyCheckedCells.push(checkedCell);
        checkCell(document.querySelector(`#${checkedCell}`));
    }
}



// -------- Apply the corresponding class to left-clicked cells  ---------

document.querySelectorAll('.cell').forEach((element) => {
    element.addEventListener('click', checkCell)
});





// -------- Right-click  ---------

document.querySelectorAll('.cell').forEach((element) => {

    element.addEventListener('contextmenu', e => {
        e.preventDefault();
    })

    element.addEventListener('contextmenu', () => {

        let currentClass = element.getAttribute('class');
        if (currentClass === 'cell covered') {
            currentClass = 'cell flagged';
        } else if (currentClass === 'cell flagged') {
            currentClass = 'cell questioned';
        } else if (currentClass === 'cell questioned') {
            currentClass = 'cell covered';
        }
        element.className = currentClass;
    })
})


// -------- Count flagged mines  ---------

let minesCount = 0
let flaggedMinesCount = 0
document.querySelectorAll('.cell').forEach((element) => {
    if (element.querySelector('span').innerHTML === 'm') {
        minesCount += 1;
    }
})


document.querySelectorAll('.cell').forEach((element) => {
    element.addEventListener('contextmenu', e => {
        e.preventDefault();
    })
    element.addEventListener('contextmenu', () => {
        checkGameProgress(element);
    })
})

function checkGameProgress(element) {
    let currentClass = element.getAttribute('class');
    let cellValue = element.querySelector('span').innerHTML;
    if (currentClass === 'cell flagged' && cellValue === 'm') {
        flaggedMinesCount += 1;
        console.log(flaggedMinesCount);
    }
    if (flaggedMinesCount === minesCount) {
        document.querySelector('#message').innerHTML = youWonPick;
        playAudio(goodJob);
    }
}






// -------- End messages  ---------

let gameOver = [];
gameOver.push("Bet you didn't see that coming 😜 ");
gameOver.push("Better luck next time 🤷🏻‍♂️ ");
gameOver.push("Uhhh... you were so close! 🥺 ");
gameOver.push("Hahaha... looser! 🤣 ");
gameOver.push("How does it feel? 💥 ");
gameOver.push("Surpriiiise! 💣 ");
gameOver.push("I hope you get better at this soon 🙄 ");
gameOver.push("Are you planning to win sometime? 🥱 ");
gameOver.push("You are fired from the bomb squad!!! 🚒 ");
gameOver.push("Ouch! 🙈");
let randomNumGameOver = (Math.floor(Math.random() * gameOver.length));
let gameOverPick = gameOver[randomNumGameOver];

let youWon = [];
youWon.push("Well done champ! 💪🏼 ");
youWon.push("🎉 Congrats!!! 🥳 ");
youWon.push("Oh yeah, baby!!! 😎 ");
youWon.push("You nailed it! 🎯 ");
youWon.push("😀 Welcome to our bomb squad 🚒 ");
let randomNumYouWon = (Math.floor(Math.random() * youWon.length));
let youWonPick = youWon[randomNumYouWon];




// -------- Sounds ---------

let boom = document.querySelector('#explosion-sound');
function playAudio(audio) {
    audio.play();
}

let goodJob = document.querySelector('#applause-sound');
function playAudio(audio) {
    audio.play();
}
