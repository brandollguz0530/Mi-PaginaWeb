function cart (db, printproductos) {
    
    let cart = []
    //Elementos del DOM
    const productsDOM = document.querySelector('.products--container')
    const notifyDOM = document.querySelector('.notify')
    const cartDOM = document.querySelector('.cart--body')
    const counDOM = document.querySelector('.cart--count--item')
    const totalDOM = document.querySelector('.cart--total--item')
    const checkoutDOM = document.querySelector('.btn--buy')
    //functions    
    function printCart() {
        let htmlCart = ``
        
        if (cart.length === 0) {
            htmlCart += `
            <div class="cart--empty">
            <i class='bx bx-cart'></i>
            <p class="cart--empty--text">No hay productos en el carrito</p>
            </div> 
            `               


            notifyDOM.classList.remove('show--notify')
        }   else {

            for (let item of cart) {
                let product = db.find(p => p.id === item.id)
                htmlCart += `
                <article class="article" >
                <div class="article--image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="article--content">
                    <h3 class="article--title">${product.name}</h3>
                    <span class="article--price">$${product.price}</span>
                    <div class="article--quantity">
                        <button  type="button" class="article--quantity--btn article--minus" data-id="${item.id}" >
                            <i class='bx bx-minus'></i>
                        </button>
                        <span class="article--quantity-text">${item.qty}</span>
                        <button  type="button" class="article--quantity--btn article--plus" data-id="${item.id}" >
                            <i class='bx bx-plus'></i>
                        </button>
                        
                    </div>
                    <button  type="button" class="article--btn remove-from-cart" data-id="${item.id}" >
                        <i class='bx bx-trash' ></i>
                    </button>
                </div>
            </article>
                `
            }
            notifyDOM.classList.add('show--notify')
            }

        cartDOM.innerHTML = htmlCart
        notifyDOM.innerHTML = showItemsCount()
        counDOM.innerHTML = showItemsCount()
        totalDOM.innerHTML = showTotal()
    }


    function addToCart (id, qty = 1) {
        const itemFinded = cart.find(i => i.id === id)
        
        if (itemFinded) {
            itemFinded.qty +=  qty
        } else {
            cart.push({ id , qty})
        }

        printCart()

    }
    
    function removeFromCart (id, qty = 1) {
        const itemFinded = cart.find(i => i.id === id)
        const result = itemFinded.qty - qty 
        if (result > 0 ) {
            itemFinded.qty -= result
        } else {
            cart = cart.filter(i => i.id !== id)
        }

        printCart()
    }

    function deleteFromCart (id) {
        cart = cart.filter(i => i.id !== id)

        printCart()
    }

    function showItemsCount () {
        let suma = 0

        for (const  item of cart) {
            
            suma  += item.qty
        }
        return suma

    }

    function showTotal () {
        let total = 0
        for (let item of cart ) {
            const  productFinded = db.find(p => p.id === item.id)
            
            total += item.qty * productFinded.price
            
        }
        
        return total 
    }

    function checkout () {
        for (const item of cart) {
            const  productFinded = db.find(p => p.id === item.id)
            console.log(item)
            productFinded.quiantity -= item.qty
        }
        cart = []
        printCart()
        printproductos()
        window.alert('Gracias por su compra')


    }

    printCart()
    //Eventos 
    productsDOM.addEventListener('click', function (e) {
        if(e.target.closest(".add--to--cart")){
            const id = +e.target.closest(".add--to--cart").dataset.id
           
            addToCart(id)

        }
    })

    //cartDOM 

    cartDOM.addEventListener('click', function (e) {
        if(e.target.closest(".article--minus")){
            const id = +e.target.closest(".article--minus").dataset.id
            removeFromCart(id)
        }

        if(e.target.closest(".article--plus")){
            const id = +e.target.closest(".article--plus").dataset.id
            addToCart(id)
        }

        if(e.target.closest(".remove-from-cart")){
            const id = +e.target.closest(".remove-from-cart").dataset.id
            deleteFromCart(id)
        }

        
    })

    //checkoutDOM 

    checkoutDOM.addEventListener('click', function (){
        checkout()
    })

    
}


export default cart 