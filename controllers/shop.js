const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.status(200).send(
        {
          status: true,
          data: product,
          message: 'successfully get all data'
        });
    })
    .catch((err) => {
      res.status(200).send(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.status(200).send(
        {
          status: true,
          data: product,
          message: 'successfully get all data'
        });
    })
    .catch((err) => {
      res.status(200).send(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })

};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render('shop/index', {
        prods: product,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts()
        .then(product => {
          res.status(200).send(
            {
              status: true,
              data: product,
              message: 'successfully get cartdata'
            });
        })
        .catch(err => {
          res.status(200).send(
            {
              status: false,
              message: err
            }
          )
          console.log(err)
        })
    })
    .catch(error => {
      console.log(error)
    })
};

exports.postCart = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId, "IDDDDDDDDDDDDDDDDDDDDD")
  let newQuantity = 1
  let fetchCart;
  req.user.getCart()
    .then(cart => {
      fetchCart = cart
      return cart.getProducts({ where: { id: productId } })
    })
    .then(product => {
      let produ
      if (product.length > 0) {
        produ = product[0]
      }

      if (produ) {
        const oldquntity = produ.cartItem.quantity;
        newQuantity = oldquntity + 1;
        return product;
      }
      return Product.findByPk(productId)
    })
    .then(product => {
      return fetchCart.addProduct(product, { through: { quantity: newQuantity } })
    })
    .then(product => {
      res.status(200).send(
        {
          status: true,
          data: product,
          message: 'successfully get cartdata'
        });
    })
    .catch(err => {
      res.status(200).send(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.postRemoveCart = (req, res, next) => {

}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
