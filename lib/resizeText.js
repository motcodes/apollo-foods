const isTextOverflown = (parent, child) =>
  parent.scrollHeight > parent.clientHeight ||
  child.scrollHeight > child.clientHeight ||
  child.scrollHeight > parent.clientHeight ||
  child.scrollHeight > parent.scrollHeight ||
  child.clientHeight > parent.clientHeight ||
  child.clientHeight > parent.scrollHeight

const fitText = ({
  element,
  minSize = 14,
  maxSize = 48,
  step = 1,
  unit = 'px',
}) => {
  let i = minSize
  let overflow = false
  let newSize = i

  const parent = element.parentNode
  // const clientH = parent.clientHeight
  // const scrollH = parent.scrollHeight
  // console.log('clientHeight Parent :', clientH)
  // console.log('scrollHeight Parent :', scrollH)
  // console.log('scrollHeight Text:', element.scrollHeight)
  // console.log('clientHeight Text:', element.clientHeight)

  while (!overflow && i < maxSize) {
    element.style.fontSize = `${i}${unit}`
    // newSize = i
    overflow = isTextOverflown(parent, element)
    if (!overflow) {
      i += step
    }
    overflow = isTextOverflown(parent, element)
  }
  newSize = i

  element.style.fontSize = `${newSize}${unit}`
  // console.log(newSize)
}

const throttle = (fn, timeFrame) => {
  let lastTime = 0
  return (...args) => {
    const now = new Date()
    if (now - lastTime >= timeFrame) {
      fn(...args)
      lastTime = now
    }
  }
}

export const resizeText = throttle(fitText, 25)
