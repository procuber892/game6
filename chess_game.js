const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleMove
});
const game = new Chess();
const statusElement = document.getElementById('status');
const difficultySelect = document.getElementById('difficulty-select');

let aiLevel = 1;

difficultySelect.addEventListener('change', (event) => {
    aiLevel = parseInt(event.target.value, 10);
});

function handleMove(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    updateStatus();
    window.setTimeout(makeAIMove, 250);
}

function makeAIMove() {
    const possibleMoves = game.ugly_moves();
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    if (move === null) return;

    game.ugly_move(move);
    board.position(game.fen());
    updateStatus();
}

function updateStatus() {
    let status = '';

    const moveColor = game.turn() === 'b' ? 'Black' : 'White';

    if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    } else if (game.in_draw()) {
        status = 'Game over, drawn position';
    } else {
        status = moveColor + ' to move';

        if (game.in_check()) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    statusElement.innerHTML = status;
}

board.position(game.fen());
updateStatus();
