var express = require('express');
const passport = require('passport');

var router = express.Router();
const User = require('../models/User');
const NFT = require('../models/NFT');
const jwt = require('jsonwebtoken');  // make sure you've installed jsonwebtoken
const Order = require('../models/Orders');

// create product.js and order.js
router.post('/order/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user_id, order_time, nfts, total_price } = req.body;
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization.split(' ')[1], decoded;
    try {
      decoded = jwt.verify(authorization, 'abc');
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    let userIdFromToken = decoded.user_id;

    if (userIdFromToken !== user_id) {
      return res.status(401).send('User ID mismatch');
    }

    const nftId = nfts[0].product_id;
    const amountRequested = nfts[0].amount;

    NFT.findOne({ _id: nftId })
      .then(isProduct => {
        if (!isProduct) {
          return res.status(404).send('Product not found.');
        }

        const instock = isProduct.volume - amountRequested;

        if (instock < 0) {
          return res.json({ message: "Order failed due to insufficient stock." });
        }

        isProduct.volume = instock;

        Order.findOne({ user_id })
          .then(order => {
            if (order) {
              order.nfts = order.nfts.concat(nfts);
              order.total_price += total_price;
              order.order_time = new Date();
              order.status = req.body.status || order.status;
            } else {
              order = new Order({
                user_id,
                order_time,
                nfts,
                total_price,
                status: req.body.status || 'unpaid'
              });
            }

            return order.save();
          })
          .then(order => {
            res.json({ message: "Successfully added", order });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Error occurred while processing the order');
          });

        return isProduct.save();
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error occurred while processing find Product');
      });
  } else {
    return res.status(500).send('Could not find authorization token');
  }
});
module.exports = router;
