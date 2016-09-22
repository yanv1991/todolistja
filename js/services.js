var productsURL = "services/products/index.html";
 var services = (function(){
 	var productsURL = "services/products/index.html";
 	function loadData() {
        ajax_get(productsURL, function(data) {
            items = data;
            //display current list at render
            _render();
        });
    }

    return {
    	loadData : loadData
    }

 })();