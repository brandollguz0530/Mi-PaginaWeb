import loader from './components/loader.js'
import showMenu from './components/showMenu.js'
import showCart from './components/showCart.js'
import {cart} from './database/Fachentotarjetas.js'
import products from './components/Products.js'
import cartComponet from './components/cart.js'
//import cart from './components/cart.js'






/* UI Elements */
/* Ocultar liader */ 
loader()

/* Mostrar menu */
showMenu()

/* Mostrar carrito */

showCart()

/*  End UI Elements */

/* productos */

const {db, printproductos} = products(cart)


/* Carrito */

cartComponet (db ,printproductos )




