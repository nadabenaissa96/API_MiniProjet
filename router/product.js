const express = require('express');
const router = express.Router();
const Product =require('../model/product');


// Get all products
router.get("/products", (req, res, next) => {
    Product.find((err, products) => {
            if (err) {
                res.status(500).send()
            } else {
                return res.json({products: products});
            }
    });
});

// Get product by id
router.get("/products/:id",function(req,res){
    Product.findOne({'_id': req.params.id},function(err, product) {
      if(err){
        res.status(500).send()

      }if(product== null){
        res.status(404).send();
      }
      else{
            res.json({product:product});    
    } 
    });
});

// Delete product
router.delete("/products/:id",function (req, res){
    Product.findOne({'_id':req.params.id},function (err,product) {
        if(err)
        {
            res.status(500).send()

        }else {
            product.remove(function (err) {
                if (err) {
                    res.status(500).send()
                } else {
                    res.status(200).send({ message: 'Product deleted' })
                   
                    
                }
            });
        }
    });
});

// Add product
router.post("/products",function (req,res) {
  
    Product.findOne({'name':req.body.name},function(err,product){
        if (err) {
            res.status(500).send()
        }
        if (product) {
            res.status(412).send({ message: 'Product already exist' })

        }else {
                var newProduct = new Product();
                newProduct.name = req.body.name;
                newProduct.price=req.body.price;
                newProduct.quantite=req.body.quantite;

                newProduct.save(function (err, savedProduct) {
                if (err) {
                    res.status(500).send()
                    
                }else{
                    res.json({
                        product: savedProduct.getProduct(),
                      });
                }
            });
        }  
    });
});

// Update product
router.put("/products/:id",function (req,res) {

    Product.findOne({'_id':req.params.id},function (err,product) {
        if(err)
        {
            res.status(500).send()

        }else{
            
            if(req.body.name)
            {
                Product.findOne({'name':req.body.name},function(err,products){
                    if (err) {
                        res.status(500).send()
                    }
                    if (products) {
                        res.status(412).send({ message: 'product already exist' })
            
                    }else {
                        product.name=req.body.name;
                        
                        if(req.body.price)
                        {
                            product.price=req.body.price;
                        }
                        if(req.body.quantite)
                        {
                            product.quantite=req.body.quantite;
                        }
                        product.save(function (err,savedProduct) {
                            if(err)
                            {
                                res.status(500).send() 
                            }
                            if(savedProduct)
                            {
                                res.json({
                                    
                                    product : savedProduct.getProduct()
                                });
                            }
                        });
                    }
                    })
            }
        
           
        }
    });
});

// Update product
router.put("/update-products",function (req,res) {

    Product.findOne({'_id':req.body.id},function (err,product) {
        if(err)
        {
            res.status(500).send()

        }else{
            
            if(req.body.name)
            {
                Product.findOne({'name':req.body.name},function(err,products){
                    if (err) {
                        res.status(500).send()
                    }
                    if (products) {
                        res.status(412).send({ message: 'Product already exist' })
            
                    }else {
                        product.name=req.body.name;
                        if(req.body.price)
                        {
                            product.price=req.body.price;
                        }
                        if(req.body.quantite)
                        {
                            product.quantite=req.body.quantite;
                        }
                        product.save(function (err,savedProduct) {
                            if(err)
                            {
                                res.status(500).send() 
                            }
                            if(savedProduct)
                            {
                                res.json({
                                    
                                    product : savedProduct.getProduct()
                                });
                            }
                        });
                    }
                })
            }  
        }
    });
});

module.exports = router;
