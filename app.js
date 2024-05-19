// app.js

const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');



// Set the view engine to use EJSn
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Serve static files from the public directory
app.use(express.static("public"));
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

mongoose
  .connect("mongodb://localhost:27017/WEB_PROJECT")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });

  app.use('/api/products', productRoutes);

  app.get('/products', (req, res) => res.render('products'));

// Define routes
app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/contactus', (req, res) => {
    res.render('contactpage');
});
app.get('/reviewus', (req, res) => {
    res.render('reviewpage');
});

app.get('/login', (req, res) => {
    res.render('loginpage');
});
app.get('/register', (req, res) => {
    res.render('registerpage');
});
app.get('/splash', (req, res) => {
    res.render('splash');
});


app.get('/product', (req, res) => {
    res.render('productpage');
});

app.get('/info', (req, res) => {
    res.render('informationpage');
});

app.get('/info/warranty', (req, res) => {
    res.render('warrantypage');
});
app.get('/info/return-policy', (req, res) => {
    res.render('returnpage');
});
app.get('/info/shipping', (req, res) => {
    res.render('shippingpage');
});
app.get('/info/payment-method', (req, res) => {
    res.render('paymentpage');
});



// Add more routes as needed for additional views

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});