
names = ["TOR","ETH","ADA","ABC"];
UpdateGraph(names[Math.floor(Math.random() * names.length)]);

function UpdateGraph(currencyName){
    var widget = document.getElementById('nomics-ticker');
    var div = widget.firstChild;
    div.setAttribute('data-base',currencyName);
}