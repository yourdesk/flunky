const DiceFlags = {
    None: 0,
    TakeHighest: 1,
    DropHighest: 2,
    TakeLowest: 3,
    DropLowest: 4
};

class RNG {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    getRand(n = 1) {
        this.buf = new Uint32Array(n);
        crypto.getRandomValues(this.buf);
        return this.buf.map(n => (n % ((this.max + 1) - this.min)) + this.min);
    }
}

const sum = arr => arr.reduce((a, b) => a + b);
const dropLowest = arr => arr.filter(x => x != Math.min(arr));
const dropHighest = arr => arr.filter(x => x != Math.max(arr));
const joinString = arr => arr.reduce((a, b) => a + b);

function get(arr, idx) {
    if (idx < 0) {
        return arr[arr.length + idx];
    }
    return arr[idx];
}

class DiceFlagHandler {
    constructor(arr) {
        this.arr = arr;
        this.conversionTable = {
            'd': DiceFlags.None,
            'd!': DiceFlags.TakeHighest,
            'd*': DiceFlags.DropHighest,
            'd_': DiceFlags.TakeLowest,
            'd@': DiceFlags.DropLowest
        };
    }

    convert(flagStr) {
        return this.conversionTable[flagStr];
    }

    getFromFlag(flag) {
        const A = this.arr;
        switch (flag) {
            case DiceFlags.None:
                return sum(A);
            case DiceFlags.TakeHighest:
                return Math.max(...A);
            case DiceFlags.TakeLowest:
                return Math.min(...A);
            case DiceFlags.DropHighest:
                return dropHighest(A);
            case DiceFlags.DropLowest:
                return dropLowest(A);
            default:
                return sum(A);
        }
    }
}

class DiceParser {
    constructor(dice) {
        this.dice = dice;
    }

    parse() {
        let t = [];
        const m = Array.from(this.dice.matchAll(/(\d+)(d)([^\d]+)?(\d+)/gm));
        m.forEach(e => {
            t.push([...e.slice(1), e[0]]);
        });
        this.m = t;
        return t;
    }

    format() {
        let curEq = this.dice;
        const r = this.m.map(e => e.slice(-1));
        for (let i = 0; i < r.length; i++) {
            curEq = curEq.replace(r[i], `$${i}`);
        }
        return curEq.replace(';', '');
    }
}

class DiceRoller {
    constructor(dice) {
        this.dice = dice;
        let x = new DiceParser(dice);
        this.m = x.parse();
        this.eq = x.format();
    }

    roll(e = true) {
        let n = this.eq;
        let i = 0;
        for (const d of this.m) {
            const rand = new RNG(1, parseInt(get(d, -2)));
            const nums = rand.getRand(parseInt(d[0]));
            const flagHandler = new DiceFlagHandler(nums);
            const flagStr = joinString(d.slice(1, -2));
            const flag = flagHandler.convert(flagStr);
            const num = flagHandler.getFromFlag(flag);
            n = n.replace(`$${i}`, num.toString());
            i++;
        }

        return e ? eval(n) : n;
    }
}

class Dice {
    constructor(dice) {
        this.dice = dice;
        this.roller = new DiceRoller(dice);
    }

    roll(e = true) {
        return this.roller.roll(e = e);
    }

    rollN(n, e = true) {
        let t = [];
        for (let i = 0; i < n; i++) {
            t.push(this.roll(e = e));
        }
        return t;
    }
}