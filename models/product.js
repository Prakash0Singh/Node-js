const fs = require('fs');
const path = require('path');
const products = []

module.exports = class Product {
    constructor(t) {
        this.title = t
    }

    save() {
        const p = path.join(path.dirname(__dirname), 'data', 'product.json');
        fs.readFile(p, (err, fileContent) => {
            let prod = [];
            if (!err) {
                prod = JSON.parse(fileContent)
            }
            prod.push(this);
            fs.writeFile(p, JSON.stringify(prod), (err) => {
                console.log(err)
            })
        })
        // products.push(this)
    }

    static fetchAll() {
        const p = path.join(path.dirname(process.main.filename), 'data', 'product.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return []
            }
            return JSON.parse(fileContent)
        })
        return products
    }
}