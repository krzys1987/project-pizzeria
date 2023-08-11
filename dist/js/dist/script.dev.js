/* global Handlebars, utils, dataSource */
// eslint-disable-line no-unused-vars
// const { active } = require("browser-sync");
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    this.renderInMenu(); //function set properties of thisProduct.element

    this.getElements();
    this.initAccordion();
    this.initOrderForm();
    this.initAmountWidget();
    this.processOrder();
    console.log('PRODUCT', this);
    console.log('new Product:', thisProduct); // console.log('###'+''+this.initAmountWidget);
  }

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
      });
    }
  }, {
    key: "processOrder",
    value: function processOrder() {
      var thisProduct = this; // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}

      var formData = utils.serializeFormToObject(thisProduct.form);
      console.log('###formData###', formData); //set default price

      var price = thisProduct.data.price; //a loop throw every of general category (param)

      for (var paramId in thisProduct.data.params) {
        //set params value > paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
        var param = thisProduct.data.params[paramId]; //a loop within every product opions in chosen category
        //[DONE] decrease/increase thisProduct price

        for (var optionId in param.options) {
          //set options value > optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
          var option = param.options[optionId]; //find impages for selected product > contains paramId-optionId

          var optionImage = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId); //select paramId at formData but only ones contain optionId

          var optionSelected = formData[paramId] && formData[paramId].includes(optionId);
          var isCalculateAllowed = optionSelected && !option["default"]; //check if option is selected --> simply if contains optionSelected -->add photos
          // if(optionImage){
          //   if(optionSelected){
          //     optionImage.classList.add(classNames.menuProduct.imageVisible);
          //   } else {
          //     optionImage.classList.remove(classNames.menuProduct.imageVisible);
          //   }
          // }

          if (optionImage) {
            optionSelected ? optionImage.classList.add(classNames.menuProduct.imageVisible) : optionImage.classList.remove(classNames.menuProduct.imageVisible);
          }

          if (isCalculateAllowed) {
            price += option.price;
          }
        }
      } //show the product value


      var priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      thisProduct.element.querySelector(select.menuProduct.priceElem).innerHTML = price;
      priceElem.innerHTML = price; //price operation: put chosen product value and transfer to HTML
      // thisProduct.priceElem.innerHTML;
      // thisProduct.priceElem.innerHTML = price;
      //pick a value from thisProduct classes
      // const yourChosenproducts = thisProduct.element.querySelector(select.menuProduct.priceElem);
      //[DONE ALREADY] set a price variable
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
      var thisProduct = this; // const thisProduct.dom = {
      //   accordionTrigger: thisProduct.element.querySelector(select.menuProduct.clickable),
      //   form: thisProduct.element.querySelector(select.menuProduct.form),
      //   formInputs: thisProduct.form.querySelectorAll(select.all.formInputs),
      //   cartButton: thisProduct.element.querySelector(select.menuProduct.cartButton),
      //   priceElem: thisProduct.element.querySelector(select.menuProduct.price),
      //   imageWrapper: thisProduct.element.querySelector(select.menuProduct.imageWrapper),
      //   thisProduct.amountWidgetElem: thisProduct.element.querySelector(select.menuProduct.amountWidget),
      // }

      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.price);
      thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper); // 'product__images'

      thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget); //add div with bottoms +, - . SelectAll might cause chose other product div
    }
  }, {
    key: "initAmountWidget",
    value: function initAmountWidget() {
      var thisProduct = this; //create a new instance and give it a reference to div with buttons: -, +

      thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    }
  }, {
    key: "initAccordion",
    value: function initAccordion() {
      var thisProduct = this;
      /* find the clickable trigger (the element that should react to clicking) */

      var clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      /* START: add event listener to clickable trigger on event click */

      clickableTrigger.addEventListener('click', function (event) {
        /* prevent default action for event */
        event.preventDefault();
        /* find active product (product that has active class). */

        clickableTrigger.classList.toggle('active');
        /* toggle active class on thisProduct.element */

        thisProduct.element.classList.toggle('active');
      });
    }
  }]);

  return Product;
}();

var AmountWidget =
/*#__PURE__*/
function () {
  function AmountWidget(element) {
    _classCallCheck(this, AmountWidget);

    var thisWidget = this; // thisWidget.getElements(element);
    //getElements(element) --> function into the methood

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input); // thisWidget.setValue(thisWidget.input.value);

    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
    console.log('AmountWidget', this);
    console.log('contructor arg' + ' ' + 'Show HTML', element);
    thisWidget.setValue();
    thisWidget.initWatchers();
  }

  _createClass(AmountWidget, [{
    key: "initWatchers",
    value: function initWatchers() {
      var thisWidget = this;
      this.linkIncrease.addEventListener('click', function () {
        thisWidget.setValue(thisWidget.value + 1); // +1
      });
      this.linkDecrease.addEventListener('click', function () {
        thisWidget.setValue(thisWidget.value - 1); // -1
      });
      this.input.addEventListener('change', function () {
        thisWidget.setValue(thisWidget.input.value);
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var thisWidget = this;
      var newValue = parseInt(value); //parseInt convert text to numbers

      /* [DONE] Add validation - check value and convert to number if needed */

      if (thisWidget.value !== newValue && !isNaN(newValue) && newValue >= settings.amountWidget.defaultMax && newValue >= settings.amountWidget.defaultMin) {
        thisWidget.value = newValue;
      }

      thisWidget.input.value = thisWidget.value;
    }
  }]);

  return AmountWidget;
}(); //set an order value
// class initAction(){
//   //add event reaction, enable  widget -+
//   thisWidget.input.addEventListener('change', setValue(thisWidget.input));
//   thisWidget.linkDecrease.addEventListener('click', this.setValue(thisWidget.value -1) () =>
//    console.log("###minus###");
//    );
//    thisWidget.linkIncrease.addEventListener('click', this.setValue(thisWidget.value +1) () =>
//    console.log("###plus###");
//    );
// }
// class Cart {
//   constructor(element){
//     const thisCart = this;
//     thisCart.products = [];
//     thisCart.getElements(element);
//     console.log('thisCart', thisCart);
//   }
//   getElements(element){
//     const thisCart = this;
//     //create an object to hide dom properties inside aterwards
//     thisCart.dom = {};
//     thisCart.dom.wrapper = element;
//   }
// }
//execute thisWidget.element --> add a product and change price by click + or -
// AmountWidget.thisWidget.element;


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