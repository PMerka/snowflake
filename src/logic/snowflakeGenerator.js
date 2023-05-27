import Branch from "./branch"

//for async
function nextFrame() {
    return new Promise((res) => {
         requestAnimationFrame(() => res())
    });
}

export class Drawing{
    constructor(ctx, length=200, setStatus){
        this.ctx = ctx
        this.length = length
        this.arrayOfBranches = []
        this.maxArraySize = 300000
        this.running = false
        this.setStatus = setStatus
        this.iterationsPerFrame = 200
    }

    update(settings){
        
        if (this.arrayOfBranches.length !== 0){
            this.nextIteration(settings)
        }
        else{
            //initialization
            this.arrayOfBranches = [new Branch([0, 0], [this.length, 0], this.ctx)]
        }
    }

    async nextIteration(settings){
        if(this.running){
            return
        }
        this.running = true
        this.setStatus(true)
        let newBrancheches = [] 
        if (this.ctx.lineWidth > 2){
            this.ctx.lineWidth = this.ctx.lineWidth*2/3
        } 
        for(let i = 0; i < this.arrayOfBranches.length; i++){
            // allows to update UI after some iterations
            if (i % this.iterationsPerFrame === 0){
                await nextFrame()
            }
            const newBranch = this.arrayOfBranches[i].getNewBranches(settings)
            newBrancheches.push(...newBranch)
        }
        this.arrayOfBranches = newBrancheches
        console.log("array", this.arrayOfBranches.length)
        this.running = false
        this.setStatus(false)
    }
}