import Rotation from "./rotation"

export const rotateBy60 = new Rotation(Math.PI * 2 / 6)
export const rotateByM60 = new Rotation(-Math.PI * 2 / 6)

export default class Branch{
    /**
     * 
     * @param {[Number, Number]} start (position where to start)
     * @param {[Number, Number]} vector (vector representing the line)
     * @param {CanvasRenderingContext2D} ctx CanvasRenderingContext2D
     */
    constructor(start, vector, ctx){
        this.start = start
        this.vector = vector
        this.ctx = ctx 
        // draw all branches 3 
        this.draw(0)
        this.draw(rotateBy60)
        this.draw(rotateByM60)
    }

    draw(rotation){
        //draw the branch rotated by "rotation" matrix and mirror image of this branch
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
        const newStart = [this.start[0] + r*this.vector[0] , this.start[1] + r*this.vector[1]]
        let newVector1 = rotateByAngleP.rotate(this.vector)
        newVector1 = [l*newVector1[0], l*newVector1[1]]

        let newVector2 = rotateByAngleN.rotate(this.vector)
        newVector2 = [l*newVector2[0], l*newVector2[1]]
        let newBranches = [new Branch(newStart, newVector1, this.ctx), new Branch(newStart, newVector2, this.ctx)]
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