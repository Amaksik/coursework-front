// function UpdateGraph(){
//     names = ["TOR","ETH","ADA","ABC"];
//     const currencyName = names[Math.floor(Math.random() * names.length)]
//     var widget = document.getElementById('nomics-ticker-replacible');
//     widget.setAttribute('data-base',currencyName);
// }
function AddGraph(name){
    var graphwrapper = document.getElementById('nomics-ticker');
    var graph = createGraphByName(name);
    graphwrapper.appendChild(graph)
}

function createGraphByName(currencyName) {
    var htmlString = `  <div id="nomics-ticker" class="bottom">
                            <div class="nomics-ticker-widget" data-base=${currencyName} data-quote="USD"></div>
                        </div>`
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    return div.firstChild;
}
