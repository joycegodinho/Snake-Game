let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderisa o desenho que vai ser construido.
let box = 32; // pixels de cada quadradinho
let snake = [];
snake[0] = {
        x: 8 * box,
        y: 8 * box
    } // seta a posição inicial no meio
let direction = "right"; //variavel para a direção da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() { // backgroung
    context.fillStyle = "lightgreen"; //cor
    context.fillRect(0, 0, 16 * box, 16 * box); //desenho - (x,y,altura,largura)
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//com o evento de tocas nas teclas, a função update será chamada
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) { //se a cabeça coincidir com o final, o jogo acaba
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo); //para a função jogo
            alert('Game Over :(');
        }
    }

    criarBG(); // chamo a função
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //retira o último elemento da lista
    } else { // se for igual não retira e gera uma nova comida randomicamente
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona um novo elemento à frente
}

let jogo = setInterval(iniciarJogo, 100); // define 100ms como intervalo para o jogo ser atualizado