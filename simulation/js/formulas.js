const pie = 3.1428
const Formulas = {  
    
    one_minus_D(D){
        return 1 - D
    },
    r_load : {
        v0(values){
            let rootPart = 1 - (values.D / pie) + (Math.sin( 2 * values.D ) / (2 * pie))
            let ans = values.vIn * Math.sqrt(parseFloat(rootPart))
            return Number(ans).toFixed(4)
        },
        pf(values){
            let ans = (
                Math.sqrt(1- (values.D /pie) + (Math.sin(2*values.D) / (2*pie) ))
            )
            return Number(ans).toFixed(4)
        },
        i0(values){ 
            let ans = this.v0(values) / values.R;
            return Number(ans).toFixed(4)
        },   
        p0(values){
            let ans = this.v0(values) * this.i0(values);
            return Number(ans).toFixed(4)
        },  
        iIn(values){
            let ans = this.i0(values)
            return Number(ans).toFixed(4)
        },
        iSCR(values){
            let ans = this.i0(values) / Math.sqrt(2);
            return Number(ans).toFixed(4)
        },
        vM(values){
            let ans = Math.sqrt(2) * values.vIn
            return Number(ans).toFixed(4)
        },
        a1(values){
            let ans = (this.vM(values)/pie)*(- Math.pow(Math.sin(values.D), 2))
            return Number(ans).toFixed(4)
        },
        b1(values){
            let ans = (this.vM(values)/pie)*((pie - values.D) + (Math.sin(2* values.D)/2))
            return Number(ans).toFixed(4)
        },
        v01(values){
            let rootPart = (
                (Math.pow(this.a1(values),2) + Math.pow(this.b1(values),2)) / 2
            )
            let ans = Math.sqrt(rootPart) 
            return Number(ans).toFixed(4)
        },
        THD(values){
            let rootPart = (
                Math.pow(this.v0(values),2) - Math.pow(this.v01(values),2)
            )
            let ans = (Math.sqrt(rootPart) / this.v01(values)) * 100
            return Number(ans).toFixed(4)
        }
    },
    r_l_load : {
        load_1: 100,
        load_2: 50,
        phy(values){
            console.log("R: ",values.R)
            let first = 3.59
            let second = 14.10
            switch(values.R){
                case this.load_1:
                    return first
                case this.load_2:
                    return second
            }
        },
        betaDeg(values){
            let conditionBased = 180
            let first = 183.6
            let second = 194.1
            let ans = 0
            switch(values.R){
                case this.load_1:
                    ans = first
                    break
                case this.load_2:
                    ans = second
                    break
            }
            if(values.D  <= 15){
                ans = conditionBased
            }
            return ans;
        },
        beta(values){
            // 0 15 - beta 180deg
            // >= 194.1
            let conditionBased = 180
            let first = 183.6
            let second = 194.1
            let ans = 0
            switch(values.R){
                case this.load_1:
                    ans = first
                    break
                case this.load_2:
                    ans = second
                    break
            }
            if(values.D  <= 15){
                ans = conditionBased
            }
            ans = ans * (pie/180)
            return ans;
        },
        vM(values){
            let ans = Math.sqrt(2) * values.vIn
            return Number(ans).toFixed(4)
        },
        a1(values){
            let sinSquareBeta = Math.pow(Math.sin(this.beta(values)),2)
            let sinSquareAlpha = Math.pow(Math.sin(values.D),2)
            let ans = (this.vM(values)/pie) * (sinSquareBeta - sinSquareAlpha)

            return Number(ans).toFixed(4)
        },
        b1(values){
            let sin2Beta = Math.sin(2 * this.beta(values))
            let sin2Alpha = Math.sin(2 * values.D)

            let rightSide = (
                (this.beta(values) - values.D) - ((sin2Beta - sin2Alpha)/2)
            )
            let ans = (this.vM(values)/pie) * rightSide
            return Number(ans).toFixed(4)
        },
        v0(values){
            let underRoot = (
                (1/pie) * (this.beta(values) - values.D + (Math.sin(2*values.D)/2) - Math.sin(2*this.beta(values)) / 2) 
            )
            
            let ans = values.vIn * Math.sqrt(underRoot)
            return Number(ans).toFixed(4)
        },
        pf(values){
            let underRoot = (
                (1/pie) * (this.beta(values) - values.D + (Math.sin(2*values.D)/2) - Math.sin(2*this.beta(values)) / 2) 
            )

            let ans = Math.sqrt(underRoot)
            return Number(ans).toFixed(4)
        },
        z(values){
            // * omega  
            const L = values.L * Math.pow(10,-3)
            function omega(values){
                const f = 50
                let ans = 2 * pie * f
                return Number(ans).toFixed(4)
            }
            let underRoot = (
                Math.pow(values.R,2) + Math.pow((omega(values) * L),2) 
            )
            let ans = Math.sqrt(underRoot);
            return Number(ans).toFixed(4)
        },
        i0(values){ 
            let ans = this.v0(values) / this.z(values);
            return Number(ans).toFixed(4)
        },   
        iIn(values){
            let ans = this.i0(values)
            return Number(ans).toFixed(4)
        },  
        v01(values){
            let underRoot = (
                (Math.pow(this.a1(values),2) + Math.pow(this.b1(values),2)) / 2
            )
            let ans = Math.sqrt(underRoot)
            return Number(ans).toFixed(4)
        },
        iSCR(values){
            let ans = this.i0(values) / Math.sqrt(2);
            return Number(ans).toFixed(4)
        },
        THD(values){
            let underRoot = Math.pow(this.v0(values), 2) - Math.pow(this.v01(values), 2)

            let ans = (Math.sqrt(underRoot) / this.v01(values)) * 100  
            return Number(ans).toFixed(4)
        },
        p0(values){
            let ans = this.v0(values) * this.i0(values)

            return Number(ans).toFixed(4)
        }
    },
}
//* D is firing angle , vIn is vs, R is r
// L is the inductance
let values = {
    vIn:0,
    D:0,
    R:0,
    L:0,
}

function updateValues(vIn,D,R,L){
    values = {
        vIn:vIn,
        // convert alpha to radion
        D: (D * (pie/180)),
        R:R,
        L:L,
    }
}