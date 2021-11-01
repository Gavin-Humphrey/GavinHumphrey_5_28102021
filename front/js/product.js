fetch('http://localhost:3000/api/products')/*Envoyer une requête pour récupérer les données au format json*/
.then(response => response.json())
.then(data => console.log(data));

fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926')
.then(response => response.json())
.then(data => console.log(data));

POST('http://localhost:3000/api/products/order')
.then(response => response.json())
.then(data => console.log(data));
