export function calculateUnrestPenalty(unrest: number): number {
    if (unrest < 1) {
        return 0;
    } else if (unrest < 4) {
        return 1;
    } else if (unrest < 8) {
        return 2;
    } else if (unrest < 12) {
        return 3;
    } else {
        return 4;
    }
}
