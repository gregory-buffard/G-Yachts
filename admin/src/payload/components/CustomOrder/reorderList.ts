const _reorderForward = <T>(l: T[], start: number, end: number) => {
  const temp = l[start]

  for (let i = start; i < end; i++) {
    if (i + 1 < l.length) l[i] = l[i + 1]
  }

  l[end - 1] = temp

  return l
}

const _reorderBackward = <T>(l: T[], start: number, end: number) => {
  const temp = l[start]

  for (let i = start; i > end; i--) {
    if (i > 0) l[i] = l[i - 1]
  }

  l[end] = temp

  return l
}

const reorderList = <T>(l: T[], startIndex: number, endIndex: number) => {
  if (startIndex < endIndex) return _reorderForward(l.slice(), startIndex, endIndex)
  else if (startIndex > endIndex) return _reorderBackward(l.slice(), startIndex, endIndex)
  else return l
}

export default reorderList
