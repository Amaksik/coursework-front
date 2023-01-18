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

function readSingleCookie() {
    var nameEQ = 'WidgetValues' + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function GenerateGraph(){
    const defaultCurrencies = ["TOR","ETH","ADA","DOGE"];
    var latest = readSingleCookie();
    if(latest){
        let array = JSON.parse(latest);
        if(array.length>0){
            AddGraph(array[0]);
        }
        else{
            AddGraph(defaultCurrencies[Math.floor(Math.random() * defaultCurrencies.length)]);
        }
    }
    else{
        
        AddGraph(defaultCurrencies[Math.floor(Math.random() * defaultCurrencies.length)]);
    }
}
GenerateGraph();