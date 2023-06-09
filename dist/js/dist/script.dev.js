"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global Handlebars, utils, dataSource */
// eslint-disable-line no-unused-vars
var _require = require("browser-sync"),
    active = _require.active;

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
      console.log('new Product:', thisProduct);
    }

    _createClass(Product, [{
      key: "renderInMenu",
      value: function renderInMenu() {
        var thisProduct = this;
        /* generate HTML based on template */

        var generateHTML = templates.menuProduct(thisProduct.data); //console.log('generateHTML' + templates.menuProduct(thisProduct.data));

        /* create element using utils.createElementFromHTML */

        thisProduct.element = utils.createDOMFromHTML(generateHTML); //create a DOM element and save it as an attribute of the new-created instance

        /* find menu container */

        var menuContainer = document.querySelector(select.containerOf.menu);
        /* add element to menu */

        menuContainer.appendChild(thisProduct.element);
      }
      /* [NEW] Accordion add */

    }, {
      key: "initAccordion",
      value: function initAccordion() {
        var thisApp = this;
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

      var testProduct = new Product(); //[potencial problem] create a new insance but why

      console.log('testProduct', testProduct);
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