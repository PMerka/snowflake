export class Animation{  
    constructor(iterationPerFrame){
        this.iterationPerFrame = iterationPerFrame
    }
    
    setCanvasRef(ctx, initialLineLength=200, setAnimationState){
        this.ctx = ctx
        this.lineLength = initialLineLength
        this.setAnimationState = setAnimationState
        this.running = false
    }
}