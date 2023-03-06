//Variables Globales
let resultJson;
let resultXml;
let htmlTotal = "";
let sitio = document.getElementById('inyectar')

let loadProducts = () => {
  let URLxml = 'https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml'

  let requestXml = async ( myURL ) => {

    try {

      let response = await fetch( myURL ); 
      let result = await response.text() /* Convierte el response a texto */
      let xml = (new DOMParser()).parseFromString(result, 'application/xml');

      /* Éxito: Procese el xml */
      resultXml = xml;

      let productos = xml.getElementsByTagName("product");
      
      for (element of productos){
        let name =element.getElementsByTagName("name")[0].innerHTML;
        let price =element.getElementsByTagName("price")[0].innerHTML;
        let src =element.getElementsByTagName("src")[0].innerHTML;
        let type =element.getElementsByTagName("type")[0].innerHTML;
        let html = `
        <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
          <div class="card card-blog card-plain">
            <div class="card-header p-0 mt-n4 mx-3">
              <a class="d-block shadow-xl border-radius-xl">
                <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
              </a>
            </div>
            <div class="card-body p-3">
              <p class="mb-0 text-sm">${type}</p>
              <a href="javascript:;">
                <h5>
                  ${name}
                </h5>
              </a>
              <p class="mb-4 text-sm">
                <b>Price: </b> $ ${price}
              </p>
            </div>
          </div>
        </div>\n`

        htmlTotal = htmlTotal + html;
        sitio.innerHTML = htmlTotal;
  
      }

      
    } catch (error) {
      
      /* Fallo: Procese el error */
      
      console.log( error );
      
    }
    
  }
  requestXml( URLxml );
  
  
  
  let URLjson = `https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json`

  let requestJson = async ( myURL ) => {

    try {

      let response = await fetch( myURL ); 
      let result = await response.json() /* Convierte el response a JSON */

      /* Éxito: Procese el result */
      resultJson = result;

      for(let element of result){
        let nameJson = element.name;
        let priceJson = element.price;
        let srcJson = element.src;
        let typeJson = element.type;

        let html = `
        <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
          <div class="card card-blog card-plain">
            <div class="card-header p-0 mt-n4 mx-3">
              <a class="d-block shadow-xl border-radius-xl">
                <img src="${srcJson}" alt="${nameJson}" class="img-fluid shadow border-radius-xl">
              </a>
            </div>
            <div class="card-body p-3">
              <p class="mb-0 text-sm">${typeJson}</p>
              <a href="javascript:;">
                <h5>
                  ${nameJson}
                </h5>
              </a>
              <p class="mb-4 text-sm">
                <b>Price: </b> $ ${priceJson}
              </p>
            </div>
          </div>
        </div>\n`
        htmlTotal = htmlTotal + html;
        sitio.innerHTML = htmlTotal;
        
      }

    } catch (error) {

      /* Fallo: Procese el error */
      
      console.log( error );

    }

  }

  requestJson( URLjson );
}


let productsFiltered = () => {
  let htmlFiltered = '';
  let textMayus = document.getElementById('text').value;
  let texto = textMayus.toLowerCase();

  for(element of resultJson){
    if(element.name.includes(texto) || element.type.includes(texto)){
      let nameJson = element.name;
      let priceJson = element.price;
      let srcJson = element.src;
      let typeJson = element.type;

      let html = `
      <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
        <div class="card card-blog card-plain">
          <div class="card-header p-0 mt-n4 mx-3">
            <a class="d-block shadow-xl border-radius-xl">
              <img src="${srcJson}" alt="${nameJson}" class="img-fluid shadow border-radius-xl">
            </a>
          </div>
          <div class="card-body p-3">
            <p class="mb-0 text-sm">${typeJson}</p>
            <a href="javascript:;">
              <h5>
                ${nameJson}
              </h5>
            </a>
            <p class="mb-4 text-sm">
              <b>Price: </b> $ ${priceJson}
            </p>
          </div>
        </div>
      </div>\n`
      htmlFiltered = htmlFiltered + html;
      sitio.innerHTML = htmlFiltered;
    }
  }

  let productosXml = resultXml.getElementsByTagName("product");

  for(element of productosXml){
    let name = element.getElementsByTagName("name")[0].innerHTML;
    let type = element.getElementsByTagName("type")[0].innerHTML;

    if(name.includes(texto) || type.includes(texto)){
      let price =element.getElementsByTagName("price")[0].innerHTML;
      let src =element.getElementsByTagName("src")[0].innerHTML;
      let html = `
      <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
        <div class="card card-blog card-plain">
          <div class="card-header p-0 mt-n4 mx-3">
            <a class="d-block shadow-xl border-radius-xl">
              <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
            </a>
          </div>
          <div class="card-body p-3">
            <p class="mb-0 text-sm">${type}</p>
            <a href="javascript:;">
              <h5>
                ${name}
              </h5>
            </a>
            <p class="mb-4 text-sm">
              <b>Price: </b> $ ${price}
            </p>
          </div>
        </div>
      </div>\n`

      htmlFiltered = htmlFiltered + html;
      sitio.innerHTML = htmlFiltered;
    }
  }

  if (htmlFiltered == ''){
      let htmlNoExiste = `<h5 class="text-center p-3 pt-0 text-muted">El producto "${textMayus}" no se encuentra</h5>`;
      sitio.innerHTML = htmlNoExiste;   
  }
}
  

//Asignacion de Eventos

document.addEventListener("DOMContentLoaded", e => {
  loadProducts();

  let button = document.getElementById('filter')
  let input = document.getElementById('text')

  button.addEventListener('click', e => productsFiltered()) //no le tengo que dejar () sin funsion flecha
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' ){
      //e.preventDefault(); no es necesario
      //button.click(); //Le asignamos a button un click
      productsFiltered(e);//Le damos la accion y el evento
    }
  })
})



