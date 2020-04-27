function moveZeroes(nums: Array<number>): Array<number> {
    console.log(nums)
    let n = nums.length
    let nxt = 0
    for(let x of nums) {
        if(x != 0) {
            nums[nxt] = x
            nxt++
        }
    }
    nums.fill(0, nxt)
    console.log(nums)
    return nums
}

moveZeroes([651,0,6505,45,10,56,0,4])