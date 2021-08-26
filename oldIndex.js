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
//console.log(htmlToAdd);
document.querySelector('#board-div').innerHTML = htmlToAdd;





// -------- Apply the corresponding class to left-clicked cells  ---------

document.querySelectorAll('.cell').forEach((element) => {
    element.addEventListener('click', () => {
        //console.log('Cell clicked: ', element);
        const elementValue = element.querySelector('span').innerHTML;
        //console.log(elementValue);
        const elementID = element.getAttribute('id');
        console.log('Clicked cell ID:' + elementID);
        const elementRow = elementID.slice(1,2); 
        //console.log(elementRow);
        const elementCol = elementID.slice(3,4); 
        //console.log(elementCol);

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
            if ( el.getAttribute('id') !== element.getAttribute('id') ) {
                if (elValue === 'm') {el.className = 'cell mined';}
                else if (elValue === '0') {el.className = 'cell value-0';}
                else if (elValue === '1') {el.className = 'cell value-1';}
                else if (elValue === '2') {el.className = 'cell value-2';}
                else if (elValue === '3') {el.className = 'cell value-3';}
                else if (elValue === '4') {el.className = 'cell value-4';}
                else if (elValue === '5') {el.className = 'cell value-5';}
                else if (elValue === '6') {el.className = 'cell value-6';}
                else if (elValue === '7') {el.className = 'cell value-7';}
                else if (elValue === '8') {el.className = 'cell value-8';}
            } 
        }); 
        
        document.querySelector('#message').innerHTML = gameOverPick;

        // ---  To blank cells ---

        } else if (elementValue === '0') {
        element.className = 'cell value-0';

        function uncoverAroundZero (coords) {
            checkAdjCells(element_N_Id);
            checkAdjCells(element_NE_Id);
            checkAdjCells(element_E_Id);
            checkAdjCells(element_SE_Id);
            checkAdjCells(element_S_Id);
            checkAdjCells(element_SW_Id);
            checkAdjCells(element_W_Id);
            checkAdjCells(element_NW_Id);
        }
        uncoverAroundZero(elementID);


                // -------- Function called for each adjacent when the left-clicked cell is value zero  ---------

                function checkAdjCells(coordinates) {
                    
                    //console.log(document.querySelector('span').innerHTML);

                    if (coordinates.length > 4) {return};
                    let row = coordinates.slice(1,2);
                    let col = coordinates.slice(3,4);

                    let cellToCheck = document.querySelector(`#r${row}c${col}`);
                    if (col == '0') {return;}
                    if (row == '0') {return;}

                    let valueToCheck = document.querySelector(`#r${row}c${col} span`).innerHTML;
                    //console.log('valueToCheck: ' + valueToCheck);


                    if (valueToCheck === '0') {
                        console.log(coordinates + ' is a zero... Now what!?');
                        // to make the function loop work here ???
                        //uncoverAroundZero(coordinates);
                        
                    } 
                    else if (valueToCheck === '1') {cellToCheck.className = 'cell value-1';} 
                    else if (valueToCheck === '2') {cellToCheck.className = 'cell value-2';}
                    else if (valueToCheck === '3') {cellToCheck.className = 'cell value-3';}
                    else if (valueToCheck === '4') {cellToCheck.className = 'cell value-4';}
                    else if (valueToCheck === '5') {cellToCheck.className = 'cell value-5';}
                    else if (valueToCheck === '6') {cellToCheck.className = 'cell value-6';}
                    else if (valueToCheck === '7') {cellToCheck.className = 'cell value-7';}
                    else if (valueToCheck === '8') {cellToCheck.className = 'cell value-8';}


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
         


    })


});





// -------- Right-click  ---------

