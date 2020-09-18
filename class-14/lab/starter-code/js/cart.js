/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart'));
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var cartTable = document.querySelector('tbody');
  if(cartTable.firstChild) {
    cartTable.firstChild.remove();
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tbody = document.querySelector('tbody');
  var cartContents = cart.items;
  // TODO: Iterate over the items in the cart
  for(var i in cartContents.items) {
      // TODO: Create a TR
    var itemRow = document.createElement('tr');
    tbody.appendChild(itemRow);
      // TODO: Create a TD for the delete link, quantity,  and the item
    var deleteX = document.createElement('td');
    var link = document.createElement('a');
    link.setAttribute('href',"");
    link.textContent = "X";
    deleteX.appendChild(link);
    var quantity = document.createElement('td');
    quantity.textContent = cartContents.items[i].quantity;
    var itemName = document.createElement('td');
    itemName.textContent = cartContents.items[i].product;
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    itemRow.appendChild(deleteX);
    itemRow.appendChild(quantity);
    itemRow.appendChild(itemName);
  }
}

function removeItemFromCart(event) {
  var removeElement = event.target.parentNode.nextElementSibling.nextElementSibling.textContent;
  cart.removeItem(removeElement);
  console.log(cart);
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
}

// This will initialize the page and draw the cart on screen
renderCart();
