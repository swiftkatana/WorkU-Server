$(document).ready(function() {


    var x = screen.width;
    var y = screen.height;

    randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var bestScore = 0;
    var playerPreess = [];
    var didLose = true;
    var count = 0;
    var gameStpes = [];
    var sounds = [];
    var countStep = 0;
    var didGood = false;
    for (let i = 0; i < 4; i++) {

        sounds.push(new Audio(`sounds/${i}.mp3`));

    }
    sounds.push(new Audio("sounds/wrong.mp3"));
    sounds.push(new Audio("sounds/win.mp3"));
    addStep = () => {

        var randomStep = randomInteger(0, 3);
        gameStpes.push(randomStep);
        showThePlayerWhatToPrees();
        console.log(`Amount of steps game =${gameStpes.length} player moves is= ${playerPreess.length}`);
    }
    showThePlayerWhatToPrees = () => {
        var step = gameStpes[gameStpes.length - 1];
        sounds[step].play();

        console.log(`the new step =${step} `);

        $(`#${step}`).fadeToggle()
        $(`#${step}`).fadeToggle()
    }

    ChangeTitle = (str) => {
        var Title = $("#level-title")
        Title.fadeToggle();
        Title.text(str);
        Title.fadeToggle();


    }



    loose = () => {

        ChangeTitle("you did lost so please try again (=  \n  oh!!! that is your score !! :" + bestScore + ".\n  Press A Key to Start")
        sounds[4].play();
        countStep = 0;
        count = 0;
        gameStpes = [];
        playerPreess = [];
        didLose = false;
        console.log(`Amount of steps game =${gameStpes.length} player moves is= ${playerPreess.length}`);

    }

    $(document).keypress(function(e) {
        if (gameStpes.length == 0 && e.code == "KeyA") {
            ChangeTitle("Good Luck!!");

            addStep();
        }
        console.log(e.which);

    });

    $(".btn").click(function(e) {
        var btnId = this.id;
        $(`#${btnId}`).animate({

            height: '180px',
            width: '180px'
        });
        $(`#${btnId}`).animate({

            height: '200px',
            width: '200px'
        });
        if (gameStpes.length > playerPreess.length) {

            if (gameStpes[countStep] == btnId) {
                sounds[this.id].play();

                countStep++;

                if (playerPreess.length > bestScore) bestScore = playerPreess.length;



                if (playerPreess.length < 3) {
                    ChangeTitle("Good Luck!! Score" + playerPreess.length);
                } else if (playerPreess.length >= 4 && playerPreess.length <= 10) {
                    ChangeTitle("WOW Nice Keep doing what you doing !!!!! Score" + playerPreess.length);
                }

                playerPreess.push(btnId);
                if (gameStpes.length == playerPreess.length) {
                    sounds[5].play();

                    playerPreess = [];
                    countStep = 0;
                    addStep();
                    ChangeTitle("You did It!! ");
                }

            } else {
                loose();

            }
        } else {
            loose();

        }

    });


});