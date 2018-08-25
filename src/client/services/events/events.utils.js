// Returns new options array with multiplier prop
// for each option
export function calculateOdds(options) {
  // options = [{name: ..., pool: ...}]
  const totalPool = options.reduce((acc, option) => acc + option.pool, 0);
  return options.map(option => {
    if(totalPool === 0 || option.pool === 0)
      return {
        ...option,
        multiplier: 1,
        odds: 0
      }
    
    return {
      ...option,
      multiplier: totalPool / option.pool,
      odds: (option.pool / totalPool * 100).toFixed(2)
    }
  })
}
