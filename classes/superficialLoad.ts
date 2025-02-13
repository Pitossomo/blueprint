export default class SuperficialLoad {
    permanent: number;
    accidental: number;

    constructor(permanent: number, accidental: number) {
        this.permanent = permanent || 0;
        this.accidental = accidental || 0;
    }

    getPermanentLoad(): number { return this.permanent }
    getAccidentalLoad(): number { return this.accidental }
}