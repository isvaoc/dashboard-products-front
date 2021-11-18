async function llamarProductos() {
  const res = await customFetch({
    path:'/products',
    method:'GET'
  })
  return res.data;
}

async function productoIndice(i) {
  const res = await customFetch({
    path:'/products',
    method:'GET'
  })
  console.log(res.data[i])
  return res.data[i];
}

async function borrarProducto(i) {
  const res = await customFetch({
    path:'/products/'+i,
    method:'DELETE'
  })
  return res
}

async function actualizarProducto(i, marca, producto, precio, existencia, status) {
  const res = await customFetch({
    path:'/products/'+i,
    method:'PATCH',
    body: {
      marca, 
      producto, 
      precio, 
      existencia, 
      status
    }
  })
  return res; 
}

async function crearProducto(marca, producto, precio, existencia, status) {
  const res = await customFetch({
    path:'/products',
    method:'POST',
    body: {
      marca, 
      producto, 
      precio, 
      existencia, 
      status
    }
  })
  return res;
}
