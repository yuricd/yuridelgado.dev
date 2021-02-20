
export function getHighlights(content) {
  const occurrences = content.split('"""')
  console.log(content)
  const highlights = occurrences.reduce((agg, curr, idx) => {
    if (idx % 2 !== 0) {
      return [...agg, curr]
    }
    return agg
  }, []) 

  return highlights
}

export function clearHighlightsMark(content) {
  return content.replaceAll('"""', '')
}