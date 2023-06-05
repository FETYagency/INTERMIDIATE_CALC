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
const arith = document.querySelectorAll(".arithmetic")
keys.forEach(e=>e.textContent=e.value)
arith.forEach(e=>e.textContent=e.value)

const arithmetic = document.querySelectorAll(".arithmetic")
const result = document.querySelector(".result")
const del = document.getElementById("delete");
const reset = document.getElementById("reset");
const equal = document.getElementById("equal");


function takeValue(e){
    let regex = /[A-Za-z]/g
    if(result.textContent==="0"||regex.test(result.textContent)){
        result.textContent = "" +e.target.value
    }else{
        result.textContent +=e.target.value
    }
}


function oneArithmetic(e){
    let arithRegex = /(?<=\d)[\+|\-|\/|\*]{2}/g;
    result.textContent+= e.target.value
    if(arithRegex.test(result.textContent)){
        let input =result.textContent.split("")
        input.splice(input.length-1,1)
        result.textContent = input.join("")
    }
}


function resetResult(){
    result.textContent = "0";
}
function deleteValue(){
    let input =result.textContent.split("")
    input.splice(input.length-1,1)
    result.textContent = input.join("")
    if(result.textContent.length<1){
        result.textContent = 0
    }
}

function sum(){
    try {
        let value = eval(result.textContent)
        result.textContent= value
    } catch (error) {
        result.textContent= "what was that??"
        setTimeout(()=>{
            result.textContent= 0;
        },900)
    }
}

keys.forEach(e=>e.addEventListener("click", takeValue))
arith.forEach(e=>e.addEventListener('click', oneArithmetic))
del.addEventListener("click", deleteValue)
reset.addEventListener("click", resetResult)
equal.addEventListener('click',sum)