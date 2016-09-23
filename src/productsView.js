var productsView = (function() {
    //cache DOM
    var addbutton = document.getElementById("add-item-btn");
    var input = document.getElementById("item-txt");
    var ul = document.getElementById("items-list");
    var select = document.getElementById("categories");
    var resetButton = document.getElementById("reset-items-btn");

    //init app
    init();

    function init() {
        //onload page
        _render(productsController.getProductsByCategory());
        //bind events
        bindEvents();
    }

    //bind events
    function bindEvents() {
        addbutton.addEventListener("click", addProduct);
        resetButton.addEventListener("click", resetList);
        //select.addEventListener("change", resetList);
        // Get the element, add a click listener...
        ul.addEventListener("click", function(e) {
            // e.target is the clicked element!
            // If it was a list item
            if (e.target && e.target.nodeName == "I") {
                deleteProduct(e);
            }
        });
        //each time the emitter add a category will call addOptionToDropDown
        pubsub.on('addCategory', addOptionToDropDown);
    }

    //add option to the dropdown
    function addOptionToDropDown(element) {
        var option = document.createElement("option");
        option.text = element.name;
        option.value = element.id;
        select.appendChild(option);
    }

    function formatPrice(price, currencySymbol) {
        return currencySymbol + price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    function formatProduct(product) {
        return product.name + " - " + formatPrice(product.price, "$");
    }

    function _insertElement(product) {
        var value = formatProduct(product);
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
        li.setAttribute("title", product.description);
        ul.appendChild(li);
    }

    function _deleteElement(e) {
        var li = e.target.parentElement;
        ul.removeChild(li);
    }

    function _render(products) {
        for (var i = 0; i < products.length; i++) {
            _insertElement(products[i]);
        }
    }

    function resetList() {
        if (select.options[select.selectedIndex]) {
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            var category = select.options[select.selectedIndex].text;
            var productsByCategory = productsController.getProductsByCategory(category);
            _render(productsByCategory);
        } else {
            alert("There is not an option selected");
        }
    }

    function addProduct(value) {
        var newProduct;
        var name = (typeof value === "string") ? value : input.value;
        if (name !== "") {
            newProduct = productsController.addProduct(name);
            _insertElement(newProduct);
            input.value = "";
        } else {
            alert("product name is empty");
        }
    }

    function deleteProduct(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var nodeList = Array.prototype.slice.call(ul.children);
            i = nodeList.indexOf(event.target.parentElement);
        }
        productsController.deleteProduct(i);
        _deleteElement(event);
    }
})();
