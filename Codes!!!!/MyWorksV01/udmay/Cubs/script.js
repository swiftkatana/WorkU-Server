// var howmanyP = prompt('howmany players')

randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var numm1 = randomInteger(1, 6);
var numm2 = randomInteger(1, 6);
var num1 = "img/" + "num" + numm1 + ".png";
var num2 = "img/" + "num" + numm2 + ".png";

var img1 = document.querySelectorAll("img")[0];
var img2 = document.querySelectorAll("img")[1];

if (numm1 > numm2) {
    document.getElementById("imgStu").setAttribute("src", "/img/player1.png");
    img1.setAttribute("src", num1);
    img2.setAttribute("src", num2);
} else if (numm1 < numm2) {
    document.getElementById("imgStu").setAttribute("src", "/img/player2.png");
    img1.setAttribute("src", num1);
    img2.setAttribute("src", num2);
} else {
    document.getElementById("imgStu").style.backgroundImage = "url('/img/noOne.png')"
    img1.setAttribute("src", num1);
    img2.setAttribute("src", num2);
}