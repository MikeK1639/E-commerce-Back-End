const router = require('express').Router();
const { Tag, Category, Product, ProductTag  } = require('../../models');

router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Products
  Product.findAll({
    attributes: [
      'id',
      'product_name'
    ],

   include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id' , 'tag_name']
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
 
router.get('/:id', async (req, res) => {
  try {
      const productData = await Product.findByPk(req.params.id, {
          include: [{ model: Product }],
      });

      if (!productData) {
          res.status(404).json({ message: 'No Driver found with that id!' });
          return;
      }
      res.status(200).json(productData);
  } catch (err) {
      res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
    });

    if (!productData) {
      res.status(404).json({ message: 'No data found for program' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
