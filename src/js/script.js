/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

// const { active } = require("browser-sync");

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: "#template-menu-product",
      },
      containerOf: {
        menu: '#product-list',
        cart: '#cart',
      },
      all: {
        menuProducts: '#product-list > .product',
        menuProductsActive: '#product-list > .product.active',
        formInputs: 'input, select',
      },
      menuProduct: {
        clickable: '.product__header',
        form: '.product__order',
        priceElem: '.product__total-price .price',
        imageWrapper: '.product__images',
        amountWidget: '.widget-amount',
        cartButton: '[href="#add-to-cart"]',
      },
      widgets: {
        amount: {
          input: 'input[name="amount"]',
          linkDecrease: 'a[href="#less"]',
          linkIncrease: 'a[href="#more"]',
        },
      },
    };

    const classNames = {
      menuProduct: {
        wrapperActive: 'active',
        imageVisible: 'active',
      },
    };

    const settings = {
      amountWidget: {
        defaultValue: 1,
        defaultMin: 1,
        defaultMax: 9,
      }
    };

    const templates = {
      menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
    };

    class Product {
      constructor(id, data){
        const thisProduct = this;
        this.id = id;
        this.data = data;
        this.renderInMenu();



        console.log('new Product:', thisProduct);
      }



      renderInMenu(){
        const thisProduct = this;

        /* generate HTML based on template */
        const generateHTML = templates.menuProduct(thisProduct.data);
        //console.log('generateHTML' + templates.menuProduct(thisProduct.data));

        /* create element using utils.createElementFromHTML */
        thisProduct.element = utils.createDOMFromHTML(generateHTML);
        //create a DOM element and save it as an attribute of the new-created instance

        /* find menu container */
        const menuContainer = document.querySelector(select.containerOf.menu);

        /* add element to menu */
        menuContainer.appendChild(thisProduct.element);

      }

      initAccordion(){
        const thisProduct = this;

      /* find the clickable trigger (the element that should react to clicking) */
      //const clickableTrigger = ???;

        /* START: add event listener to clickable trigger on event click */
        clickableTrigger.addEventListener('click', function(event) {
          /* prevent default action for event */

          /* find active product (product that has active class) */

          /* if there is active product and it's not thisProduct.element, remove class active from it */

          /* toggle active class on thisProduct.element */
        });

      }
    }


    const app = {

        initData: function(){
          const thisApp = this;
          console.log('served-meals', dataSource);
          thisApp.data = dataSource; //created a handy reference to dataSource at data.js
        },

        initMenu: function () {
          const thisApp = this;
          console.log('thisAppdata', thisApp.data) //[potencial problem] gtools show 5 new Product
          for(let productData in thisApp.data.products){ //loop iterates productData of all products
            new Product(productData, thisApp.data.products[productData]); //a new instance created, contains 2 argument: productData (object properties), thisApp.data.products[productData] (object values)
          }
          const testProduct = new Product (); //[potencial problem] create a new insance but why
          console.log('testProduct', testProduct);
      },

        init: function(){
          const thisApp = this;
          console.log('*** App starting ***');
          console.log('thisApp:', thisApp);
          console.log('classNames:', classNames);
          console.log('settings:', settings);
          console.log('templates:', templates);
          this.initData();
          this.initMenu();
        }


    };

      const thisApp = this;
      thisApp.data = dataSource;
      app.initData;
      app.initMenu;

      app.init();

  }
