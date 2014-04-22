var Base = require('./Base');

module.exports = function(db) {

    var Product = new Base(db, 'Product');

    Product.findBySKU = function(sku, project) {

        return this.findOne({sku: sku}, project).exec();
    };

    return Product;

}



