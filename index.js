const productos = document.querySelector('.productos');
const carto = document.querySelector('.carrito');
const fragmento = document.createDocumentFragment();


let carrito = {};

productos.addEventListener('click', e => {
    addcarrito(e);
});

const addcarrito = (e) => {
    if(e.target.classList.contains('btn')){
        setcarrito(e.target.parentElement.parentElement);
    };
    e.stopPropagation();
};

const setcarrito = (objeto) => {
    const producto = {
        id: objeto.querySelector('.producto-about button').dataset.id,
        nombre: objeto.querySelectorAll('.producto-about span')[0].textContent,
        img : objeto.querySelector('.producto-img img').src,
        precio: objeto.querySelectorAll('.producto-about span')[1].textContent,
        cantidad: 1
    };
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    };
    carrito[producto.id]= producto;
    pintarCard();
};

const pintarCard = () => {
    carto.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('carrito-producto');
        let añadido = `
                <div class="carrito-producto-img">
                    <img src="${producto.img}" alt="">
                </div>
                <div class="carrito-producto-about">
                    <span>${parseInt(producto.precio)*(producto.cantidad)}</span>
                    <div class="counter">
                        <div class="btncounter btnminus" data-id="${producto.id}"><img src="images/icon-minus.svg" alt="delete"></div>
                        <span class="count">${producto.cantidad}</span>
                        <div class="btncounter btnplus" data-id="${producto.id}"><img src="images/icon-plus.svg" alt=""></div>
                    </div>
                    <button class="eliminar" data-id="${producto.id}">ELIMINAR</button>
                </div>
        `
        div.innerHTML =añadido;
        fragmento.appendChild(div);
        carto.appendChild(fragmento);
    });
};


carto.addEventListener('click', (e) => {
    btnaction(e);
});

const btnaction = (e) => {
    if(e.target.classList.contains('btnminus')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1;
        carrito[e.target.dataset.id]= producto;  
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        };
        pintarCard();
    }else if(e.target.classList.contains('btnplus')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id]= producto;
        pintarCard();
    };
    e.stopPropagation();
};
/*Pasarle el data id a cada elemento que en un futuro vayas a seleccionar*/
carto.addEventListener('click', e => {
    eliminarCarrito(e);
});

const eliminarCarrito = (e) => {
    if(e.target.classList.contains('eliminar')){
        delete carrito[e.target.dataset.id];
        pintarCard();
    };
};