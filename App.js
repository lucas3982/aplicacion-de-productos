
/* estas son dos clases, una que es la clase como van a luciar en la aplicacion, y otra que va a estar interactuando con el html*/

class Product {
    constructor (name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }

}

/*esta interfase de usuario es la que interatua con el html*/

class UI {
    addProduct(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
                <div class="card text-center mb-4">
                    <div class="card-body">
                        <strong>Producto</strong>: ${product.name} -
                        <strong>Precio</strong>: ${product.price} - 
                        <strong>Año</strong>: ${product.year}
                        <a href="#" class="btn btn-danger" name="delete">Borrar</a>
                    </div>
                </div>
            `;
        productList.appendChild(element);
      }
    
      resetForm() {
        document.getElementById("product-form").reset();
      }
    
      deleteProduct(element) {
        if (element.name === "delete") {
          element.parentElement.parentElement.remove();
          this.showMessage("Product Deleted Succsssfully", "success");
        }
      }
    
      showMessage(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
    
        // Show in The DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");
    
        // Insert Message in the UI
        container.insertBefore(div, app);
    
        // Remove the Message after 3 seconds
        setTimeout(function () {
          document.querySelector(".alert").remove();
        }, 3000);
      }
    }

/*aca se empieza a interactuar con eventos de la aplicacion, eventos del DOM, son los eventos cuando un usuario da un click en boton, o tipeando etc*/

document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    // Override the default Form behaviour
    e.preventDefault();

    // Getting Form Values
    const name = document.getElementById("name").value,
      price = document.getElementById("price").value,
      year = document.getElementById("year").value;

    // Create a new Oject Product
    const product = new Product(name, price, year);

    // Create a new UI instance
    const ui = new UI();

    // Input User Validation
    if (name === "" || price === "" || year === "") {
      ui.showMessage("Please Insert data in all fields", "danger");
    }

    // Save Product
    ui.addProduct(product);
    ui.showMessage("Product Added Successfully", "primary");
    ui.resetForm();
  });

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
  e.preventDefault();
});