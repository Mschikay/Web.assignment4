const express = require('express');
const router = express.Router();
const product = require('../models/product');

router.route('/').post(function (req, res) {
	var p = new product();
	p.title = req.body.title;
	p.price = req.body.price;
	p.instock = req.body.instock;
	p.photo = req.body.photo;
	p.save(function (err) {
		if (err) {
			res.send(err);
		}
		res.send({ message: 'Product Created !' })
	})
});


router.route('/').get(function (req, res) {
	product.find(function (err, products) {
		if (err) {
			res.send(err);
		}
		res.send(products);
	});
});

router.route('/:product_id').get(function (req, res) {
	product.findById(req.params.product_id, function (err, prod) {
		if (err)
			res.send(err);
		res.json(prod);
	});
});

router.route('/:product_id').put(function (req, res) {

	product.findById(req.params.product_id, function (err, prod) {
		if (err) {
			res.send(err);
		}
		prod.title = req.body.title;
		prod.price = req.body.price;
		prod.instock = req.body.instock;
		prod.photo = req.body.photo;
		prod.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'Product updated!' });
		});

	});
});

router.route('/').delete(function (req, res) {
	var _id = req.body['_id'];

	product.find({ _id: _id }).remove(function (err) {
		if (err)
			res.send(err);
		res.json({ message: 'Product deleted!' });
	})



});

module.exports = router;