document.querySelectorAll('.cell').forEach((element) => {
    
    element.addEventListener('contextmenu', e => {
        e.preventDefault();
    })
    
    element.addEventListener('contextmenu', () => {
        let currentClass = element.getAttribute('class');
        if (currentClass === 'cell covered') {currentClass = 'cell flagged';} 
        else if (currentClass === 'cell flagged') {currentClass = 'cell questioned';}
        else if (currentClass === 'cell questioned') {currentClass = 'cell covered';}
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
// console.log('Total mines in board: ' + minesCount);
// console.log('Mines already flagged: ' + flaggedMinesCount);

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
    }
}





// -------- End messages  ---------

let gameOver = [];
gameOver.push("I bet you didn't see that coming 😜 ");
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


// -------- Explosion sound ---------

let boom = document.querySelector('#explosion-sound');
function playAudio(audio) {
    audio.play();
}























//------------ Create board in DOM on load with event listener -------------

// window.addEventListener('load', (event) => {   
//     let htmlToAdd = '';
//     htmlToAdd += `
//     <table id='table-board'>
//         <tbody>
//     `;   
//     for (let i = 1; i < board.length - 1; i++) {
//         htmlToAdd += `
//             <tr>
//         `;
//         for (let j = 1; j < board[i].length - 1; j++) {
//             htmlToAdd += `
//                 <td id='r${board[i][j].row}c${board[i][j].col}' class='cell value-1'><span>${board[i][j].value}</span></td>
//             `
//         }
//         htmlToAdd += `
//             </tr>
//         `;
//     }  
//     htmlToAdd += `
//         </tbody>
//     </table>
//     `;
//     //console.log(htmlToAdd);
//     document.querySelector('#board-div').innerHTML = htmlToAdd;
// });

// console.log('test: ' + document.querySelector('.cell'));









// else if (valueToCheck === '1') {console.log(cellToCheck);} 
// else if (valueToCheck === '2') {console.log(cellToCheck);} 
// else if (valueToCheck === '3') {console.log(cellToCheck);} 
// else if (valueToCheck === '4') {console.log(cellToCheck);} 
// else if (valueToCheck === '5') {console.log(cellToCheck);} 
// else if (valueToCheck === '6') {console.log(cellToCheck);} 
// else if (valueToCheck === '7') {console.log(cellToCheck);} 
// else if (valueToCheck === '8') {console.log(cellToCheck);} 

// else if (valueToCheck === '1') {cellToCheck.className = 'cell value-1';} 
// else if (valueToCheck === '2') {cellToCheck.className = 'cell value-2';}
// else if (valueToCheck === '3') {cellToCheck.className = 'cell value-3';}
// else if (valueToCheck === '4') {cellToCheck.className = 'cell value-4';}
// else if (valueToCheck === '5') {cellToCheck.className = 'cell value-5';}
// else if (valueToCheck === '6') {cellToCheck.className = 'cell value-6';}
// else if (valueToCheck === '7') {cellToCheck.className = 'cell value-7';}
// else if (valueToCheck === '8') {cellToCheck.className = 'cell value-8';}


    //   console.log('N: ' + element_N_Id);
    //   console.log('NE: ' + element_NE_Id);
    //   console.log('E: ' + element_E_Id);
    //   console.log('SE: ' + element_SE_Id);
    //   console.log('S: ' + element_S_Id);
    //   console.log('SW: ' + element_SW_Id);
    //   console.log('W: ' + element_W_Id);
    //   console.log('NW: ' + element_NW_Id);










// const r = 4;
// const c = 5;
// console.log(document.querySelector(`#r${r}c${c}`));
// console.log(document.querySelector(`#r${r}c${c} span`).innerHTML);

// console.log(document.querySelectorAll('td'));
// console.log(document.querySelectorAll('td').length);






// const allCells = document.getElementsByClassName('cell');
// console.log(allCells);

// for (cell in allCells) {
//     console.log(cell);
// }





//  .addEventListener('click') => {
//     // TODO: write some code here
//     console.log('Cell clicked: ', cell);
//   });




// let target2 = document.getElementById('.table-board');
// console.log(target2);

// let target3 = document.querySelector("#r1c2");
// console.log(target3);








    //     // ---  To blank cells ---

    // } else if (elementValue === '0') {
    //     element.className = 'cell value-0';
    //     let checkedArr = [];
    //     function uncoverAroundZero (coords) {
    //         //console.log(coords);

    //         checkAdjCells(element_N_Id);
    //         checkAdjCells(element_NE_Id);
    //         checkAdjCells(element_E_Id);
    //         checkAdjCells(element_SE_Id);
    //         checkAdjCells(element_S_Id);
    //         checkAdjCells(element_SW_Id);
    //         checkAdjCells(element_W_Id);
    //         checkAdjCells(element_NW_Id);

    //     }
    //     uncoverAroundZero(elementID)


    //             // -------- Function called for each adjacent when the left-clicked cell is value zero  ---------

    //             function checkAdjCells(coordinates) {
    //                 if (coordinates.length > 4) {return};
    //                 let row = coordinates.slice(1,2);
    //                 let col = coordinates.slice(3,4);

    //                 let cellToCheck = document.querySelector(`#r${row}c${col}`);
    //                 if (col == '0') {return;}
    //                 if (row == '0') {return;}

    //                 let valueToCheck = document.querySelector(`#r${row}c${col} span`).innerHTML;
    //                 //console.log('valueToCheck: ' + valueToCheck);


    //                 if (valueToCheck === '0') {
    //                     console.log(coordinates + ' is a zero... Now what!?');
    //                     // to make the function loop work here
    //                     //uncoverAroundZero(coordinates);
                        
    //                 } 
    //                 else if (valueToCheck === '1') {cellToCheck.className = 'cell value-1';} 
    //                 else if (valueToCheck === '2') {cellToCheck.className = 'cell value-2';}
    //                 else if (valueToCheck === '3') {cellToCheck.className = 'cell value-3';}
    //                 else if (valueToCheck === '4') {cellToCheck.className = 'cell value-4';}
    //                 else if (valueToCheck === '5') {cellToCheck.className = 'cell value-5';}
    //                 else if (valueToCheck === '6') {cellToCheck.className = 'cell value-6';}
    //                 else if (valueToCheck === '7') {cellToCheck.className = 'cell value-7';}
    //                 else if (valueToCheck === '8') {cellToCheck.className = 'cell value-8';}


    //             }