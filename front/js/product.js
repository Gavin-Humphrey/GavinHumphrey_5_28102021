fetch('http://localhost:3000/api/products')//Envoyer une requête pour récupérer les données au format json
.then(response => response.json())
.then(data => console.log(data));

// récupération de l'id
const searchParams = new URLSearchParams(location.search);
const id = searchParams.get("id");


fetch('http://localhost:3000/api/products/'+id)
.then(response => response.json())
.then(data => {
    const product = data;
     
    printProduit(product);

  // fonction pour afficher le  produit
  function printProduit(product) {

    // insertion des information de la card du produit
    const selectionProductImage = document.getElementById("productImage");
    selectionProductImage.innerHTML += `
    <img src="${product.imageUrl}" alt="${product.name}">`;

    const selectionProductTitle = document.getElementById("title");
    selectionProductTitle.innerHTML += `
      ${product.name}
`;
          const selectionProductPrice = document.getElementById("price");
            selectionProductPrice.innerHTML += `
         ${product.price}
        `;
            const selectionProductDescription = document.getElementById("description");
            selectionProductDescription.innerHTML += `
        
        ${product.description}
              
        `;
        displayColors(product);
        }

//cette fonction, parcour la liste de couleur de ce produit et les affiches dans un element HTML de type <option> 
    function displayColors(product) {
        const colorsChoice = document.getElementById("colors");
        for (let colors of product.colors) {
            colorsChoice.innerHTML += `<option value="${colors}">${colors}</option>`;
        }
    }

});

