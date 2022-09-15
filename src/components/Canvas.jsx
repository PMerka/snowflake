import React, { useEffect, useRef } from 'react'

export default function Canvas({canvasRef, canvasWrapperRef}) {
    return (
    <div>
      <canvas ref={canvasRef} id="main-canvas">
      </canvas>
    </div>
  )
}