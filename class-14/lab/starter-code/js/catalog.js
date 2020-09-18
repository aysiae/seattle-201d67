/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product [done]
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
      var option = document.createElement('option');
      option.setAttribute('value',Product.allProducts[i].name);
      option.textContent = Product.allProducts[i].name;
      selectElement.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading [done]
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  document.querySelector('form').reset();

}

// TODO: Add the selected item and quantity to the cart [done]
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  var addItem = getFormItem();
  cart.addItem(addItem[0],addItem[1]);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart [done]
function updateCounter() {
  var span = document.getElementById('itemCount');
  var total = 0;
  for(var i in cart.items) {
    var num = Number(cart.items[i].quantity);
    total = total + num;
  }
  span.textContent = ": " + total;
}

function getFormItem() {
  var getItems = document.getElementById('items');
  var selectedItem = getItems.options[getItems.selectedIndex].text;
  var getQuantity = document.getElementById('quantity');
  var quantity = getQuantity.value;
  var itemQuantity = [selectedItem,quantity];
  return itemQuantity;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var addItem = getFormItem();
  if(document.getElementById('cartContents').firstChild != null) {
    var remove = document.getElementById('cartContents').firstChild;
    remove.remove();
  }
  var position = document.getElementById('cartContents');
  var paragraph = document.createElement('p');
  paragraph.textContent = "Item(s) added: " + addItem[1] + " " + addItem[0] + "(s).";
  position.appendChild(paragraph);

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
