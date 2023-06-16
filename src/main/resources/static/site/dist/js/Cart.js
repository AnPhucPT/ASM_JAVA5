
    function getCartFromLS(){
        return JSON.parse(localStorage.getItem("cart")) || []
    }

    function setCartToLS(cart){
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    function addToCart(product, quantity=1){
        let cartItems = getCartFromLS()
        let index = cartItems.findIndex(item => item.id === product.id)
        if(index === -1){
            cartItems=[...cartItems, {...product, quantity}]
            console.log(cartItems)
        }else{
            cartItems[index].quantity = cartItems[index].quantity + quantity
        }
        setCartToLS(cartItems)
    }




