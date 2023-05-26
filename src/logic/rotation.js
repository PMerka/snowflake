/**
 * Creates rotation object, witch can rotate any 2d vector (array) by angle 
 */
export default class Rotation{
    constructor(angle){
        this.cosP = Math.cos(angle)
        this.sinP = Math.sin(angle)
    }

    /**
     * @param {Number[]} vector (with 2 elements)
     * @returns {Array} rotated vector
     */
    rotate(vector){
       const x = vector[0] * this.cosP + vector[1] * this.sinP
       const y =  - vector[0] * this.sinP + vector[1] * this.cosP
       const vectorRotated =[x, y]
       return vectorRotated
    }
}