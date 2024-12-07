export function checkCollision(firstObj, secObj) {

    const foLeft = firstObj.getBoundingClientRect().left
    const foTop = firstObj.getBoundingClientRect().top
    const foHeight = firstObj.getBoundingClientRect().height
    const foWidth = firstObj.getBoundingClientRect().width
  
    const soLeft = secObj.getBoundingClientRect().left
    const soTop = secObj.getBoundingClientRect().top
    const soHeight = secObj.getBoundingClientRect().height
    const soWidth = secObj.getBoundingClientRect().width
  
    if (foLeft + foWidth  >= soLeft && foLeft <= soLeft + soWidth && foTop + foHeight >= soTop && foTop <= soTop + soHeight) 
        return true
    else
        return false
  
  }