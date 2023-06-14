const pedidos = require('../config/config').pedidos;
const axios = require('axios');

exports.crearPedido = async (req, res) => {
    const  productos  = req.body;
    const pedido = armarPedido(productos);
    pedido.status = "Enviado a Restaurante";
    pedidos.push(pedido);
    console.log({entidad:"Cliente",message:"Pedido Enviado a Restaurante ID: "+pedido.id +" Total: "+pedido.total_pedido});
    await axios.post(`http://localhost:3004/esb/restaurante`, { operation: "createOrder", data: pedido });
    res.json({ entidad:"Cliente",message: "Pedido Enviado a Restaurante" });
}

armarPedido = (productos) => {
    let total = 0;
    productos.forEach(p => {
        const producto = productos.find(prod => prod.id === p.id);
        total += producto.precio * p.cantidad;
    });

    return {
        id: pedidos.length + 1,
        productos: productos,
        total_pedido: total,
        status: "",
        fecha: new Date(),
        repartidor: {
            id: 0,
            nombre: "",
        }
    };
}

exports.obtenerPedidoRestaurante = async (req, res) => {
    const { id } = req.params;
    const respuestaRestaurante = await axios.post(`http://localhost:3004/esb/restaurante`, { operation: "getOrder", data: { id } });
    console.log(respuestaRestaurante.data);
    res.json(respuestaRestaurante.data);
}

exports.obtenerPedidoRepartidor = async (req, res) => {
    const { id } = req.params;
    const respuestaRepartidor = await axios.post(`http://localhost:3004/esb/repartidor`, { operation: "getOrder", data: { id } });
    console.log(respuestaRepartidor.data);
    res.json(respuestaRepartidor.data);
}

exports.marcarEntregado = async (req, res) => {
    const { id } = req.params;
    const pedido = pedidos.find(p => p.id === parseInt(id));
    pedido.status = "Entregado";
    console.log({entidad:"cliente",message:"Pedido Entregado"});
    res.json({ entidad:"cliente",message: "Pedido Entregado" });
}

