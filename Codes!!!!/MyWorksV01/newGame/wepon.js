class Wepon {
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
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