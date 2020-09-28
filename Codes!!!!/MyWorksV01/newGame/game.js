class WorldC {
    constructor(y, x) {
        this.World = new Array(y);
        for (let i = 0; i < this.World.length; i++) {
            this.World[i] = new Array(x);
        }

    }

    AddToTheMap = (y, x, tag, size) => {
        for (let i = y; i < y + size; i++) {
            for (let j = x; j < x + size; j++) {
                this.World[i][j] = tag;

            }
        }
    }

    DidIHit = (x, y, sizeY, sizeX) => {
        for (let i = y; i <= y + sizeY; i++) {
            for (let j = x; j <= x + sizeX; j++) {
                if (this.World[i][j] != undefined) {; return this.World[i][j] }

            }
        }
        return undefined;
    }

    RemoveFromTheMap = (y, x, size) => {
        for (let i = y; i < y + size; i++) {
            for (let j = x; j < x + size; j++) {
                this.World[i][j] = undefined;
            }
        }
    }




}

class Wepon {
    constructor(parent) {
        this.x;
        this.y;
        this.myElement = document.createElement("shoot");
        this.myElement.setAttribute("id", "shoot");
        this.myElement.setAttribute("class", "shoot");
        this.Parent = parent;
        parent.appendChild(this.myElement);

    }

    Logic = (d) => {
        let tag;
        if (d == "d" && this.x < 1800) {
            tag = this.LogicMap.DidIHit(this.x + 50, this.y, 50, 0);
            if (tag == undefined) {
                this.x += 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/shoot.png')";

            } else { this.HitFuns(tag); }
        } else if (d == "a" && this.x > 0) {
            tag = this.LogicMap.DidIHit(this.x, this.y, 50, 0);
            if (tag == undefined) {
                this.x -= 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/shoot.png')";
            } else { this.HitFuns(tag); }
        } else if (d == "w" && this.y > 0) {
            tag = this.LogicMap.DidIHit(this.x, this.y, 0, 50);
            if (tag == undefined) {
                this.y -= 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/shoot.png')";
            } else { this.HitFuns(tag); }
        } else if (d == "s" && this.y < 1000) {
            tag = this.LogicMap.DidIHit(this.x, this.y + 50, 0, 50);
            if (tag == undefined) {
                this.y += 1;
                this.myElement.style.left = this.x + "px";
                this.myElement.style.top = this.y + "px";
                this.myElement.style.backgroundImage = "url('img/shoot.png')";
            } else {
                this.HitFuns(tag);
            }

        }

    }
    Shoot = (x, y) => {
        if (this.dead) {
            while (true) {
                let x = this.starttingX
                let y = this.starttingY
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

    ShootLogic = () => {
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

class Player {
    constructor(starttingX, starttingY, id, tagclass, parent, wolrdlogic, Wepon) {
        this.id = id;
        this.myElement = document.createElement("player" + this.id);
        this.myElement.setAttribute("id", this.id);
        this.myElement.setAttribute("class", tagclass);
        this.Parent = parent;
        parent.appendChild(this.myElement);
        this.starttingX = starttingX;
        this.starttingY = starttingY;
        this.x = starttingX;
        this.myElement.style.backgroundImage = "url('img/player.png')";
        this.y = starttingY;
        this.upDown = undefined;
        this.leftright = undefined;
        this.LogicMap = wolrdlogic;

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
                let x = this.starttingX
                let y = this.starttingY
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


var map = document.getElementById("map");

let wepon = new Wepon(map)
let world = new WorldC(1500, 1500);
let player = new Player(750, 750, 1, 'player', map, world, wepon);

player.createPlayer();




document.onkeypress = (evt) => {
    evt = evt || window.event;
    if (evt.code == 'KeyW' || evt.which == '38') {
        if (player.upDown == undefined) {
            player.upDown = true;
        }
        player.leftright = undefined;


    } else if (evt.code == "KeyD" || evt.which == '39') {

        player.upDown = undefined;
        if (player.leftright == undefined) {
            player.leftright = true;
        }

    } else if (evt.code == 'KeyA' || evt.which == '37') {
        player.upDown = undefined;
        if (player.leftright == undefined) {
            player.leftright = false;
        }

    } else if (evt.code == 'KeyS' || evt.which == '40') {
        if (player.upDown == undefined) {
            player.upDown = false;
        }

        player.leftright = undefined;


    } else if (evt.code == 'KeyR') {
        player.upDown = undefined;
        player.leftright = undefined;
    }


};
setInterval(player.LongMove, 1000);