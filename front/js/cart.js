//Initialiser le localStorage
const allProductsURL = 'http://localhost:3000/api/products';
const data = fetch(allProductsURL).then(response => response.json());
const sectionEl = document.querySelector('#cart__items');
const totalQuantity_DOM = document.querySelector('#totalQuantity'); 
const totalPrice_DOM = document.querySelector('#totalPrice');

//Afficher le recap de produit selectionées
    const displayCartContent = async () => {
    const cartContent = JSON.parse(localStorage.getItem('product')) || [];//recouperer toutes dans local storage
    const totalQuantity = cartContent.reduce((acc, curr) => acc + parseInt(curr.quantityOfProduct), 0);//Calculer le nombre the items dans local storage product
    const allProducts = await data;
    let totalPrice = 0;

    //On parcour toute les elements dans local storage
    const productsEl = cartContent.forEach(productCart => { 

    //Calculer le prix total en function de nombre d'article
    const productDetails = allProducts.find(product => product._id === productCart.idOfProduct);
    totalPrice += productDetails.price * productCart.quantityOfProduct;

    //Reconstruire dynamiquement le DOM
    const DOM_article = document.createElement('article');
    DOM_article.className = "cart__item";
    DOM_article.dataset.id = `${productCart.idOfProduct}-${productCart.colorOfProduct}`//A differencie chaque article de panier

    DOM_article.innerHTML = `<div class="cart__item__img">
    <img src=${productDetails.imageUrl} alt=${productDetails.altTxt}>
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
    <h2>${productDetails.name}</h2>
    <p>${productDetails.price}€</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté :${productCart.quantityOfProduct} </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productCart.quantityOfProduct}>
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>`
    sectionEl.appendChild(DOM_article);
    });
    totalPrice_DOM.textContent = totalPrice;
    totalQuantity_DOM.textContent = totalQuantity;

    const allArticles_DOM= document.querySelectorAll('.cart__item');

    /* Add events to change quantity and remove product */
    allArticles_DOM.forEach(el=>{
    const deleteItem_DOM = el.querySelector('.deleteItem');
    const idProductWithColor = el.dataset.id; 

    //Ont ecoute le clique sur bouton suprimé, faire appel a la function removeProduct
    deleteItem_DOM.addEventListener('click',()=>removeProduct(idProductWithColor));

    //Handle item quantity . Gerer la quantité item dans le DOM
    const itemQuantity_DOM = el.querySelector('.itemQuantity');
    const newQuantity = itemQuantity_DOM.value;
    itemQuantity_DOM.addEventListener('click', (e)=>{
    const newQuantity = itemQuantity_DOM.value;
    handleQuantity(newQuantity, idProductWithColor);
    }
    )
    })
    }

    displayCartContent();

    const removeAllChildNodes= (parent) => {
        while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        }
        }

        //FUNCTION FILTER
        /* To remove product on click */  // Compare products and remove selected products
        const removeProduct = (idProductWithColor) => {
        const cartContent = JSON.parse(localStorage.getItem('product'));
        const newCartContent = cartContent.filter(el => `${el.idOfProduct}-${el.colorOfProduct}` !== idProductWithColor);
        localStorage.setItem('product', JSON.stringify(newCartContent));
        
        /* to remove old products from dom */
        removeAllChildNodes(sectionEl);
        
        /* to show the new cart content whitout the product removed */
        displayCartContent();
        }

        //Ajouter une nouvelle item en function de l'id et la couleur
        const handleQuantity = (newQuantity, idProductWithColor) => {
        const cartContent = JSON.parse(localStorage.getItem('product'));
        const newCartContent = cartContent.map(el=> {
        const currentIdProductWithColor = `${el.idOfProduct}-${el.colorOfProduct}`;
        console.log(currentIdProductWithColor);
        if(currentIdProductWithColor === idProductWithColor){
        const currentProductWithNewQuantity = {...el};
        currentProductWithNewQuantity.quantityOfProduct = newQuantity;
        return currentProductWithNewQuantity;
        }
        return el;
        });
        
        localStorage.setItem('product', JSON.stringify(newCartContent));
        removeAllChildNodes(sectionEl);
        displayCartContent();
        }

    //Form validation
    function getForm() {
        let form = document.querySelector(".cart__order__form");

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var address = document.getElementById("address").value;
        var city = document.getElementById("city").value;
        var email = document.getElementById("email").value;

        //Créer des expressions régulières Regex
        let firstNameRGEX = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
        let lastNameRGEX = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
        let addressRGEX = new RegExp(/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/);
        let cityRGEX = new RegExp(/^[a-zA-Z',.\s-]{1,25}$/);
        let emailRGEX = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);

// la vérification des données via des Regex.
    const firstNameValid = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (firstNameRGEX.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez remplir ce champ correctement';
    }
    }

    const lastNameValid = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (lastNameRGEX.test(inputLastName.value)) { 
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez remplir ce champ correctement';
    }
    }

    const addressValid = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRGEX.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez remplir ce champ correctement';
    }
    }

    const cityValid = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

    if (cityRGEX.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez remplir ce champ correctement';
    }
    }
    
    const emailValid = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRGEX.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    }else {
        emailErrorMsg.innerHTML = 'Veuillez remplir ce champ correctement';
    }
    };

    // Debut d'ecoute de modif du form
    form.firstName.addEventListener('change', function() {
        firstNameValid(this);
    });

    form.lastName.addEventListener('change', function() {
        lastNameValid(this);
    });

    form.address.addEventListener('change', function() {
        addressValid(this);
    });

    form.city.addEventListener('change', function() {
        cityValid(this);
    });

    form.email.addEventListener('change', function() {
        emailValid(this);
    });
//Fin d'ecoute de modif du form.
}
    getForm();
  
const orderURL_page = 'confirmation.html';

var inputFirstName = document.getElementById('firstName');
            var inputLastName = document.getElementById('lastName');
            var inputAddress = document.getElementById('address');
            var inputCity = document.getElementById('city');
            var inputEmail = document.getElementById('email');

const handleForm = () => {
            order.addEventListener('click', (e) => {

                const isProductsInCart = (localStorage.getItem('product') || []).length;
                e.preventDefault();
                getForm();
                const contact = {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value
                };
                
                if(isProductsInCart && inputFirstName.value && inputLastName.value
                && inputAddress.value && inputCity.value && inputEmail.value) {
                localStorage.setItem('contact', JSON.stringify(contact));
                window.location.replace(orderURL_page);
                }
                }); 
                }
                
                handleForm();
                  
function postForm(){
    const btn_commander = document.getElementById("order");

fetch("http://localhost:3000/api/products/order", Options)
.then((response) => response.json())
.then((data) => {
    console.log(data);
    localStorage.clear();
    localStorage.setItem("orderId", data.orderId);

    document.location.href = "confirmation.html";
})
.catch((error) => {
    alert ("Fetch issue:" + error.message);
});
}
postForm();










        
        
        


   
         
          