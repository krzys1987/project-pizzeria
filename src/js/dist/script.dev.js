"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global Handlebars, utils, dataSource */
// eslint-disable-line no-unused-vars
// const { active } = require("browser-sync");
{
  'use strict';

  var select = {
    templateOf: {
      menuProduct: "#template-menu-product"
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart'
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select'
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]'
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]'
      }
    }
  };
  var classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active'
    }
  };
  var settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9
    }
  };
  var templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML)
  };

  var Product =
  /*#__PURE__*/
  function () {
    function Product(id, data) {
      _classCallCheck(this, Product);

      var thisProduct = this;
      this.id = id;
      this.data = data;
      this.renderInMenu();
      this.getElements();
      this.initAccordion();
      this.initOrderForm();
      this.processOrder();
      console.log('PRODUCT', this);
      console.log('new Product:', thisProduct);
    } //initOrderForm --> select product to buy


    _createClass(Product, [{
      key: "initOrderForm",
      value: function initOrderForm() {
        var thisProduct = this;
        thisProduct.form.addEventListener('submit', function (event) {
          event.preventDefault();
          thisProduct.processOrder();
        }); //Loop start for thisProduct -->4 loops

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = thisProduct.formInputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var input = _step.value;
            input.addEventListener('change', function () {
              thisProduct.processOrder();
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        thisProduct.cartButton.addEventListener('click', function (event) {
          event.preventDefault();
          thisProduct.processOrder();
          alert('the product added to shopping bag');
        });
      }
    }, {
      key: "processOrder",
      value: function processOrder() {
        var thisProduct = this; // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}

        var formData = utils.serializeFormToObject(thisProduct.form);
        console.log('###formData###', formData); // set price to default price

        var price = thisProduct.data.price; //a loop throw every of general category (param)

        for (var paramId in thisProduct.data.params) {
          //set params value > paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
          var param = thisProduct.data.params[paramId];
          console.log('paramId, param', param, paramId); //### NOTE ### FIX IT to count price: default paramId = default price, and +/- from its value
          //a loop within every product opions in chosen category

          for (var optionId in param.options) {
            //set options value > optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
            var option = param.options[optionId];
            console.log('option, optionId'); //### NOTE ### FIX IT to count price
          }
        } // update calculated price in the HTML


        console.log(thisProduct, 'priceElem', select.menuProduct.priceElem); // thisProduct.priceElem.innerHTML = price;
        //pick a value from thisProduct classes

        var yourChosenproducts = thisProduct.element.querySelector(select.menuProduct.priceElem); //put chosen products prices to HTML

        var priceHTML = yourChosenproducts.innerHTML; //[DONE ALREADY] set a price variable
      }
    }, {
      key: "renderInMenu",
      value: function renderInMenu() {
        var thisProduct = this;
        /* generate HTML based on template */

        var generateHTML = templates.menuProduct(thisProduct.data);
        /* create element using utils.createElementFromHTML */

        thisProduct.element = utils.createDOMFromHTML(generateHTML); //create a DOM element and save it as an attribute of the new-created instance

        /* find menu container */

        var menuContainer = document.querySelector(select.containerOf.menu);
        /* add element to menu */

        menuContainer.appendChild(thisProduct.element);
      }
      /* find elements in Product container */

    }, {
      key: "getElements",
      value: function getElements() {
        var thisProduct = this;
        thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
        thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
        thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
        thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
        thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.price);
      }
    }, {
      key: "initAccordion",
      value: function initAccordion() {
        var thisProduct = this;
        /* find the clickable trigger (the element that should react to clicking) */

        var clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable); //   /* watch clickableTrigger for actions */
        //   thisProduct.accordionTrigger.addEventListener('click', function(event) {
        // });

        /* START: add event listener to clickable trigger on event click */

        clickableTrigger.addEventListener('click', function (event) {
          /* prevent default action for event */
          event.preventDefault();
          /* find active product (product that has active class). Two methods bellow:
          1. ifs(DISABLED NOW), 2. toggle */
          // const hasActiveClass = clickableTrigger.classList.contains('active');

          /* if there is active product and it's not thisProduct.element, remove class active from it */
          // if (hasActiveClass) {
          //   clickableTrigger.classList.add('active')
          // } else {
          //   clickableTrigger.classList.remove('active')
          // }

          clickableTrigger.classList.toggle('active');
          /* toggle active class on thisProduct.element */

          thisProduct.element.classList.toggle('active');
        });
      }
    }]);

    return Product;
  }();

  var app = {
    initData: function initData() {
      var thisApp = this;
      console.log('served-meals', dataSource);
      thisApp.data = dataSource; //created a handy reference to dataSource at data.js
    },
    initMenu: function initMenu() {
      var thisApp = this;
      console.log('thisAppdata', thisApp.data); //[potencial problem] gtools show 5 new Product

      for (var productData in thisApp.data.products) {
        //loop iterates productData of all products
        new Product(productData, thisApp.data.products[productData]); //a new instance created, contains 2 argument: productData (object properties), thisApp.data.products[productData] (object values)
      }
    },
    init: function init() {
      var thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      this.initData();
      this.initMenu();
    }
  };
  var thisApp = void 0;
  thisApp.data = dataSource;
  app.initData;
  app.initMenu;
  app.init();
}