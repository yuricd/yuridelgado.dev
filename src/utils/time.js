export const calculateReadingTime = (words) => {
  return Math.round(words/234)
}

export const sleep = (ms) => {
  return new Promise((r => setTimeout(r, ms)))
}