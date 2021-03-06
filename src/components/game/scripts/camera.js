const MAX_ZOOM = 3;
const MIN_ZOOM = 0.3;
const SCROLL_SENSITIVITY = 0.0005;

let isDragging = false;
let dragStart = { x: 0, y: 0 };

let cameraOffset = { x: window.innerWidth/2 + 700, y: window.innerHeight/2 + 800 };
let cameraZoom = 1;

let initialPinchDistance = null;
let lastZoom = cameraZoom;

function getEventLocation(e) {
    if (e.touches && e.touches.length === 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }        
    }
}

function onPointerDown(e) {
    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
}

function onPointerUp(e) {
    isDragging = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}

function onPointerMove(e) {
    if (isDragging)
    {
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
    }
}

function handleTouch(e, singleTouchHandler) {
    if ( e.touches.length === 1 )
    {
        singleTouchHandler(e)
    }
    else if (e.type === "touchmove" && e.touches.length === 2)
    {
        isDragging = false
        handlePinch(e)
    }
}

function handlePinch(e) {
    e.preventDefault()
    
    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
    
    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
    
    if (initialPinchDistance == null)
    {
        initialPinchDistance = currentDistance
    }
    else
    {
        adjustZoom( null, currentDistance/initialPinchDistance )
    }
}

function adjustZoom(zoomAmount, zoomFactor) {
    if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom -= zoomAmount
        }
        else if (zoomFactor)
        {
            cameraZoom = zoomFactor*lastZoom
        }
        
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
        
    }
}


export {SCROLL_SENSITIVITY, cameraZoom, cameraOffset, adjustZoom, onPointerDown, handleTouch, onPointerUp, onPointerMove};