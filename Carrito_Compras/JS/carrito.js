const productos = [];

function calcularDescuentoPrecio(precio, cantidad, descuento) {
    const total = precio * cantidad;
    const cantidadDescuento = total * (descuento / 100);
    return total - cantidadDescuento;
}

function renderizarCarrito() {
    const carritoBody = document.getElementById('carritoBody');
    const ventaTotal = document.getElementById('totalVenta');

    carritoBody.innerHTML = '';
    let total = 0;

    productos.forEach((producto, index) => {
        const precioFinal = calcularDescuentoPrecio(
            producto.precio,
            producto.cantidad,
            producto.descuento
        );
        total += precioFinal;

        const row = `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.descuento}%</td>
                <td>$${precioFinal.toFixed(2)}</td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
                    <button class="btn-actualizar" onclick="mostrarFormularioActualizar(${index})">Actualizar</button>
                </td>
            </tr>
        `;
        carritoBody.innerHTML += row;
    });

    ventaTotal.textContent = `$${total.toFixed(2)}`;
}

function actualizarProducto(index, precio, cantidad, descuento) {
    if (productos[index]) {
        productos[index].precio = parseFloat(precio);
        productos[index].cantidad = parseInt(cantidad, 10);
        productos[index].descuento = parseFloat(descuento);
        console.log("Producto actualizado:", productos[index]);
        renderizarCarrito();
        console.log("Estado actual del arreglo de productos:", productos);
    }
}

function eliminarProducto(index) {
    if (index >= 0 && index < productos.length) {
        console.log("Producto eliminado:", productos[index]);
        productos.splice(index, 1);
        renderizarCarrito();
        console.log("Estado actual del arreglo de productos:", productos);
    }
}

function mostrarFormularioActualizar(index) {
    const producto = productos[index];
    if (!producto) return;

    const formActualizar = document.createElement('div');
    formActualizar.className = 'form-actualizar';
    formActualizar.innerHTML = `
        <label>Precio: <input type="number" id="precioActualizar" value="${producto.precio}" step="0.01" min="0" /></label>
        <label>Cantidad: <input type="number" id="cantidadActualizar" value="${producto.cantidad}" min="1" /></label>
        <label>Descuento (%): <input type="number" id="descuentoActualizar" value="${producto.descuento}" min="0" max="100" /></label>
        <button class="btn-guardar" onclick="guardarActualizacion(${index})">Guardar</button>
        <button class="btn-cancelar" onclick="cancelarActualizacion(this)">Cancelar</button>
    `;
    const fila = document.getElementById('carritoBody').children[index];
    if (fila) fila.appendChild(formActualizar);
}

function guardarActualizacion(index) {
    const precio = document.getElementById('precioActualizar').value;
    const cantidad = document.getElementById('cantidadActualizar').value;
    const descuento = document.getElementById('descuentoActualizar').value;
    actualizarProducto(index, precio, cantidad, descuento);
    cancelarActualizacion(document.querySelector('.form-actualizar'));
}

function cancelarActualizacion(formulario) {
    if (formulario) formulario.remove();
}

document.getElementById('añadirProducto').addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevoNombre = document.getElementById('nuevoNombre').value.trim();
    const nuevoPrecio = parseFloat(document.getElementById('nuevoPrecio').value);
    const nuevaCantidad = parseInt(document.getElementById('nuevaCantidad').value, 10);
    const nuevoDescuento = parseFloat(document.getElementById('nuevoDescuento').value);

    if (nuevoNombre && nuevoPrecio >= 0 && nuevaCantidad > 0 && nuevoDescuento >= 0 && nuevoDescuento <= 100) {
        const nuevoProducto = {
            nombre: nuevoNombre,
            precio: nuevoPrecio,
            cantidad: nuevaCantidad,
            descuento: nuevoDescuento,
        };
        productos.push(nuevoProducto);
        console.log("Producto agregado:", nuevoProducto);
        renderizarCarrito();
        console.log("Estado actual del arreglo de productos:", productos);
        e.target.reset();
    } else {
        alert('Por favor, ingresa valores válidos para todos los campos.');
    }
});

function ordenarPorNombre() {
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    renderizarCarrito();
    console.log("Productos ordenados por nombre:", productos);
}

function ordenarPorPrecio(descendente = false) {
    productos.sort((a, b) => (descendente ? b.precio - a.precio : a.precio - b.precio));
    renderizarCarrito();
    console.log("Productos ordenados por precio:", productos);
}

function ordenarPorCantidad(descendente = false) {
    productos.sort((a, b) => (descendente ? b.cantidad - a.cantidad : a.cantidad - b.cantidad));
    renderizarCarrito();
    console.log("Productos ordenados por cantidad:", productos);
}

function ordenarPorDescuento(descendente = false) {
    productos.sort((a, b) => (descendente ? b.descuento - a.descuento : a.descuento - b.descuento));
    renderizarCarrito();
    console.log("Productos ordenados por descuento:", productos);
}

function ordenarPorPrecioFinal(descendente = false) {
    productos.sort((a, b) => {
        const precioFinalA = calcularDescuentoPrecio(a.precio, a.cantidad, a.descuento);
        const precioFinalB = calcularDescuentoPrecio(b.precio, b.cantidad, b.descuento);
        return descendente ? precioFinalB - precioFinalA : precioFinalA - precioFinalB;
    });
    renderizarCarrito();
    console.log("Productos ordenados por precio final:", productos);
}

renderizarCarrito();