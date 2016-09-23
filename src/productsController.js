var productsController = (function() {
    var products = [{ id: 111, name: "product1", price: 12.3, description: "A description" },
        { id: 222, name: "product2", price: 2, description: "Other description" }
    ].sort(sortProductsByPrice);
    var mapCategories = {};
    var productsURL = "services/products/index.html";
    var categoriesURL = "services/categories/index.html";

    //testing async
    //setTimeout(function(){  loadData(); }, 3000);
    loadData();
    function createMapCategories(data) {
        var tempProducts = data[productsURL];
        var tempCategories = data[categoriesURL];
        tempCategories.forEach(function(category, index) {
            pubsub.emit("addCategory", category);
            mapCategories[category.name] = tempProducts.map(function(product) {
                return product;
            }).filter(function(product) {
                if (!category.products)
                    return false;
                return category.products.includes(product.id);
            }).sort(sortProductsByPrice);
        });
    }

    function sortProductsByPrice(a, b) {
        if (a.price > b.price) {
            return 1;
        }
        if (a.price < b.price) {
            return -1;
        }
        // a must be equal to b
        return 0;
    }

    function loadData() {
        ajaxUtil.ajaxRequest([productsURL, categoriesURL], function(data) {
            //products = data[productsURL];
            createMapCategories(data);
        }, function(data) {
            console.log("something went wrong with service: " + data);
        });
    }

    function addProduct(value) {
        var product = {};
        product.name = value;
        if (product.name !== "") {
            product.price = 0;
            product.description = product.name;
            products.push(product);
            pubsub.emit("counterChanged", products.length);
        } else {
            console.log("product name is empty");
        }
        return product;
    }

    function deleteProduct(index) {
        if (typeof index === "number") {
            products.splice(index, 1);
            pubsub.emit("counterChanged", products.length);
        }
    }

    function getProductsByCategory(category){
        products = category ? Object.create(mapCategories[category]): products;
        pubsub.emit("counterChanged", products.length);
        return products;
    }

    return {
        addProduct: addProduct,
        deleteProduct: deleteProduct,
        getProductsByCategory: getProductsByCategory
    };

})();
