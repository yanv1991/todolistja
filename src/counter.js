// Counter
(function(){
    var items = 0;

    //cache DOM
    var itemsElement = document.getElementById("items-counter");
    
    //bind events
    pubsub.on('counterChanged', setCounter);
    _render();

    function _render() {
       itemsElement.textContent = items;
    }

    function setCounter(newItems) {
        items = newItems;
        _render();
    }

})();