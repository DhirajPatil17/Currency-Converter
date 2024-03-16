 const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let input_amount=document.querySelector('input');
let submit_button=document.querySelector('.submit-data')
let dropdowns=document.querySelectorAll('.dropdown select');
let options=document.querySelectorAll('option')
let fromCurr=document.querySelector('.from select');
let toCurr=document.querySelector('.to select');
var button=document.querySelector('.main button');
var msg=document.querySelector('.msg');


let i=0;
for(let select of dropdowns)
{
    for(code in countryList){
        var newOption=document.createElement('option');
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="From" && code==="USD")
        {
            newOption.selected='selected';
        }
        else if(select.name==="To" && code==="INR")
        {
            newOption.selected='selected';
        }
        select.appendChild(newOption);
        
    }
    select.addEventListener("change",(element)=>
        {  
            updateFlag(element.target);  
        })    
}
const updateFlag =(option)=>{
    
    let countryCurr=countryList[option.value];
    var newImg=option.parentElement.querySelector('img');
    newImg.src=`https://flagsapi.com/${countryCurr}/flat/64.png`
}
    // if(option.name==='From')
    // {
    //     fromImg.src=`https://flagsapi.com/${countryCurr}/flat/64.png`;
    // }
    // else{
    //     toImg.src=`https://flagsapi.com/${countryCurr}/flat/64.png`;
    // }

const getExchangeData=async()=>
{
    var amount=document.querySelector('.amount input');
    let inputAmount=amount.value;
    var URL=`${BASE_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    var response=await fetch(URL);
    var data=await response.json();
    if(inputAmount=='' || inputAmount==1)
    {
        inputAmount=1;
    }
    let convertedValue=data[toCurr.value.toLowerCase()]*inputAmount

    msg.innerText=`${inputAmount} ${fromCurr.value} = ${convertedValue} ${toCurr.value}`;

}
button.addEventListener("click",(event)=>
{
    event.preventDefault();
    getExchangeData();
});
window.addEventListener("load", () => {
    updateExchangeRate();
  });
// submit_button.addEventListener("click",getData);
