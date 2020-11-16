/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffleArray(a: any[]) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function getRandomElementsFromArray(arr: any[], n) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len) {
        throw new RangeError('getRandom: more elements taken than available');
    }
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
