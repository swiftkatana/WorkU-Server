const { Tools } = require('../models/tools');



class Player {
    constructor(starttingX, starttingY, id, tagclass, parent, wolrdlogic) {
        this.id = id;
        this.myElement = document.createElement("player" + this.id);
        this.myElement.setAttribute("id", this.id);
        this.myElement.setAttribute("class", tagclass);
        this.Parent = parent;
        parent.appendChild(this.myElement);
        this.x = starttingX;
        this.myElement.style.backgroundImage = "url('img/player.png')";
        this.y = starttingY;
        this.upDown = undefined;
        this.leftright = undefined;
        this.LogicMap = wolrdlogic;
        this.pointsGain = counterPoints;
        this.dead = true;
    }

    cheakAroundPlayer = (x, y) => {
        for (let i = y; i < y + 51; i++) {
            for (let j = x; j < x + 51; j++) {
                if (this.LogicMap.World[i][j] != undefined) {
                    return false;
                }

            }
        }
        return true;
    }
    HitWall = () => {
        this.Dead();

    }
    HitFuns = (tag) => {
        if (tag == 1) {
            this.StopMove();
            this.HitWall()
        }
        if (tag == 2) {
            this.Hitcherry();
        }
    }
    Dead = () => {
        this.pointsGain = 0;
        this.dead = true;
        this.createPlayer();
    }
    StopMove() {
        this.upDown = undefined;
        this.leftright = undefined;
    }
    createPlayer = () => {
        if (this.dead) {
            while (true) {
                let x = starttingX
                let y = starttingY
                if (this.cheakAroundPlayer(x, y)) {
                    this.x = x;
                    this.y = y;
                    this.myElement.style.top = y + "px";
                    this.myElement.style.left = x + "px";
                    this.spown = false;
                    break;
                }
            }
        }
    }
    Logic = (d) => {
        let tag;
        if (d == "d" && this.x < 1800) {
            tag = this.LogicMap.DidIHit(this.x + 50, this.y, 50, 0);
            if (tag == undefined) {
                this.x += 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/player.png')";

            } else { this.HitFuns(tag); }
        } else if (d == "a" && this.x > 0) {
            tag = this.LogicMap.DidIHit(this.x, this.y, 50, 0);
            if (tag == undefined) {
                this.x -= 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/player.png')";
            } else { this.HitFuns(tag); }
        } else if (d == "w" && this.y > 0) {
            tag = this.LogicMap.DidIHit(this.x, this.y, 0, 50);
            if (tag == undefined) {
                this.y -= 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/player.png')";
            } else { this.HitFuns(tag); }
        } else if (d == "s" && this.y < 1000) {
            tag = this.LogicMap.DidIHit(this.x, this.y + 50, 0, 50);
            if (tag == undefined) {
                this.y += 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/player.png')";
            } else {
                this.HitFuns(tag);
            }

        }

        if (countpoint > 0) {
            this.UpdateBody();
        }
        this.DidiGoOutOfTheMap();
    }

    LongMove = () => {
        if (this.upDown == true) {
            this.Logic("w");
        } else if (this.upDown == false) {
            this.Logic("s");
        } else if (this.leftright == false) {
            this.Logic("a");
        } else if (this.leftright == true) {
            this.Logic("d");
        }
        setTimeout(this.LongMove, 100);
    }


}



module.exports = Player;