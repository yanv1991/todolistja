describe("Products", function() {
  var product;
  beforeEach(function() {
    product = { id: 111, name: "test", price: 12.3, description: "A test product" };
  });

  it("Insert product", function() {
     var productsLength = productsController.getProductsByCategory().length;
     var addedProduct = productsController.addProduct(product);
     expect(addedProduct.name).toEqual(product);
  });

  it("Get products by category", function() {
     var productsLength = productsController.getProductsByCategory().length;
     expect(productsController.getProductsByCategory().length).toEqual(productsLength);
  });

  it("Delete product", function() {
     var productsLength = productsController.getProductsByCategory().length;
     productsController.deleteProduct(productsLength - 1);
     expect(productsController.getProductsByCategory().length).toEqual(productsLength - 1);
  });
});