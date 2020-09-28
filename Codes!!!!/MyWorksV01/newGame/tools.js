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



exports.Tools = Tools;