const body = document.querySelector("body");
const btnAgregar = document.getElementById("boton-incluir");
const btnActualizar = document.getElementById("boton-actualizar");

body.onload = async () => {
  btnAgregar.addEventListener("click", agregarProducto);
  const productos = await llamarProductos();
  llenarTabla(productos);
};

async function formActualizar(i){
    const product = await productoIndice(i)
    document.getElementById("newMarca").value = product.marca;
    document.getElementById("newProducto").value = product.producto;
    document.getElementById("newPrecio").value = product.precio;
    document.getElementById("newExistencia").value = product.existencia;
    document.getElementById("newStatus").value = product.status;
    //btnAgregar.innerText = "Actualizar producto"
    btnActualizar.style.display="inline-block"
    btnAgregar.style.display = "none"
    btnActualizar.addEventListener('click',  (e)=>  actualizacionProducto(e, i))
}

function llenarTabla(lista) {
  const contenidoTabla = document.getElementById("contenido-tabla");
  lista.forEach((elem, i) => {
    const eliminar = document.createElement("i");
    eliminar.setAttribute("class", "fa fa-remove");
    eliminar.style.color = "rgb(150, 6, 6)";
    const editar = document.createElement("i");
    editar.setAttribute("class", "fa fa-pencil");

    eliminar.addEventListener('click',async () => {
      let res = await borrarProducto(i);
      if (res.statusCode == 200){
        limpiarTabla();
        llenarTabla(await llamarProductos());
      }
      alert(res.message)
    })

    editar.addEventListener('click',() => {formActualizar(i)})

    const trRenglon = document.createElement("tr");
    const tdMarca = document.createElement("td");
    const tdProducto = document.createElement("td");
    const tdPrecio = document.createElement("td");
    const tdExistencia = document.createElement("td");
    const tdStatus = document.createElement("td");
    const tdEditar = document.createElement("td");
    const tdEliminar = document.createElement("td");

    tdMarca.textContent = elem.marca;
    tdProducto.textContent = elem.producto;
    tdPrecio.textContent = elem.precio;
    tdExistencia.textContent = elem.existencia;
    tdStatus.textContent = elem.status;

    tdEditar.appendChild(editar);
    tdEliminar.appendChild(eliminar);

    trRenglon.appendChild(tdMarca);
    trRenglon.appendChild(tdProducto);
    trRenglon.appendChild(tdPrecio);
    trRenglon.appendChild(tdExistencia);
    trRenglon.appendChild(tdStatus);
    trRenglon.appendChild(tdEditar);
    trRenglon.appendChild(tdEliminar);

    contenidoTabla.appendChild(trRenglon);
  });
  //
}

function limpiarTabla() {
  const contenidoTabla = document.getElementById("contenido-tabla");
  contenidoTabla.innerHTML = "";
}

async function agregarProducto(e) {
  e.preventDefault();
  const marca = document.getElementById("newMarca").value;
  const producto = document.getElementById("newProducto").value;
  const precio = document.getElementById("newPrecio").value;
  const existencia = document.getElementById("newExistencia").value;
  const status = document.getElementById("newStatus").value;
  let res = await crearProducto(marca, producto, precio, existencia, status);
  if (res.statusCode === 201){
    limpiarTabla();
    llenarTabla( await llamarProductos());
    document.getElementById("formu").reset();
  }
  alert(res.message)
}

async function actualizacionProducto(e,i) {
    e.preventDefault();
    const marca = document.getElementById("newMarca").value;
    const producto = document.getElementById("newProducto").value;
    const precio = document.getElementById("newPrecio").value;
    const existencia = document.getElementById("newExistencia").value;
    const status = document.getElementById("newStatus").value;
    let res = await actualizarProducto(i, marca, producto, precio, existencia, status);
    if (res.statusCode === 200){
      limpiarTabla();
      llenarTabla(await llamarProductos());
      btnActualizar.style.display="none"
      btnAgregar.style.display = "inline-block"
    //btnAgregar.innerText = "Agregar Producto"
    //btnAgregar.addEventListener('click', agregarProducto)
      document.getElementById("formu").reset();
    }
    alert(res.message)
}