const Product = require("./models/Mobile");

const smartphoneDataInINR = [
    // Apple
    {
      productId: '1',
      productName: 'iPhone 14',
      productCompany: 'Apple',
      productRating: 4.8,
      productPrice: 74900,
      productStock:200,
      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The iPhone 13 is the latest addition to Apple\'s iconic smartphone lineup. With its sleek design and advanced features, it offers an impressive user experience. The A15 Bionic chip powers smooth performance, while the Super Retina XDR display showcases vibrant visuals. Capture stunning photos and videos with the improved dual-camera system, and enjoy all-day battery life.',
      productImageUrl: 'https://imagineonline.store/cdn/shop/products/MPV03HN_A_1.jpg?v=1662718728',
      wishlisted: false
    },
    {
      productId: '2',
      productName: 'iPhone 13 Pro',
      productCompany: 'Apple',
      productRating: 4.9,
      productPrice: 89925,
      productStock:200,
      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The iPhone 13 Pro is a professional-grade smartphone designed for users who demand the best. Equipped with a powerful A15 Bionic chip and ProMotion technology, it delivers unparalleled performance and responsiveness. The Pro camera system with enhanced low-light capabilities ensures exceptional photography and videography. With its stunning design and high-end features, the iPhone 13 Pro is a true flagship device.',
      productImageUrl: 'https://m.media-amazon.com/images/I/61HHS0HrjpL._SX679_.jpg',
      wishlisted: true
    },
    {
      productId: '3',
      productName: 'iPhone SE',
      productCompany: 'Apple',
      productRating: 4.5,
      productPrice: 29900,
      productStock:200,
      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The iPhone SE combines compact size with powerful performance. With the A14 Bionic chip, you get fast and efficient performance for everyday tasks. The Retina HD display offers sharp visuals, and the single-camera system delivers great photos. Experience Apple\'s iOS ecosystem in a budget-friendly package.',
      productImageUrl: 'https://m.media-amazon.com/images/I/61A0Zu4K-TL._SX679_.jpg',
      wishlisted: false
    },
    {
      productId: '4',
      productName: 'iPhone 12 Mini',
      productCompany: 'Apple',
      productRating: 4.7,
      productPrice: 52400,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The iPhone 12 Mini packs flagship features into a compact design. With the A14 Bionic chip, it offers excellent performance. The Super Retina XDR display provides stunning visuals, and the dual-camera system captures impressive photos. If you prefer a smaller smartphone without compromising on features, the iPhone 12 Mini is a great choice.',
      productImageUrl: 'https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg',
      wishlisted: true
    },
    {
      productId: '5',
      productName: 'iPhone 11',
      productCompany: 'Apple',
      productRating: 4.6,
      productPrice: 44900,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The iPhone 11 offers exceptional value with its powerful performance and dual-camera system. The A13 Bionic chip ensures smooth usage, and the Liquid Retina display delivers great visuals. Capture stunning photos and enjoy features like Face ID and Animoji. The iPhone 11 continues to be a popular choice among users.',
      productImageUrl: 'https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/i/p/iphone-11-128gb-black.jpg',
      wishlisted: false
    },
  
    // Samsung
    {
      productId: '6',
      productName: 'Galaxy S21',
      productCompany: 'Samsung',
      productRating: 4.7,
      productPrice: 54900,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Samsung Galaxy S21 is a powerful smartphone that combines cutting-edge technology with elegant design. Its dynamic AMOLED display showcases stunning visuals, while the Exynos 2100 processor ensures smooth performance. Capture high-quality photos and videos with the versatile triple-camera system. With 5G connectivity and a range of smart features, the Galaxy S21 offers a premium mobile experience.',
      productImageUrl: 'https://m.media-amazon.com/images/I/81cHpJNr07L.jpg',
      wishlisted: true
    },
    {
      productId: '7',
      productName: 'Galaxy Note 20',
      productCompany: 'Samsung',
      productRating: 4.6,
      productPrice: 64900,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",
      productDescription: 'The Samsung Galaxy Note 20 is a flagship smartphone that caters to productivity enthusiasts. Its S Pen offers precise input for note-taking and creative tasks. The powerful Exynos 990 processor ensures smooth multitasking, while the Super AMOLED Plus display delivers vibrant visuals. Capture stunning photos with the advanced camera system and enjoy a premium smartphone experience.',
      productImageUrl: 'https://m.media-amazon.com/images/I/81+Zx6troaL.jpg',
      wishlisted: false
    },
    {
      productId: '8',
      productName: 'Galaxy A52',
      productCompany: 'Samsung',
      productRating: 4.4,
      productPrice: 29900,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Samsung Galaxy A52 is a mid-range smartphone that offers impressive features for its price. With a Super AMOLED display, you get vibrant visuals. The quad-camera system lets you capture various types of photos, and the Exynos 720G processor ensures decent performance. Enjoy One UI and a sleek design with the Galaxy A52.',
      productImageUrl: 'https://m.media-amazon.com/images/I/81-nNnxa6VS.jpg',
      wishlisted: true
    },
    {
      productId: '9',
      productName: 'Galaxy Z Flip 3',
      productCompany: 'Samsung',
      productRating: 4.9,
      productPrice: 47900,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Samsung Galaxy Z Fold 3 is a foldable phone that offers advanced multitasking and a unique user experience. Unfold the device to reveal a large AMOLED display for productivity and entertainment. The Snapdragon 888 processor ensures powerful performance, and the triple-camera system captures great photos. With S Pen support and a refined design, the Galaxy Z Fold 3 is a premium choice for tech enthusiasts.',
      productImageUrl: 'https://m.media-amazon.com/images/I/71f2I8cltBL._SX679_.jpg',
      wishlisted: false
    },
    
    // Google
    {
      productId: '11',
      productName: 'Pixel 6',
      productCompany: 'Google',
      productRating: 4.8,
      productPrice: 44900,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Google Pixel 6 is a flagship smartphone that harnesses the power of AI to enhance your mobile experience. Its custom Google Tensor chip offers impressive performance and AI capabilities. The AMOLED display provides rich colors, while the dual-camera system captures stunning photos. With clean Android software and seamless integration with Google services, the Pixel 6 offers a unique user experience.',
      productImageUrl: 'https://m.media-amazon.com/images/I/71QQZr2pNSL.jpg',
      wishlisted: false
    },
    {
      productId: '12',
      productName: 'Pixel 5a',
      productCompany: 'Google',
      productRating: 4.5,
      productPrice: 33700,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Google Pixel 5a is an affordable Pixel smartphone with an excellent camera. It offers a clean Android experience and seamless integration with Google services. The Snapdragon 765G processor ensures smooth performance, and the OLED display provides vibrant visuals. Capture stunning photos and enjoy features like Night Sight for low-light photography.',
      productImageUrl: 'https://m.media-amazon.com/images/I/51cPFTAo1lL.jpg',
      wishlisted: true
    },
    {
      productId: '13',
      productName: 'Pixel 4 XL',
      productCompany: 'Google',
      productRating: 4.4,
      productPrice: 52000,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Google Pixel 4 XL is a previous-gen Pixel smartphone with an exceptional camera system. It offers a clean Android experience and regular software updates. The Snapdragon 855 processor ensures decent performance, and the OLED display delivers sharp visuals. Capture stunning photos with features like Night Sight and enjoy the benefits of Google\'s ecosystem.',
      productImageUrl: 'https://m.media-amazon.com/images/I/416YHOeIwsL.jpg',
      wishlisted: false
    },
    {
      productId: '14',
      productName: 'Pixel 3a',
      productCompany: 'Google',
      productRating: 4.2,
      productPrice: 25900,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Google Pixel 3a is a mid-range Pixel smartphone that delivers a clean Android experience and impressive camera capabilities. The Snapdragon 670 processor offers decent performance for everyday tasks. The OLED display provides vibrant colors, and the Night Sight feature enhances low-light photography. Enjoy Google\'s AI-driven features and seamless integration.',
      productImageUrl: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-31251/google_pixel_3a_xl-2-1024x768.jpg',
      wishlisted: true
    },
    {
      productId: '15',
      productName: 'Pixel 7',
      productCompany: 'Google',
      productRating: 4.1,
      productPrice: 22400,
      productStock:200,

      productCategory:"Mobile",
      productCategory2:"mobiles",

      productDescription: 'The Google Pixel 2 is an older flagship with a focus on a clean Android experience and excellent camera performance. The Snapdragon 835 processor offers smooth usage for everyday tasks. The OLED display showcases vivid visuals, and the camera excels in low-light conditions. If you value stock Android and photography, the Pixel 2 is a solid choice.',
      productImageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/l/2/y/-original-imaggswcffkgcupp.jpeg',
      wishlisted: false
    },
    {
        productId: '16',
        productName: 'Basmati Rice',
        productCompany: 'Kohinoor',
        productRating: 4.5,
        productPrice: 10,
        productStock: 100,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Premium quality basmati rice.',
        productImageUrl: 'https://www.jiomart.com/images/product/original/493073099/kohinoor-authentic-basmati-rice-1-kg-product-images-o493073099-p600748609-0-202304201903.jpg',
        wishlisted: false
    },
    {
        productId: '17',
        productName: 'Turmeric Powder',
        productCompany: 'Eastern',
        productRating: 4.2,
        productPrice: 3,
        productStock: 50,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Pure turmeric powder for cooking and health benefits.',
        productImageUrl: 'https://m.media-amazon.com/images/I/81x3ykdrdbL._SL1500_.jpg',
        wishlisted: true
    },
    {
        productId: '18',
        productName: 'Chickpeas',
        productCompany: 'Tata',
        productRating: 4.0,
        productPrice: 4,
        productStock: 80,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Dried chickpeas for various dishes.',
        productImageUrl: 'https://m.media-amazon.com/images/I/619Uw840ucL.jpg',
        wishlisted: false
    },
    {
        productId: '19',
        productName: 'Sona Masoori Rice',
        productCompany: 'Daawat',
        productRating: 4.3,
        productPrice: 8,
        productStock: 120,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'A popular variety of rice for everyday use.',
        productImageUrl: 'https://www.jiomart.com/images/product/original/491377382/daawat-sonamasoori-rice-10-kg-product-images-o491377382-p491377382-0-202305232208.jpg',
        wishlisted: true
    },
    {
        productId: '20',
        productName: 'Red Lentils',
        productCompany: 'Laxmi',
        productRating: 4.1,
        productPrice: 5,
        productStock: 60,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Split red lentils for making lentil soup and curries.',
        productImageUrl: 'https://m.media-amazon.com/images/I/7148X4tywqL.jpg',
        wishlisted: false
    },
    {
        productId: '21',
        productName: 'Ghee',
        productCompany: 'Amul',
        productRating: 4.7,
        productPrice: 12,
        productStock: 40,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Pure clarified butter for cooking and flavoring.',
        productImageUrl: 'https://www.bigbasket.com/media/uploads/p/l/40046231_3-amul-amul-ghee-500-ml.jpg',
        wishlisted: true
    },
    {
        productId: '22',
        productName: 'Black Mustard Seeds',
        productCompany: 'Catch',
        productRating: 4.4,
        productPrice: 2.5,
        productStock: 75,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Aromatic black mustard seeds for tempering.',
        productImageUrl: 'https://cdn.grofers.com/app/images/products/full_screen/pro_388680.jpg',
        wishlisted: false
    },
    {
        productId: '23',
        productName: 'Tamarind',
        productCompany: 'TRS',
        productRating: 4.0,
        productPrice: 3.5,
        productStock: 65,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Tangy tamarind pulp for adding sourness to dishes.',
        productImageUrl: 'https://www.qualityfoodsonline.com/cdn/shop/products/DFN-121_clipped_rev_1.jpg',
        wishlisted: false
    },
    {
        productId: '24',
        productName: 'Chilli Powder',
        productCompany: 'MTR',
        productRating: 4.3,
        productPrice: 4.5,
        productStock: 50,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Fiery red chili powder for adding heat and flavor to your dishes. Made from the finest Indian red chilies, this spice will give your curries, sauces, and marinades a rich, vibrant color and a spicy kick. Use it in moderation to turn up the heat or sprinkle it for a touch of fiery flair. Elevate your cooking with the bold taste of Aashirvaad Red Chili Powder.',
        productImageUrl: 'https://shop.mtrfoods.com/cdn/shop/products/ChilliPowder-100g-frontcopy_700x.png',
        wishlisted: true
    },
    {
        productId: '25',
        productName: 'Cardamom Pods',
        productCompany: 'Everest',
        productRating: 4.6,
        productPrice: 7.5,
        productStock: 30,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Aromatic cardamom pods for enhancing flavors.',
        productImageUrl: 'https://www.pureindianfoods.com/cdn/shop/products/cas-4.jpg',
        wishlisted: true
    },
    {
        productId: '26',
        productName: 'Coconut Oil',
        productCompany: 'Parachute',
        productRating: 4.5,
        productPrice: 9,
        productStock: 45,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Pure coconut oil for cooking and beauty uses.',
        productImageUrl: 'https://m.media-amazon.com/images/I/51zTPT5QTCL.jpg',
        wishlisted: false
    },
    {
        productId: '27',
        productName: 'Cumin Seeds',
        productCompany: 'Ramdev',
        productRating: 4.2,
        productPrice: 2.2,
        productStock: 70,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Aromatic cumin seeds for seasoning and flavoring.',
        productImageUrl: 'https://res.fkhealthplus.com/incom/images/product/Patanjali-Cumin-Whole-1611037334-10033740-1.jpg',
        wishlisted: false
    },
    {
        productId: '28',
        productName: 'Chana Dal',
        productCompany: "Tata",
        productRating: 4.1,
        productPrice: 4.2,
        productStock: 55,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Split chickpeas for making lentil dishes.',
        productImageUrl: 'https://cdn.shopify.com/s/files/1/0530/4552/6694/products/Tata-Sampann-Chana-Dal-1kg-_FOP_-with-Sanjeev-kapoor.png',
        wishlisted: true
    },
    {
        productId: '29',
        productName: 'Garam Masala',
        productCompany: 'Tata',
        productRating: 4.4,
        productPrice: 3.5,
        productStock: 60,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'A blend of aromatic spices for Indian cooking.',
        productImageUrl: 'https://m.media-amazon.com/images/I/7147vd6XkmL.jpg',
        wishlisted: true
    },
    {
        productId: '30',
        productName: 'Cashew Nuts',
        productCompany: 'Tata',
        productRating: 4.6,
        productPrice: 6.5,
        productStock: 40,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Premium cashew nuts for snacking and cooking.',
        productImageUrl: 'https://cdn.shopify.com/s/files/1/0530/4552/6694/products/1_582eed32-a5af-4fc8-bf2c-0afea1c2f179.jpg',
        wishlisted: false
    },
    {
        productId: '31',
        productName: 'Agni Tea',
        productCompany: 'Tata',
        productRating: 4.3,
        productPrice: 2.8,
        productStock: 70,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Tata Tea Agni is a robust and full-bodied tea blend, carefully selected to give you a strong tea experience. Perfect for those who enjoy a bold cup of tea.',
        productImageUrl: 'https://apnafoodmarket.com/wp-content/uploads/2020/04/tata-tea.jpg',
        wishlisted: true
    },
    {
        productId: '32',
        productName: 'Red Chili Powder',
        productCompany: 'Aashirvaad',
        productRating: 4.2,
        productPrice: 2.5,
        productStock: 75,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Fiery red chili powder for adding heat to dishes.',
        productImageUrl: 'https://m.media-amazon.com/images/I/91+EvFTrzIL._SL1500_.jpg',
        wishlisted: false
    },
    {
        productId: '33',
        productName: 'Aata',
        productCompany: 'Aashirvaad ',
        productRating: 4.0,
        productPrice: 4.5,
        productStock: 65,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: "Aashirwad Flour: Premium quality wheat flour for delightful, fluffy, and nutritious creations. Perfect for versatile cooking.",
        productImageUrl: 'https://m.media-amazon.com/images/I/91o0m2iIpVL._SL1500_.jpg',
        wishlisted: false
    },
    {
        productId: '34',
        productName: 'Pasteurised Butter',
        productCompany: 'Amul',
        productRating: 4.7,
        productPrice: 13,
        productStock: 30,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Creamy Amul butter, a delightful blend of taste and quality, perfect for spreading and cooking.',
        productImageUrl: 'https://www.jiomart.com/images/product/original/490001392/amul-butter-500-g-carton-product-images-o490001392-p490001392-0-202203152128.jpg',
        wishlisted: true
    },
    {
        productId: '35',
        productName: 'Sunflower Oil ',
        productCompany: 'Freedom',
        productRating: 4.4,
        productPrice: 2.2,
        productStock: 60,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: "Vibrant FreedomSun flower: A symbol of nature's beauty, radiating joy with its golden petals. Bring sunshine indoors.",
        productImageUrl: 'https://www.jiomart.com/images/product/original/490768937/freedom-refined-sunflower-oil-5-l-product-images-o490768937-p490768937-0-202204281550.jpg',
        wishlisted: true
    },
    {
        productId: '36',
        productName: 'Noodles',
        productCompany: 'Maggi',
        productRating: 4.5,
        productPrice: 3.5,
        productStock: 50,
        productCategory: 'Grocery',
        productCategory2: 'groceries',
        productDescription: 'Maggi: Instant noodles with savory flavors. Quick, convenient meal. Loved globally for its taste and simplicity.',
        productImageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/7/MU/PJ/SD/5742893/maggi-noodles.jpg',
        wishlisted: false
    }
]




  
  Product.insertMany(smartphoneDataInINR)
    .then(() => {
      console.log('Smartphone data inserted successfully');
    })
    .catch((err) => {
      console.error('Error inserting smartphone data:', err);
    });
  

    // Product.findOne({ productId:productId })
    // .then((product) => {
    //     if (!product) {
    //         res.status(404).send("Product not found!");
    //     }
    //     product.productStock-=1
    //     product.save()
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    //     User.findOne({ email: req.user.email })
    //         .then((user) => {
    //             if (!user) {
    //                 res.status(404).send("User not found!");
    //             }
                
    //             const existingCartItem = user.cart.find(function (item) {
    //                 return item.productId === productId;
    //             })

    //             if (existingCartItem) {
    //                 existingCartItem.quantity+=1;
    //             } else {
    //                 user.cart.push({ productId, quantity: 1 })
    //             }

    //             user.save()
    //             .then((saveErr) => {
    //                 res.send('Item added to cart.')
    //             })
    //             .catch((err)=>{
    //                 console.log(err)
    //             })
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             res.status(404).send("An error occurred while fetching user.")
    //         });
    // })
    // .catch((err) => {
    //     console.error(err)
    //     res.status(404).send("An error occurred while fetching product.")
    // })