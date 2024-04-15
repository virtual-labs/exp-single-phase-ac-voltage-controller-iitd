const sliders = {
    slider_R_value: Number(document.querySelector(".slider_R").value),
    slider_D_value: Number(document.querySelector(".slider_R").value),
    slider_V_value: 0,
    d: document.querySelector(".d .slider_D"),
    v: document.querySelector(".v .value-box input"),
    r: document.querySelector(".r .slider_R"),
    v_knob: document.querySelector(".slider-V-arrow"),
    sliderR(){
        let slider_R = document.querySelector(".slider_R")
        let sliderImg = document.querySelector(".slider-R-arrow")
        let sliderValueInput = document.querySelector(".r .value-box input")
        // ratio to move 450/50 = 1:10
        // max img 71px -> min 120 px
        let val = 0
        
        // slider function  
        function slide(e){
            e = e instanceof Event
            if(e){
                sliderValueInput.value = slider_R.value 
            }
            else{
                slider_R.value = sliderValueInput.value
            }
            val = (slider_R.value / 9.334)
            sliderImg.style.top = `${90 - val}px`
        }
    
        const slideInput = ()=>{
            let val = sliderValueInput.value
            if(val > 500){
                val = 500
            }
            sliderValueInput.value = val
            slide(false)
        }
    
        slider_R.oninput = slide
        sliderValueInput.onkeyup = slideInput
        sliderValueInput.addEventListener("focusout",()=>{
            if(sliderValueInput.value < 50){
                sliderValueInput.value = 50
            }
            slide(false)
        })
    },
    sliderD(){
        let slider_D = document.querySelector(".slider_D")
        let sliderImg = document.querySelector(".slider-D-arrow")
        let sliderValueInput = document.querySelector(".d .value-box input")
        let val = 0
        
        // slider function  
        function slide(e){
            e = e instanceof Event
            if(e){
                sliderValueInput.value = slider_D.value 
            }
            else{
                slider_D.value = sliderValueInput.value
            }
            val = ((slider_D.value * 95) / 109) - 7
            sliderImg.style.left = `${114 + val}px`

            if(Scenes.currentStep == 7){
                // update the text accroding to value
                let betaTempText = Scenes.items.tempTitle41
                let first = 183.6
                let second = 194.1
                let load_1 = 100
                let betaDeg = (values.R == load_1 ? first : second)
                if(slider_D.value <= 15){
                    betaDeg = 180
                }
                betaTempText.setContent(betaDeg)
            }
        }
    
        const slideInput = ()=>{
            let val = sliderValueInput.value
            if(val > 180){
                val = 180
            }
            sliderValueInput.value = val
            slide(false)
        }
    
        slider_D.oninput = slide
        sliderValueInput.onkeyup = slideInput
        sliderValueInput.addEventListener("focusout",()=>{
            if(sliderValueInput.value < 0 || sliderValueInput.value.length == 0){
                sliderValueInput.value = 0
            }
            slide(false)
        })
    },
    sliderV(){
        let sliderVidx = 1;
        let sliderArrow = document.querySelector(".slider-V-arrow")
        let sliderValueInput = document.querySelector(".v .value-box input")
        let angles = [0, 90, 180, 270, 332]
        let valuesOfAngles = [0, 60, 120, 180, 220]
    
        // slider function  
        let rotateArrow = (rot=0)=>{
            sliderArrow.style.transform=`rotate(${angles[sliderVidx]}deg)`
            sliderValueInput.value = valuesOfAngles[sliderVidx]
            this.slider_V = valuesOfAngles[sliderVidx]
            sliderVidx = (sliderVidx + 1) % angles.length
    
        }
    
        sliderArrow.onclick = rotateArrow
    },
    init(){
        this.sliderV()
        this.sliderR()
        this.sliderD()
    },
    showAllSliders(){
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
        document.querySelector(".slider-circuit").style.display = "block"
    },
    showAll(){
        let sliderBox = document.querySelector(".universal-slider")
        sliderBox.style.display = "block"
    },
    showSlider(sliderName=""){
        this.showAll()
        document.querySelector(".slider-circuit").style.display = "none"
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "none"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "block"
    },
    hideSlider(sliderName=""){
        this.showAll()
        // document.querySelector(".slider-circuit").style.display = "none"
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "none"
    }
}

sliders.init()



/*
use it like showSlider(sliderName)
like: d, v, r -> only those sliders are visible

and for all visible call
sliders.showAll()
*/