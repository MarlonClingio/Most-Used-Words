module.exports = rows => {
  return new Promise((resolver, reject) => {
    try {
      const words = rows
        .filter(filterValidRow)
        .map(removePunctuation)
        .map(removeTags)
        .reduce(mergeRows)
        .split(' ')
        .map(word => word.toLowerCase())
        .map(word => word.replace('"', ''))

      resolver(rows)
    } catch (e) {
      reject(e)
    }
  })
}

function filterValidRow(row) {
  const notNumber = !parseInt(row.trim())
  const notInterval = !row.includes('-->')
  const notEmpty = !!row.trim()
  return notNumber && notEmpty && notInterval
}

const removePunctuation = row => row.replace(/[,?!._-:]/g, '')
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim()
const mergeRows = row => (fullText, row) => `${fullText} ${row}`