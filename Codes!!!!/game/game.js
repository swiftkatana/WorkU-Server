class wepon {
    constructor(dmg, range, size, name, id) {
        this.dmg = dmg;
        this.id = id;
        this.name = name;
        this.range = range;
        this.size = size;
    }

    Shooting(m, pos, mPos) {
        function update() {

        }



        m.add();
    }
}

function mul(a, b) {
    let res = 0;
    for (let i = 0; i < b; i++) {

        res += a;

    }
    console.log(res);
}
mul(5, 2);