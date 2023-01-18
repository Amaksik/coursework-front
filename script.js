const apiUrl = 'https://backend-prod-cursach-c52vjk.mo5.mogenius.io/';//https://localhost:44358/api/rate
const cookieName = 'WidgetValues';

console.log(window.innerWidth);
const width = window.innerHeight;
let currenciesNamearr;
const init = function(){
    var latest = readCookie();
    if(latest){
        let array = JSON.parse(latest);
        array.forEach(name => {
            AddCurrency(name);
        })
    }
    asyncCountriesFetch();
}
if(width<=500){
    document.getElementById('nomics-ticker').remove();
}
function remove(el) {
    var element = el.currentTarget;
    element.remove()
    Removecookies(element.firstChild.innerText)
  }
function AddCurrency(name){
    if (CheckAmount()){
        
        let new_price_div = document.createElement('div');
        let new_price_name = document.createElement('span');
        let new_price_value = document.createElement('span');

        new_price_name.innerText = name;
        new_price_value.innerText= "20,72"

        new_price_div.appendChild(new_price_name);
        new_price_div.appendChild(new_price_value);

        new_price_div.className = "price-element";
        new_price_div.addEventListener('click', remove, false);

        document.getElementById('tracker-body').appendChild(new_price_div);

        Updatecookies(name);
    }
    else{
        alert("Maximum amount of currencies added")
    }
}
function CheckAmount(){
    const nodes = document.getElementById('tracker-body').childElementCount
    if(!nodes){
        return true;
    }
    if(nodes >= maximumAmount()) return false
    return true;
    
}
function maximumAmount () {
    const size = window.innerWidth;
    if(size <=300) return 1;
    if(size <=450) return 4;
    return 6;
}
function change(){
    var select = document.getElementById("select");
    var selectVal=select.options[select.selectedIndex].value;
    AddCurrency(selectVal);
    toShowModal(false);
}
function Add(){
    document.getElementById("modal").classList.toggle("show");
    if (CheckAmount()){
        toShowModal(true)
    }
    else{
        alert("Maximum amount of currencies added")
    }    
}
function toShowModal(toShow){
    const modal = document.getElementById('modal');
        
    if(toShow){
        modal.style.visibility = 'visible';
    }
    else{
        modal.style.visibility = 'hidden';
    }
}
function updateListeners(){
    const lis = document.querySelectorAll('div.price-element');
    
    for (var i = 0, len = lis.length; i < len; i++) {
        lis[i].addEventListener('click', remove, false);
    }
}
function getCurrencies(){
    fetch('https://localhost:44358/api/rate')
  .then(function (response) {
    // Successful fetch return as json
    const resp= response.json();
  })
  .then(function (data) {
    // Data now contains the json
    return data;
  })
  .catch(function (error) {
    // A Error occurred
    console.log(error);
  });
}

function createElementFromHTML(currencyName) {
    var htmlString = `<option value=${currencyName} onclick="AddCurrency(${currencyName})">${currencyName}</option>`
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    return div.firstChild;
}
function AddElementOptionByName(currencyName){
    var element = createElementFromHTML(currencyName);
    document.getElementById('select').appendChild(element)
}

async function asyncCountriesFetch(){
    let response  = await fetch(apiUrl+'api/rate');
    let names = await response.json();
    names.forEach(name => {
        AddElementOptionByName(name);
    });
}
window.onload = init;

function createHistoryCookie(value) {
var expires = "";
document.cookie = cookieName+"="+value+expires+"; path=/";
}

function readCookie() {
    var nameEQ = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function Updatecookies(newname){
    let array = JSON.parse(readCookie());
    if(!array){
        array = []
    }
    if(!array.includes(newname)){
        array.push(newname);
        let value = JSON.stringify(array);
    createHistoryCookie(value);
    }
    
}
function Removecookies(nameForRemoval){
    let array = JSON.parse(readCookie());
    if(!array){
        return;
    }
    var index = array.indexOf(nameForRemoval);
    if (index !== -1) {
    array.splice(index, 1);
    }
    let value = JSON.stringify(array);
    createHistoryCookie(value);
}