var test;

var testsnake;
window.onload = () => {
    /*  add var to the code  */

    let userid;

    var box0 = document.getElementById("Monster0");

    var box1 = document.getElementById("Monster1");

    var box2 = document.getElementById("Monster2");

    var box3 = document.getElementById("Monster3");

    var count = document.getElementById("count");

    var Contaener = document.getElementById("con");

    var soundnum = document.getElementById("nuum");

    var soundtelport = document.getElementById('telport');

    var soundBoom = document.getElementById("Sboom");

    var users = document.getElementById('ontheserver');
    let amountusersontheservers = 0;

    let pos1 = { x: 0, y: 0 };

    let pos2 = { x: 100, y: 100 };

    let pos3 = { x: 200, y: 200 };

    let pos4 = { x: 300, y: 300 };


    let countpoint = 0;

    count.innerText = countpoint;

    class Tools {
        constructor() {

        }
        static randomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        static getRandomColor = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };
        static cheakaroundme = (x, y, sizex, sizey = sizex, map) => {
            for (let i = y; i < y + sizex; i++) {
                for (let j = x; j < x + sizex; j++) {
                    if (map.World[i][j] != undefined) {
                        return false;
                    }

                }
            }
            return true;
        }
    }

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

    class Fruit {
        constructor(map, parent) {
            this.xf = 500;
            this.yf = 40;
            this.fruit = document.createElement("div");
            this.fruit.setAttribute("id", "fruitID");

            parent.appendChild(this.fruit);
            this.beenEat = true;
            this.LogicMapFruit = map;
            this.LogicMapFruit.AddToTheMap(this.yf, this.xf, 2, 15)
            this.UpdateFrutiPos();

        }

        UpdateFrutiPos = () => {
            if (this.beenEat) {
                this.LogicMapFruit.RemoveFromTheMap(this.yf, this.xf, 15);
                this.PlaceFruitOnTheWorld();
                this.UpdatePos;

            }

        }
        CheakFruitRandom = (x, y) => {
            for (let i = y; i < y + 15; i++) {
                for (let j = x; j < x + 15; j++) {
                    if (this.LogicMapFruit.World[i][j] != undefined) {
                        return false;
                    }

                }
            }
            return true;
        }

        PlaceFruitOnTheWorld = () => {
            while (this.beenEat) {
                this.xf = Tools.randomInteger(100, 789);
                this.yf = Tools.randomInteger(100, 789);
                if (this.CheakFruitRandom(this.xf, this.yf)) {
                    this.LogicMapFruit.AddToTheMap(this.yf, this.xf, 2, 15);
                    this.fruit.style.top = this.yf + "px";
                    this.fruit.style.left = this.xf + "px";
                    this.beenEat = false;
                    break;
                }
            }
        }
    }


    class Snake {
        constructor(id, tagclass, parent, counterPoints, wolrdlogic, frutyy) {
            this.id = id;
            this.myElement = document.createElement("div");
            this.myElement.setAttribute("id", this.id);
            this.myElement.setAttribute("class", tagclass);
            this.Parent = parent;
            parent.appendChild(this.myElement);
            this.X = 500;
            this.y = 40;
            this.bodycount = 0;
            this.upDown = undefined;
            this.leftright = undefined;
            this.LogicMap = wolrdlogic;
            this.pointsGain = counterPoints;
            this.frutyY = frutyy;
            this.oldx;
            this.oldy;
            this.moves = [];
            this.spown = true;
        }
        DidiGoOutOfTheMap = () => {

            if (this.y <= 15) {
                soundtelport.play();
                this.y = 960;
            } else if (this.y >= 959) {
                soundtelport.play();
                this.y = 20;
            } else if (this.X >= 959) {
                soundtelport.play();
                this.X = 20;
            } else if (this.X <= 10) {
                soundtelport.play();
                this.X = 968;
            }
        }

        CheaksnakeRandom = (x, y) => {
            for (let i = y; i < y + 25; i++) {
                for (let j = x; j < x + 25; j++) {
                    if (this.LogicMap.World[i][j] != undefined) {
                        return false;
                    }

                }
            }
            return true;
        }
        Hitcherry = () => {
            soundnum.play();
            console.log("cherry");
            this.frutyY.beenEat = true;
            this.frutyY.UpdateFrutiPos();
            countpoint++;
            count.innerText = countpoint;
            this.AddBodysSnake();
        }
        HitWall = () => {
            soundBoom.play();
            console.log("hit");
            this.Reasat();

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
        GetOldPos = (place) => {
            let posToTake = this.moves.length - 1 - place;
            return this.moves[posToTake].split(" ");

        }
        Reasat = () => {
            for (let i = 1; i <= countpoint; i++) {
                var body = document.getElementById("body" + i);
                body.remove();

            }
            this.bodycount = 0;
            countpoint = 0;
            count.innerText = countpoint;
            this.spown = true;
            this.createSnake();
        }
        AddBodysSnake = () => {
            this.bodycount++;
            var body = document.createElement("div");
            body.setAttribute("id", "body" + this.bodycount);
            body.setAttribute("class", "Body");
            this.Parent.appendChild(body);
            this.createSnake();
        }
        StopMove() {
            this.upDown = undefined;
            this.leftright = undefined;
        }
        UpdateBody = () => {
            if (countpoint > 0) {
                for (let i = 1; i <= countpoint; i++) {
                    var body = document.getElementById("body" + i);
                    let XAndY = this.GetOldPos(i)
                    let xB = XAndY[0];
                    let yB = XAndY[1];
                    if (this.upDown == true)
                        if (i == 1) { body.style.backgroundImage = "url('img/body2W.png')" }
                    if (this.upDown == false)
                        if (i == 1) { body.style.backgroundImage = "url('img/body2S.png')" }
                    if (this.leftright == true)
                        if (i == 1) { body.style.backgroundImage = "url('img/body2D.png')" }
                    if (this.leftright == false)
                        if (i == 1) { body.style.backgroundImage = "url('img/body2A.png')" }
                    if (this.X == xB && this.y == yB) this.HitWall();
                    body.style.left = xB + "px";
                    body.style.top = yB + "px";
                }
            }
        }
        createSnake = () => {
            if (this.spown) {
                while (true) {
                    let x = Tools.randomInteger(50, 700);
                    let y = Tools.randomInteger(50, 750);
                    if (this.CheaksnakeRandom(x, y)) {
                        this.X = x;
                        this.y = y;
                        this.myElement.style.top = y + "px";
                        this.myElement.style.left = x + "px";
                        this.spown = false;
                        break;
                    }
                }
            }
        }
        CreateStringXY = (x, y) => {
            return x.toString() + " " + y.toString();
        }
        Logic = (d) => {
            let tag;
            if (d == "d" && this.X < 1000) {
                tag = this.LogicMap.DidIHit(this.X + 20, this.y, 20, 0);
                if (tag == undefined) {
                    this.X += 10;
                    this.myElement.style.left = this.X + "px";
                    this.myElement.style.top = this.y + "px";
                    this.moves.push(this.CreateStringXY(this.X, this.y))
                    this.myElement.style.backgroundImage = "url('img/snakeD.png')";

                } else { this.HitFuns(tag); }
            } else if (d == "a" && this.X > 0) {
                tag = this.LogicMap.DidIHit(this.X, this.y, 20, 0);
                if (tag == undefined) {
                    this.X -= 10;
                    this.myElement.style.left = this.X + "px";
                    this.myElement.style.top = this.y + "px";
                    this.moves.push(this.CreateStringXY(this.X, this.y))
                    this.myElement.style.backgroundImage = "url('img/snakeA.png')";
                } else { this.HitFuns(tag); }
            } else if (d == "w" && this.y > 0) {
                tag = this.LogicMap.DidIHit(this.X, this.y, 0, 20);
                if (tag == undefined) {
                    this.y -= 10;
                    this.myElement.style.left = this.X + "px";
                    this.myElement.style.top = this.y + "px";
                    this.moves.push(this.CreateStringXY(this.X, this.y))
                    this.myElement.style.backgroundImage = "url('img/snakeW.png')";
                } else { this.HitFuns(tag); }
            } else if (d == "s" && this.y < 1000) {
                tag = this.LogicMap.DidIHit(this.X, this.y + 20, 0, 20);
                if (tag == undefined) {
                    this.y += 10;
                    this.myElement.style.left = this.X + "px";
                    this.myElement.style.top = this.y + "px";
                    this.moves.push(this.CreateStringXY(this.X, this.y))
                    this.myElement.style.backgroundImage = "url('img/snakeS.png')";
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


    let WorldMap = new WorldC(1000, 1000);
    test = WorldMap;


    /*  add function to the code  */
    moveb1 = (obj, pos, xstart, ystart, xend, yend) => {
        if (pos.y == ystart && pos.x < xend) {
            pos.x += 1;
            obj.innerHTML = '<img height="50" width="50" src="assets/img/virus.png ">';
            obj.style.left = pos.x + "px";
        } else if (pos.x == xend && pos.y < yend) {
            pos.y += 1;
            obj.innerHTML = '<img height="50" width="50" src="assets/img/insect.png ">';
            obj.style.top = pos.y + "px";
        } else if (pos.y == yend && pos.x > xstart) {
            pos.x -= 1;
            obj.innerHTML = '<img height="50" width="50" src="assets/img/biohazard.png ">';
            obj.style.left = pos.x + "px";
        } else if (pos.x == xstart && pos.y > ystart) {
            pos.y -= 1;
            obj.innerHTML = '<img height="50" width="50" src="assets/img/bat.png ">';
            obj.style.top = pos.y + "px";
        }
        PlaceFruitOnTheWorld();

    };

    CreateRandomAmoutOfWalls = (map) => {
        var amoutElemnts = Tools.randomInteger(70, 150);

        for (let i = 0; i < amoutElemnts; i++) {
            let div = document.createElement("walls");
            div.setAttribute("id", "wall" + i);
            div.setAttribute("class", "wall");
            document.getElementById("con").appendChild(div);

        }
        for (let i = 0; i < amoutElemnts; i++) {
            let xSt = Tools.randomInteger(20, 960);
            let ySt = Tools.randomInteger(60, 950);
            while (true) {
                let x = Tools.randomInteger(20, 960);
                let y = Tools.randomInteger(60, 850);
                if (Tools.cheakaroundme(x, y, 35, 35, map)) {
                    xSt = x;
                    ySt = y;

                    break;
                }
            }
            let div = document.getElementById("wall" + i);
            div.style.backgroundColor = Tools.getRandomColor();
            div.style.left = xSt + "px";
            div.style.top = ySt + "px";
            div.style.position = "absolute";
            div.style.width = "20px";
            div.style.height = "20px";
            map.AddToTheMap(ySt, xSt, 1, 20);
        }

    }


    document.onkeypress = (evt) => {
        evt = evt || window.event;
        if (evt.code == 'KeyW' || evt.which == '38') {
            if (SnakeHead.upDown == undefined) {
                SnakeHead.upDown = true;
            }
            SnakeHead.leftright = undefined;


        } else if (evt.code == "KeyD" || evt.which == '39') {

            SnakeHead.upDown = undefined;
            if (SnakeHead.leftright == undefined) {
                SnakeHead.leftright = true;
            }

        } else if (evt.code == 'KeyA' || evt.which == '37') {
            SnakeHead.upDown = undefined;
            if (SnakeHead.leftright == undefined) {
                SnakeHead.leftright = false;
            }

        } else if (evt.code == 'KeyS' || evt.which == '40') {
            if (SnakeHead.upDown == undefined) {
                SnakeHead.upDown = false;
            }

            SnakeHead.leftright = undefined;


        } else if (evt.code == 'KeyR') {
            SnakeHead.upDown = undefined;
            SnakeHead.leftright = undefined;
        }


    };


    // function howmanyplayes() {


    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.open("GET", 'http://84.108.78.137:1029/getusers', true); // false for synchronous request

    //     xmlHttp.onload = function() {
    //         if (xmlHttp.readyState === 4) {
    //             if (xmlHttp.status == 200) {
    //                 userid = xmlHttp.responseText;

    //                 users.innerText = xmlHttp.responseText;
    //             } else {
    //                 console.log(xmlHttp.statusText);
    //             }
    //         }
    //     };
    //     xmlHttp.send();

    // }

    // function iamInTheServer() {
    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.open("POST", 'http://84.108.78.137:1029/updatecount', true);
    //     xmlHttp.setRequestHeader('Content-type', 'application/body');

    //     let data = new FormData();
    //     data.append({ "user": "dada" });

    //     xmlHttp.send({ user: "dada" });
    // }

    // setInterval(iamInTheServer, 2000);
    // setInterval(howmanyplayes, 2000);

    CreateRandomAmoutOfWalls(WorldMap);
    /*  active code to the page  */
    let RealFruty = new Fruit(WorldMap, Contaener);
    var SnakeHead = new Snake("head", "SnakeHead", Contaener, countpoint, WorldMap, RealFruty);
    testsnake = SnakeHead;
    SnakeHead.createSnake();
    setTimeout(SnakeHead.LongMove);
    //setInterval(moveb1,1,box1,pos1,0,0,900,900);
    //setInterval(moveb1,1,box2,pos2,100,100,800,800);
    // setInterval(moveb1,1,box3,pos3,200,200,700,700);
    // setInterval(moveb1,1,box4,pos4,300,300,600,600);


};

function loadDoc() {
    countpoint = 10;
    var count = document.getElementById("count");
    count.innerText = countpoint;
}