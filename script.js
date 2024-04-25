"use strict"

let positionGlobalX = 130;
let positionGlobalY = 60;
let playerLife = 3;
let points = 0;

let fps = 60;
let lastTime = 0; // Variable to store the timestamp of the last frame
let frameCount = lastTime / fps; // Variable to store the number of frames rendered within one second

// Array to store coin positions
let coins = [
    { x: 200, y: 100 },
    { x: 100, y: 250 },
    { x: 400, y: 50 },
    { x: 400, y: 300 },

];

let enemies = [
    { x: 400, y: 200 }
]

//Draw the player on the screen

const player = (ctx, img) => {
    ctx.drawImage(img, positionGlobalX, positionGlobalY, 50, 50)
    // console.log("This is Xposition ==> ", positionGlobalX)
    // console.log("This is Yposition ==> ", positionGlobalY)


    //Manage that the player cannot go away of the board

    if (positionGlobalX <= 0) {
        positionGlobalX = 10
        

    }
    else if (positionGlobalX >= 600) {
        positionGlobalX = 590;


    }
    else if (positionGlobalY <= 0) {
        positionGlobalY = 0
    }
    else if (positionGlobalY >= 350) {
        positionGlobalY = 300
    }

}

const drawText = (ctx) => {
    ctx.fillStyle = "black";
    ctx.font = "30px monospace";
    ctx.fillText(`Points: ${points}`, 5, 30)
    ctx.fillText(`Life: ${playerLife}`, 5, 70)
    ctx.fillText(`FPS: ${frameCount}`, 5, 110);
}


let initializeCanvas = () => {
    let canvasBoard = document.getElementById("mycanvas")

    let ctx = canvasBoard.getContext("2d");
    const characterImg = new Image()
    characterImg.src = "./img/slime.png"


    const coinImg = new Image();
    coinImg.src = "./img/coin.png";

    const animate = (event) => {
        // let timeElaps = event - lastTime
        // lastTime = event


        // frameCount = Math.round(1000 / timeElaps)

        //Clean the board after every render
        // ctx.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
        ctx.fillStyle = "#BDB3B1";
        ctx.fillRect(0, 0, canvasBoard.width, canvasBoard.height)



        // ctx.fillRect(positionGlobalX, positionGlobalY, 100, 100);

        // if (positionGlobalX === canvasBoard.width) {
        //     positionGlobalX = 0;
        // }


        player(ctx, characterImg)

        //Rectangle with the value of coin
        //TODO replace forEach for a for-loop
        coins.forEach((coin, index) => {
            ctx.drawImage(coinImg, coin.x, coin.y, 30, 30);

            // Check collision with player
            if (
                positionGlobalX + 50 >= coin.x &&
                positionGlobalX <= coin.x + 30 &&
                positionGlobalY + 50 >= coin.y &&
                positionGlobalY <= coin.y + 30
            ) {
                points += 1;
                coins.splice(index, 1); // Remove collected coin
            }
        });


        enemies.forEach((enemie, index) => {
            ctx.fillStyle = "red";
            ctx.fillRect(enemie.x, enemie.y, 30, 30);

            // Check collision with player
            if (
                positionGlobalX + 50 >= enemie.x &&
                positionGlobalX <= enemie.x + 30 &&
                positionGlobalY + 50 >= enemie.y &&
                positionGlobalY <= enemie.y + 30

            ) {
                playerLife -= 1;
                enemies.splice(index, 1); // Remove enemie
            }
            // enemie.x += 10

            // if (enemie.x <= 0) {
            //     enemie.x = 10
            // }
            // else if (enemie.x >= 600) {
            //     penemie.x = 590;
            // }
            // else if (enemie.y <= 0) {
            //     enemie.y = 0
            // }
            // else if (enemie.y >= 350) {
            //     enemie.y = 300
            // }
        });



        //Paint the amount of points the player has
        drawText(ctx)




        requestAnimationFrame(animate);


    }
    animate();
}


//When a key is press add a value dependieng of the key
//Controling player position depending of the key
document.addEventListener("keypress", (event) => {
    console.log(event)
    if (event.key.toLowerCase() == "a") {
        positionGlobalX -= 50;
    }
    else if (event.key.toLowerCase() == "d") {
        positionGlobalX += 50;
    }
    else if (event.key.toLowerCase() == "w") {
        positionGlobalY -= 50;
    }
    else if (event.key.toLowerCase() == "s") {
        positionGlobalY += 50;
    }
}
)

initializeCanvas()