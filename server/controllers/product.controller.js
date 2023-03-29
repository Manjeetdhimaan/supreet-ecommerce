const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const Category = mongoose.model('Category');

module.exports.getProducts = (req, res, next) => {
    try {
        let filter = {};
        if (req.query.categories) {
            const parsedQuery = JSON.parse(req.query.categories);
            // filter = {sizes: parsedQuery.sizes.split(':')}
            // filter = {"sizes" : {"$in" : parsedQuery.sizes.split(':')}}
            filter = {
                categories: {
                    $regex: new RegExp(parsedQuery.categories ? parsedQuery.categories : parsedQuery, "i")
                }
            }
            if(parsedQuery.sizes) {
                filter.sizes = {"$in" : parsedQuery.sizes.split(':')}
            }
            if(parsedQuery.price) {
                filter.currentPrice = {
                            $gte: 100,
                            $lte: 106,
                        }
            }
        }

        if (req.query.search) {
            filter = {
                "$or": [{
                        name: {
                            $regex: new RegExp(req.query.search, "i")
                        }
                    },
                    {
                        brand: {
                            $regex: new RegExp(req.query.search, "i")
                        }
                    },
                    {
                        'categories': {
                            $regex: new RegExp(req.query.search, "i")
                        }
                    },
                    {
                        'sizes': {
                            $regex: new RegExp(req.query.search, "i")
                        }
                    },
                    {
                        'style': {
                            $regex: new RegExp(req.query.search, "i")
                        }
                    },
                ]
            }
            // filter = {$text: {
            //     $search: req.query.search
            // }}
        }
        let limit = 30;
        if (req.query.new) {
            limit = 8;
        }
        if (req.query.new) {
            limit = 8;
        }
        Product.find(filter).select('name price image currency categories currentPrice mrpPrice sizes colors').sort({
            _id: -1
        }).limit(limit).then(products => {
            if (!products || products.length < 1) {
                return res.status(203).json({
                    success: false,
                    message: 'No Products found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    products: products
                });
            }
        }).catch(err => {
            console.log(err)
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.getProduct = (req, res, next) => {
    try {
        Product.findById(req.params.id).then((product) => {
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found!'
                });
            }
            return res.status(201).send({
                success: true,
                message: 'Product fetched succussfully!',
                product: product
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.postProduct = async (req, res, next) => {
    try {
        // const category = await Category.findById(req.body.category);
        // if (!category) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Invalid category'
        //     })
        // };
        const file = req.file;
        // if (!file) res.status(400).send({
        //     success: false,
        //     message: 'Product image is required'
        // });

        let imagePaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        if (req.files) {
            await req.files.map(file => {
                imagePaths.push(basePath + file.filename);
            });
        }

        const fileName = req.file ? req.file.filename: '';
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: file ? basePath + fileName : req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            currentPrice: req.body.currentPrice,
            mrpPrice: req.body.mrpPrice,
            style: req.body.style,
            currency: req.body.currency,
            categories: req.body.categories,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            sizes: req.body.sizes,
            colors: req.body.colors,
            weight: req.body.weight,
            subcategory: req.body.subcategory,
            features: req.body.features
        });

        product.save().then((savedProduct) => {
            if (!savedProduct) {
                return res.status(503).send({
                    success: false,
                    message: 'Product can not be updated! Please try again.'
                });
            }
            return res.status(201).send({
                success: true,
                message: 'Product added succussfully!',
                product: savedProduct
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.updateProduct = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Product Id'
            })
        }
        // const category = await Category.findById(req.body.category);
        // if (!category) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Invalid category'
        //     })
        // }
        Product.findByIdAndUpdate(req.params.id).then((founededProduct) => {
            if (!founededProduct) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found!'
                });
            } else {
                let imagePath;
                if (req.file) {
                    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
                    imagePath = basePath + req.file.filename;
                }

                founededProduct.isFeatured = req.body.isFeatured;
                if (req.body.name) {
                    founededProduct.name = req.body.name;
                }
                if (req.body.description) {
                    founededProduct.description = req.body.description;
                }
                if (req.body.richDescription) {
                    founededProduct.richDescription = req.body.richDescription;
                }
                if (imagePath) {
                    founededProduct.image = imagePath;
                }
                if (req.body.image) {
                    founededProduct.image = req.body.image;
                }
                if (req.body.images) {
                    founededProduct.images = req.body.images;
                }
                if (req.body.brand) {
                    founededProduct.brand = req.body.brand;
                }
                if (req.body.price) {
                    founededProduct.price = req.body.price;
                }
                if (req.body.style) {
                    founededProduct.style = req.body.style;
                }
                if (req.body.currency) {
                    founededProduct.currency = req.body.currency;
                }
                if (req.body.categories) {
                    founededProduct.categories = req.body.categories;
                }
                if (req.body.sizes) {
                    founededProduct.sizes = req.body.sizes;
                }
                if (req.body.countInStock) {
                    founededProduct.countInStock = req.body.countInStock;
                }
                if (req.body.colors) {
                    founededProduct.colors = req.body.colors;
                }
                if (req.body.rating) {
                    founededProduct.rating = req.body.rating;
                }
                if (req.body.features) {
                    founededProduct.features = req.body.features;
                }
                if (req.body.dateCreated) {
                    founededProduct.dateCreated = req.body.dateCreated;
                }
            };

            founededProduct.save().then((savedProduct) => {
                if (!savedProduct) {
                    return res.status(503).send({
                        success: false,
                        message: 'Product can not be updated! Please try again.'
                    });
                }
                return res.status(201).send({
                    success: true,
                    message: 'Product updated succussfully!',
                    product: savedProduct
                });
            }).catch(err => {
                return next(err);
            })
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.updateProductGallery = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Product Id'
            })
        }
        Product.findByIdAndUpdate(req.params.id).then(async (founededProduct) => {
            if (!founededProduct) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found!'
                });
            } else {
                let imagePaths = [];
                const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
                if (req.files) {
                    await req.files.map(file => {
                        imagePaths.push(basePath + file.filename);
                    });
                }
                // founededProduct.images = imagePaths;
                if(req.body.images) {
                    founededProduct.images = req.body.images
                }
                else {
                    founededProduct.images = founededProduct.images.concat(imagePaths);
                }
            };
            founededProduct.save().then((savedProduct) => {
                if (!savedProduct) {
                    return res.status(503).send({
                        success: false,
                        message: 'Product can not be updated! Please try again.'
                    });
                }
                return res.status(201).send({
                    success: true,
                    message: 'Product updated succussfully!',
                    product: savedProduct
                });
            }).catch(err => {
                return next(err);
            })
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.deleteProduct = (req, res, next) => {
    try {
        Product.findByIdAndRemove(req.params.id).then((product) => {
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found!'
                });
            }
            return res.status(201).send({
                success: true,
                message: 'Product deleted succussfully!'
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.getProductsCount = (req, res, next) => {
    try {
        Product.countDocuments().then(productsCount => {
            if (!productsCount || productsCount.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No Products found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    productsCount: productsCount
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.getFeaturedProducts = (req, res, next) => {
    try {
        const sort = req.params.sort ? +req.params.sort : -1;
        const count = req.params.count ? +req.params.count : 10;
        Product.find({
            isFeatured: true
        }).select('name price image currency categories currentPrice mrpPrice sizes colors').sort({
            _id: sort
        }).limit(count).then(featuredProducts => {
            if (!featuredProducts || featuredProducts.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No Featured Products found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    products: featuredProducts
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};