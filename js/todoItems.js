var items = (function() {
    var items = [];
    var categories = [];
    var mapCategories = {};
    var productsURL = "services/products/index.html";
    var categoriesURL = "services/categories/index.html"

    //cache DOM
    var addbutton = document.getElementById("add-item-btn");
    var input = document.getElementById("item-txt");
    var ul = document.getElementById("items-list");
    var select = document.getElementById("categories");
    var resetButton = document.getElementById("reset-items-btn");

    //bind events
    addbutton.addEventListener("click", addItem);
    resetButton.addEventListener("click", resetList);
    select.addEventListener("change", resetList);
    // Get the element, add a click listener...
    ul.addEventListener("click", function(e) {
        // e.target is the clicked element!
        // If it was a list item
        if (e.target && e.target.nodeName == "I") {
            deleteItem(e);
        }
    });

    function createMapCategories() {
        categories.forEach(function(category, index) {
            addOptionToDropDown(category);
            mapCategories[category.name] = items.map(function(product){
                return product;
            }).filter(function(product){
                if(!category.products)
                    return false;
                return category.products.includes(product.id);
            })
        });
        console.log(mapCategories);
    }

    //add option to the dropdown
    function addOptionToDropDown(element) {
        var option = document.createElement("option");
        option.text = element.name;
        option.value = element.id;
        select.appendChild(option);
    }

    loadData();

    function loadData() {
        ajaxUtil.ajaxRequest([productsURL, categoriesURL], function(data) {
            items = data[productsURL];
            categories = data[categoriesURL];
            //display current list at render
            createMapCategories();
            resetList();
        }, function() {
            console.log("something went wrong");
        });
    }

    function _insertElement(value) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        var i = document.createElement("i");
        var text = document.createTextNode(value);
        var closeIcon = document.createTextNode("X");
        span.appendChild(text);
        i.appendChild(closeIcon);
        i.className = "del";
        li.appendChild(span)
        li.appendChild(i);
        ul.appendChild(li);
    }

    function _deleteElement(e) {
        var li = e.target.parentElement;
        ul.removeChild(li);
    }

    function _render() {
        for (var i = 0; i < items.length; i++) {
            _insertElement(items[i].name);
        }
        pubsub.emit("counterChanged", items.length);
    }

    function resetList(){
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        var category = select.options[select.selectedIndex].text;
        items = mapCategories[category];
        _render();
    }

    function addItem(value) {
        var item = {};
        item.name = (typeof value === "string") ? value : input.value;
        items.push(item);
        _insertElement(item.name);
        input.value = "";
        pubsub.emit("counterChanged", items.length);
    }

    function deleteItem(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var nodeList = Array.prototype.slice.call(ul.children);
            i = nodeList.indexOf(event.target.parentElement);
        }
        items.splice(i, 1);
        _deleteElement(event);
        pubsub.emit("counterChanged", items.length);
    }

    return {
        addItem: addItem,
        deleteItem: deleteItem
    };

})();
