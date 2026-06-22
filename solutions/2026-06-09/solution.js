/**
 * Day 14: Best Time to Buy and Sell Stock
 *
 * Find max profit from one buy and one sell.
 * Track minimum price seen so far, compute profit at each step.
 * O(n) time, O(1) space.
 */
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      const profit = price - minPrice;
      if (profit > maxProfit) maxProfit = profit;
    }
  }

  return maxProfit;
}

// Tests
console.log(maxProfit([7,1,5,3,6,4])); // 5 (buy@1, sell@6)
console.log(maxProfit([7,6,4,3,1]));   // 0 (no profit possible)
console.log(maxProfit([2,4,1]));        // 2 (buy@2, sell@4)
console.log(maxProfit([1]));            // 0
console.log(maxProfit([3,3,3]));        // 0

/**
 * Greedy: at each price, either update the minimum or check profit.
 * Single pass — no nested loops needed.
 */
