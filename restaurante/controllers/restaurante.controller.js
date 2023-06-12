const pedidos = require('../config/config').pedidos;
const axios = require('axios');

exports.crearPedido = async (req, res) => {
    const { pedido } = req.body;
    pedido.status = "En preparacion";
    pedidos.push(pedido);
    console.log({entidad:"restaurante",message:"Pedido Tomado ID: "+pedido.id});
    res.json({ entidad:"restaurante",message: "Pedido Tomado" });
}

exports.obtenerPedido = async (req, res) => {
    const { id } = req.params;
    const pedido = pedidos.find(p => p.id === parseInt(id));

    if (pedido) {
        console.log({entidad:"restaurante",message:"Su pedido "+pedido.id+" esta: " + pedido.status});
        res.json({entidad:"restaurante",message: "Su pedido "+pedido.id+" esta: " + pedido.status});
    } else {
        console.log({entidad:"restaurante",message:"Pedido no encontrado"});
        res.json({entidad:"restaurante", message: "Pedido no encontrado" });
    }
}


exports.enviarPedido = async (req, res) => {
    const { id } = req.params;
    const pedido = pedidos.find(p => p.id === parseInt(id));

    if (pedido) {
        pedido.status = "En camino";
        console.log({entidad:"restaurante",message:"Pedido "+pedido.id+" enviado"});
        await axios.post('http://localhost:3000/repartidor/recibirPedido', { pedido });
        res.json({entidad:"restaurante", message: "Pedido enviado" });
    } else {
        console.log({entidad:"restaurante",message:"Pedido no encontrado"});
        res.json({ entidad:"restaurante",message: "Pedido no encontrado" });
    }
}


exports.marcarEntregado = async (req, res) => {
    const { id } = req.params;
    const pedido = pedidos.find(p => p.id === parseInt(id));

    if (pedido) {
        pedido.status = "Entregado";
        console.log({entidad:"restaurante",message:"El pedido "+pedido.id+" ha sido entregado"});
        await axios.put(`http://localhost:3002/cliente/marcarEntregado/${pedido.id}`);
        res.json({entidad:"restaurante", message: "El pedido "+pedido.id+" ha sido entregado" });
    } else {
        console.log({entidad:"restaurante",message:"Pedido no encontrado"});
        res.json({entidad:"restaurante", message: "Pedido no encontrado" });
    }
}
