export class Rotation{
    constructor(angle){
        this.cosP = Math.cos(angle)
        this.sinP = Math.sin(angle)
    }

    rotate(vector){
       const x = vector[0] * this.cosP + vector[1] * this.sinP
       const y =  - vector[0] * this.sinP + vector[1] * this.cosP
       return [x, y]
    }
}

export const rotateBy0 = new Rotation(0)
export const rotateBy60 = new Rotation(Math.PI * 2 / 6)
export const rotateByM60 = new Rotation(-Math.PI * 2 / 6)

export class Branch{
    constructor(start, vector, ctx){
        this.start = start
        this.vector = vector
        this.ctx = ctx       
        this.draw(0)
        this.draw(rotateBy60)
        this.draw(rotateByM60)

    }

    draw(rotation){
        //draw the branch rotated by "rotation" matrix
        let start = this.start
        let vector = this.vector
        if (rotation !== 0){
            start = rotation.rotate(this.start)
            vector = rotation.rotate(this.vector)
        }
    
        this.ctx.beginPath();
        this.ctx.moveTo(start[0], start[1]);
        this.ctx.lineTo(start[0] + vector[0] , start[1] + vector[1] )
        this.ctx.stroke()

        this.ctx.beginPath();
        this.ctx.moveTo(-start[0], -start[1]);
        this.ctx.lineTo(-start[0] - vector[0] , -start[1] - vector[1] )
        this.ctx.stroke()
        
    }

    getNewBranch(setting){
        const [rotateByAngleP, rotateByAngleN, r, l] = [setting.rotationP, setting.rotationN, setting.distance/100, setting.length/100]
        const newStar = [this.start[0] + r*this.vector[0] , this.start[1] + r*this.vector[1]]
        let newVector1 = rotateByAngleP.rotate(this.vector)
        newVector1 = [l*newVector1[0], l*newVector1[1]]

        let newVector2 = rotateByAngleN.rotate(this.vector)
        newVector2 = [l*newVector2[0], l*newVector2[1]]
        let newBranches = [new Branch(newStar, newVector1, this.ctx), new Branch(newStar, newVector2, this.ctx)]
        return newBranches
    }

    getNewBranches(settings){
        let newBranches = []
        settings.forEach(setting => {
            const newBranch = this.getNewBranch(setting)
            newBranches.push(...newBranch)
        });
        return newBranches
    }

}

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
        
        if (this.arrayOfBranches.length > 0){
            this.nextIteration(settings)
        }
        else{
            //initialization
            this.arrayOfBranches = [new Branch([0, 0], [this.length, 0], this.ctx)]
        }
    }

    async nextIteration(settings){
        let count = 0;
        if(this.running){
            console.log("Alredy running")
            return "working"
        }
        this.running = true
        this.setStatus(true)
        this.depth += 1
        let newBrancheches = [] 
        if (this.ctx.lineWidth > 2){
            this.ctx.lineWidth = this.ctx.lineWidth*2/3
        } 
        for(let i = 0; i < this.arrayOfBranches.length; i++){
            // allows to update ui after some iterations and prevent of blocking the thread
            if (++count % this.iterationsPerFrame === 0){
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