/*
- start move end
- pressstart pressend
- tap
- panstart pan panend
 */

export function enableGesture (elem) {
  console.log(elem)
  const context = {}
  const MOUSE_TYPE = Symbol('mouse')
  if (!('ontouchstart' in document)) {
    elem.addEventListener('mousedown', (e) => {
      context[MOUSE_TYPE] = {}
      onStart(e, context[MOUSE_TYPE])
      const move = (event) => {
        context[MOUSE_TYPE].stop = () => {
          event.preventDefault()
        }
        onMove(event, context[MOUSE_TYPE])
      }
      const end = (event) => {
        onEnd(event, context[MOUSE_TYPE])
        document.removeEventListener('mousemove', move)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', end, { once: true })
    })
  }
  elem.addEventListener('touchstart', (e) => {
    for (const touch of e.changedTouches) {
      context[touch.identifier] = {}
      onStart(touch, context[touch.identifier])
    }
  })
  elem.addEventListener('touchmove', (e) => {
    const stop = () => {
      e.preventDefault()
    }
    for (const touch of e.changedTouches) {
      context[touch.identifier].stop = stop
      onMove(touch, context[touch.identifier])
    }
  })
  elem.addEventListener('touchend', (e) => {
    for (const touch of e.changedTouches) {
      onEnd(touch, context[touch.identifier])
      delete context[touch.identifier]
    }
  })
  const onStart = (e, context) => {
    elem.dispatchEvent(Object.assign(new CustomEvent('start'), {
      clientX: e.clientX,
      clientY: e.clientY
    }))
    context.isTap = true
    context.startX = e.clientX
    context.startY = e.clientY
    clearTimeout(context.timeout)
    context.timeout = setTimeout(() => {
      context.isTap = false
      context.isPress = true
      elem.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {
        clientX: e.clientX,
        clientY: e.clientY
      }))
    }, 500)
  }
  const onMove = (e, context) => {
    const dx = e.clientX - context.clientX
    const dy = e.clientY - context.clientY
    elem.dispatchEvent(Object.assign(new CustomEvent('move'), {
      clientX: e.clientX,
      clientY: e.clientY
    }))
    if (dx ** 2 + dy ** 2 > 100 && !(context.isPan)) {
      context.isPan = true
      if (context.isPress) {
        elem.dispatchEvent(Object.assign(new CustomEvent('presscancel'), {
          clientX: e.clientX,
          clientY: e.clientY
        }))
      }
      clearTimeout(context.timeout)
      context.isTap = false
      context.isPress = false
      elem.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
        clientX: e.clientX,
        clientY: e.clientY,
        startX: context.startX,
        startY: context.startY,
        stop: context.stop
      }))
      return
    }
    if (context.isPan) {
      elem.dispatchEvent(Object.assign(new CustomEvent('pan'), {
        clientX: e.clientX,
        clientY: e.clientY,
        startX: context.startX,
        startY: context.startY,
        stop: context.stop
      }))
    }
  }
  const onEnd = (e, context) => {
    clearTimeout(context.timeout)
    if (context.isPan) {
      elem.dispatchEvent(Object.assign(new CustomEvent('panend'), {
        clientX: e.clientX,
        clientY: e.clientY,
        startX: context.startX,
        startY: context.startY
      }))
      context.isPan = false
    }
    if (context.isTap) {
      elem.dispatchEvent(Object.assign(new CustomEvent('tap'), {
        clientX: e.clientX,
        clientY: e.clientY
      }))
      context.isTap = false
    }
    if (context.isPress) {
      elem.dispatchEvent(Object.assign(new CustomEvent('pressend'), {
        clientX: e.clientX,
        clientY: e.clientY
      }))
      context.isPress = false
    }
    elem.dispatchEvent(Object.assign(new CustomEvent('end'), {
      clientX: e.clientX,
      clientY: e.clientY
    }))
  }
}
