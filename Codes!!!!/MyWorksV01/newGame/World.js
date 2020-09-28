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