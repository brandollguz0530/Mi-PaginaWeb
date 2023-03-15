function products (productos)  {
    const db = [...productos]

    function printproductos (){
        const productsDOM =  document.querySelector('.products--container')
        let htmlproduct = ''

        for (let products of db ) {
            htmlproduct += `
            <article class="product">
                        <div class="product--image">
                            <img src="${products.image}" alt="${products.name}" >
                        </div>
                        <div class="product--content">
                            <button type="button" class="product--btn add--to--cart" data-id=${products.id} >
                                <i class='bx bx-cart-download'></i>
                            </button>
                            <span class="product--price">$${products.price}</span>
                            <span class="produc--stock"  >${products.quantity}</span>
                            <h3 class="product--title">${products.name}</h3>
                        </div>
                    </article>
            `
        }

        productsDOM.innerHTML = htmlproduct
    }
 
    printproductos()

    return { db,
    printproductos
    }
}

export default products 