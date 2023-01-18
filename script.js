const apiUrl = 'https://localhost:44358/api/rate'
names = ["ETH","ADA","BTC", "DOGE"];
console.log(document.cookie);
const currencyName = names[Math.floor(Math.random() * names.length)]
window.onload = AddGraph(currencyName);
console.log(window.innerWidth);
const width = window.innerHeight;
let currenciesNamearr;
if(width<=500){
    document.getElementById('nomics-ticker').remove();
}
function AddCookie(){
    document.cookie = "widget=John-Doe";
    document.cookie = "witcher=Geralt; SameSite=None; Secure"
}
function remove(el) {
    var element = el.currentTarget;
    element.remove()
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

        document.getElementById('tracker-body').appendChild(new_price_div)
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
    let response  = await fetch(apiUrl);
    let names = await response.json();
    names.forEach(name => {
        AddElementOptionByName(name);
    });
}
asyncCountriesFetch();