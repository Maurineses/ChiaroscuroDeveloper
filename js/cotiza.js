let btnQuote = document.getElementById("btnQuote");
let btnPrint = document.getElementById("btnPrint");

btnQuote.addEventListener("click", function (e){
    e.preventDefault();
    let hours = parseInt(document.getElementById("inputHours").value );
    let rate =  parseFloat(document.getElementById("inputRate").value );
    let iva =   document.getElementById("checkIVA").checked;
    let extras = document.getElementById("inputExtras");
    let changes = parseFloat (document.getElementById("inputChanges").value);
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    changes = (isNaN(changes)? 0 : changes); // if ternario ejemplo 
    let fixedCost = parseFloat (document.getElementById("inputFCosts").value);
    fixedCost = (isNaN(fixedCost)? 0 : fixedCost);
    // console.log(extras.selectedIndex);
    // console.log(extras.options[extras.selectedIndex].value);
    // console.log(iva);
    let cardText = document.getElementById("cardText");
    let cardCost = document.getElementById("cardCost");
    let flag = true;
    if (isNaN(hours)) {
        console.log("Horas no es un número");
        console.log(document.getElementById("inputHours").style.borderColor);
        document.getElementById("inputHours").style.borderColor = "rgb(255,0,0)";
        flag=false;
    }else {
        document.getElementById("inputHours").value = hours;
        document.getElementById("inputHours").style.borderColor = "rgb(0,255,0)";
}
    if (isNaN(rate)) {

        console.log("rate Not a Number");
        console.log(document.getElementById("inputRate").style.borderColor);
        document.getElementById("inputRate").style.borderColor = "rgb(255,0,0)";
        flag=false;
    } else {
        document.getElementById("inputRate").value = rate;
        document.getElementById("inputRate").style.borderColor = "rgb(0,255,0)";
}
if (flag) {
    cardText.innerHTML = `Nombre: ${name},<br/>Email: ${email},<br/> 
    Podemos cotizar estos requerimientos: <br/> ${getRequirements(extras)} 
    `;
     cardCost.innerHTML = "<strong>$ " + quote(hours, rate, iva, extras, changes,fixedCost).toFixed(2);
}
});

btnPrint.addEventListener("click", function (e){
    e.preventDefault();
    window.print();
});

const getRequirements = (ex) => {
    let str = `<br/><ul class="list-group col-4">`;
    for (let i = 0; i <ex.options.length; i++) {
        console.log(ex.options[i].selected); 
        if (ex.options[i].selected) {
            str += `<li class= "list-group-item list-group-item-action"> ${ex.options[i].text} </li>`;
        }
    }
    str += `</ul>`; 
    return str;   
        
};

function quote(h,r,vat,ex,p,fc){
    p /=100;
    let result = (h*r) * (1+p);
    // (inicio; condición; incremento/decremento)
    let i=0; //inicio 
    do{
        console.log(ex.options[i].selected); 
        if (ex.options[i].selected) {
            result += parseFloat(ex.options[i].value);
        }
        i++; //incremento/decremento 
     } while(i < ex.options.length); //condición
    result += fc; 
    if (vat){    
         result *= 1.16;
     } // if vat 
     return result;
 }//quote 