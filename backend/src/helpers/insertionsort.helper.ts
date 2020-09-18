export default function insertionSort (arr) {
    for (let i = 1, l = arr.length; i < l; i++) {
        const current = arr[i]
        let j = i
        while (j > 0 && arr[j - 1] > current) {
            arr[j] = arr[j - 1]
            j--;
        }
        arr[j] = current
    }
    return arr
}