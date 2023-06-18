var express = require('express');
var router = express.Router();
var NFT = require('../models/NFT');

/* GET home page. */
router.get('/', function(req, res, next) {

  NFT.find({})
  .then(nfts => {
    res.render('index', {nfts: nfts });
  })
  .catch(err => {
    console.log(err);
  });

});

router.get('/nft/:id', function(req, res, next) {
  NFT.findById(req.params.id)
    .then(nfts => {
      res.render('nft', {nft: nfts });    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Create NFT' });
});

router.post('/create', function(req, res, next) {
  const nft = new NFT(req.body);
  nft.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post('/nft/:id/mint', function(req, res, next) {
  NFT.findById(req.params.id)
    .then(nft => {
      nft.owner = req.body.owner;
      return nft.save();
    })
    .then(() => {
      res.redirect(`/nft/${req.params.id}`);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});


module.exports = router;