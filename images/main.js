
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.shopingcart');
let Removecart = document.querySelector('#close-cart');


cartIcon.addEventListener('click',()=>{
    console.log("hekk")
    cart.classList.add('active');
})
Removecart.addEventListener('click',()=>{
    cart.classList.remove('active');

})

function ready(){
    //remove items for cart//
    console.log("prabin")
    console.log("bagale")
    var removecartButtons = document.getElementsByClassName('cart-remove')
    console.log(removecartButtons)
    for(var i = 0; i < removecartButtons.length; i++){
        var button = removecartButtons[i]
        button.addEventListener("click", removecartItem)
    }
// Quantity changed//
      var quantityInputs = document.getElementsByClassName('cart-quantity')
      for(var i = 0; i < quantityInputs.length; i++){
          var input = quantityInputs[i]
          input.addEventListener('change', quantityChanged);
      }
      // add to cart//
      var addcart = document.getElementsByClassName('addcart')
      for(var i = 0; i < addcart.length; i++){
          var button = addcart[i]
          button.addEventListener('click', addcartclicked);
      }
       // buy button work//
       document.getElementsByClassName('btn-buy')[0].addEventListener('click', buybuttonclicked)
}
ready();
function removecartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}
// Quantity changed//
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal();
}
// buy button function//
function buybuttonclicked(event){
    alert('your Order is placed')
    var cartcontent = document.getElementsByClassName('cart-content')[0]
    while(cartcontent.hasChildNodes()){
        cartcontent.removeChild(cartcontent.firstChild)
    }
    updatetotal();
}

 // add to cart//
 function addcartclicked(event){
     event.preventDefault();
    var button = event.target
    var shopProducts = button.parentElement
    console.log(shopProducts)
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productimg = shopProducts.getElementsByClassName("productimg")[0].src;
    console.log(productimg)
    addProductTocart(title, price, productimg);
    updatetotal();
}
 function addProductTocart(title, price, productimg){
     var CartshopBox = document.createElement('div')
     CartshopBox.classList.add('cart-box')
     var Cartitems = document.getElementsByClassName('cart-content')[0]
     var CartitemsNames = Cartitems.querySelectorAll('.cart-product-title');
     console.log([...CartitemsNames].some((item)=> item.innerText === title.toUpperCase()))

     if ([...CartitemsNames].length > 0 && [...CartitemsNames].some((item)=> item.innerText === title.toUpperCase())){
           
        alert("you have already added this items to cart--", + title);
        
     }else 
     {
         var cartBoxContent = `
         <img src="${productimg}" alt="" class="cart-img">
         <div class="detail-box">
             <div class="cart-product-title">${title}</div>
             <div class="cart-price">${price}</div>
             <input type="number" value="0" class="cart-quantity">
         </div>
         <i class='bx bx-trash cart-remove'></i>`;
         CartshopBox.innerHTML = cartBoxContent
         Cartitems.append(CartshopBox)
         CartshopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removecartItem)
         CartshopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
     }
   
    

   
    
  
}


// update Total//
function updatetotal(){
    var cartcontent = document.getElementsByClassName('cart-content')[0]
    var cartboxes = cartcontent.getElementsByClassName('cart-box')
    var total = 0;
    for(var i = 0; i < cartboxes.length; i++){
        var cartbox = cartboxes[i]
        var priceElement = cartbox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartbox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$',""))
        var quantity = quantityElement.value
        total = total + (price * quantity);
    }   
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}
