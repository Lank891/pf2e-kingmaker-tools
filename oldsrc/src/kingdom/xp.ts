export function calculateHexXP(
    {
        hexes,
        kingdomSize,
        useVK,
        xpPerClaimedHex,
    }: {
        hexes: number,
        xpPerClaimedHex: number,
        kingdomSize: number,
        useVK: boolean
    },
): number {
    if (useVK) {
        if (kingdomSize < 10) {
            return hexes * 80;
        } else if (kingdomSize < 25) {
            return hexes * 50;
        } else if (kingdomSize < 50) {
            return hexes * 25;
        } else if (kingdomSize < 100) {
            return hexes * 10;
        } else {
            return hexes * 5;
        }
    } else {
        return hexes * xpPerClaimedHex;
    }
}

export function calculateRpXP(
    {
        rp,
        kingdomLevel,
        rpToXpConversionRate,
        rpToXpConversionLimit,
        useVK,
    }: {
        rp: number,
        kingdomLevel: number,
        rpToXpConversionRate: number,
        rpToXpConversionLimit: number,
        useVK: boolean
    },
): number {
    let xp = 0;
    if (useVK) {
        if (kingdomLevel < 5) {
            xp = rp * 8;
        } else if (kingdomLevel < 9) {
            xp = rp * 6;
        } else if (kingdomLevel < 13) {
            xp = rp * 4;
        } else if (kingdomLevel < 17) {
            xp = rp * 2;
        }
    } else {
        xp = rp * rpToXpConversionRate;
    }
    return Math.min(rpToXpConversionLimit, xp);
}

export function calculateEventXP(modifier: number): number {
    const xp: Record<string, number> = {
        '-4': 10,
        '-3': 15,
        '-2': 20,
        '-1': 30,
        '0': 30,
        '1': 30,
        '2': 40,
        '3': 60,
        '4': 80,
    };
    const key = `${modifier}`;
    if (key in xp) {
        return xp[key];
    } else {
        return 0;
    }
}
