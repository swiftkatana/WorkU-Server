var numberOfBtn = document.querySelectorAll(".drum").length;
var stringOfTomes = prompt("enter Tomes");
var arryOfTomes = stringOfTomes.split("");

for (let index = 0; index < numberOfBtn; index++) {
    document.querySelectorAll(".drum")[index].addEventListener("click", function() {
        var btnInnerHtml = this.innerHTML;
        playSound(btnInnerHtml);
        btnAnime(btnInnerHtml);
    });
}

document.addEventListener('keypress', function(event) {
    console.log(event.key);
    playSound(event.key);
    btnAnime(event.key);
});





function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}







//onsole.log(this);

function playSound(a) {

    switch (a) {
        case "w":
            var w = new Audio('sounds/tom-1.mp3').play();

            break;
        case "a":
            var a = new Audio('sounds/tom-2.mp3').play();

            break;
        case "s":
            var s = new Audio('sounds/tom-3.mp3').play();

            break;
        case "d":
            var d = new Audio('sounds/tom-4.mp3').play();

            break;
        case "j":
            var j = new Audio('sounds/snare.mp3').play();

            break;
        case "k":
            var k = new Audio('sounds/crash.mp3').play();

            break;
        case "l":
            var l = new Audio('sounds/kick-bass.mp3').play();

            break;

        default:
            break;
    }
}

btnAnime = (btn) => {
    var activeBtn = document.querySelector('.' + btn);

    activeBtn.classList.add("pressed");
    setTimeout(() => {
        activeBtn.classList.remove("pressed");
    }, 100);

};

function play() {
    if (arryOfTomes.length > 0) {
        for (let i = 0; i < arryOfTomes.length; i++) {
            sleep(1000);

            playSound(arryOfTomes[i]);
            btnAnime(arryOfTomes[i]);

        }
    }
}