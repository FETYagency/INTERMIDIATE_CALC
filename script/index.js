const theme_choice = document.querySelectorAll(".theme_choice");

// specific element theme changes
const header = document.querySelector("header")
const output = document.querySelector(".screen")


function changeTheme(theme,change_one){
    document.documentElement.setAttribute("data-theme",theme)
    header.setAttribute("class", change_one);
    output.setAttribute("class", `screen ${change_one}`)
    
}

function matchThemes(e){
    switch (Number(e.target.value)) {
        case 1:
            changeTheme("BLUE_NIGHT","theme1")
            for (let i = 0; i < theme_choice.length; i++) {
                const element = theme_choice[i];
                element.classList.contains("selected")?element.classList.remove("selected"):null
            }
            e.target.classList.add("selected")
            break;
        case 2:
            changeTheme("WHITE","theme2")
            for (let i = 0; i < theme_choice.length; i++) {
                const element = theme_choice[i];
                element.classList.contains("selected")?element.classList.remove("selected"):null
            }
            e.target.classList.add("selected")
            break;
        case 3:
            changeTheme("PURPLE","theme3")
            for (let i = 0; i < theme_choice.length; i++) {
                const element = theme_choice[i];
                element.classList.contains("selected")?element.classList.remove("selected"):null
            }
            e.target.classList.add("selected")
            break;
    }
}

theme_choice.forEach(e=>e.addEventListener("click", matchThemes))



// the keypad constants
const keys =  document.querySelectorAll(".key")
const result = document.querySelector(".result")
const del = document.getElementById("delete");
const reset = document.getElementById("reset");
const equal = document.getElementById("equal");

keys.forEach(e=>{
    e.textContent=e.value;
    
    e.addEventListener("click", ()=>{
        let arithRegex = /(?<=\d)[\+|\-|\/|\*|\.]{2}/g;

        switch (e.value) {
            case "*":
                result.textContent+= e.value;
                let one_multi = arithRegex.test(result.textContent)?result.textContent.split("").slice(0,-1).join(""):result.textContent;
                result.textContent = one_multi;
                break
            ;
            case "/":
                result.textContent+= e.value;
                let one_div =arithRegex.test(result.textContent)?result.textContent.split("").slice(0,-1).join(""):result.textContent;
                result.textContent = one_div;
                break
            ;
            case "+":
                result.textContent+= e.value;
                let one_add =arithRegex.test(result.textContent)?result.textContent.split("").slice(0,-1).join(""):result.textContent;
                result.textContent = one_add;
                break
            ;
            case "-":
                result.textContent+= e.value;
                let one_minus =arithRegex.test(result.textContent)?result.textContent.split("").slice(0,-1).join(""):result.textContent;
                result.textContent = one_minus;
                break;
            ;
            case ".":
                result.textContent+= e.value;
                let one_dot =arithRegex.test(result.textContent)?result.textContent.split("").slice(0,-1).join(""):result.textContent;
                result.textContent = one_dot;
                break;
            ;
            default:
                if(result.textContent==="0"){
                    result.textContent= ""
                    result.textContent+= e.value;
                }else{
                    result.textContent+= e.value;
                }
            ;
        }
    })
});





reset.addEventListener("click",()=>{
    result.textContent= "0";
})




del.addEventListener("click",()=>{
    result.textContent=result.textContent.split("").slice(0,-1).join("")
    if(result.textContent.length<1){
        result.textContent= "0";
    }
})



equal.addEventListener("click", ()=>{

    let FIRST_OP_REGEX = /\d+\.?\d*(?=\+|\-|\/|\*)/g;
    let FIRST_OP= FIRST_OP_REGEX.test(result.textContent)? Number(result.textContent.match(FIRST_OP_REGEX)[0]) : "not found"; 

    let SECOND_OP_REGEX =  /(?<=\+|\-|\/|\*)\d+\.?\d*/g;
    let SECOND_OP= SECOND_OP_REGEX.test(result.textContent)? Number(result.textContent.match(SECOND_OP_REGEX)[0]) : "not found";

    let OPERATION_REGEX = /\/|\*|\-|\+{1}/g;
    let OPERATION = OPERATION_REGEX.test(result.textContent)? result.textContent.match(OPERATION_REGEX)[0]  : "not found"  
    
    let RESULT
    try{
            switch (OPERATION) {
                case "*":
                    RESULT = Number(FIRST_OP * SECOND_OP);
                    break;
                case "/":
                    RESULT = Number(FIRST_OP / SECOND_OP);
                    break;
                case "+":
                    RESULT = Number(FIRST_OP + SECOND_OP);
                    break;
                case "-":
                    RESULT = Number(FIRST_OP - SECOND_OP);
                    break;
                default:
                    RESULT = NaN;
            }
            result.textContent= RESULT;

            if(isNaN(RESULT)){
                throw(new Error("Two operands required"))
            }
    }catch(err){
        result.textContent=  err.message
        setTimeout(()=>{
            result.textContent=  "0"
        }, 1200)
    }

})
