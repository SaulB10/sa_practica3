const repartidores = require('../config/config').repartidores;
const pedidos = require('../config/config').pedidos;
const axios = require('axios');

exports.recibirPedido = async (req, res) => {
    const  id  = Math.floor(Math.random() * repartidores.length);
    const { pedido } = req.body;
    const repartidor = repartidores.find(r => r.id === parseInt(id));

    if (repartidor) {
        console.log({entidad:"repartidor",message:"El pedido "+pedido.id+" ha sido asignado a: " + repartidor.nombre});
        pedido.status = "En camino";
        pedido.repartidor = repartidor;
        pedidos.push(pedido);
        res.json({entidad:"repartidor", message: "El pedido "+pedido.id+" ha sido asignado a: " + repartidor.nombre});
    } else {
        console.log({entidad:"repartidor",message:"Repartidor no encontrado"});
        res.json({entidad:"repartidor", message: "Repartidor no encontrado" });
    }
}

exports.obtenerPedido = async (req, res) => {
    const { id } = req.params;
    const pedido = pedidos.find(p => p.id === parseInt(id));

    if (pedido) {
        console.log({entidad:"repartidor",message:"Su pedido "+pedido.id+" esta: " + pedido.status});
        res.json({entidad:"repartidor",message: "Su pedido "+pedido.id+" esta: " + pedido.status});
    } else {
        console.log({entidad:"repartidor",message:"Pedido no encontrado"});
        res.json({entidad:"repartidor", message: "Pedido no encontrado" });
    }
}

exports.marcarEntregado = async (req, res) => {
    const { id } = req.params;
    const pedido = pedidos.find(p => p.id === parseInt(id));

    if (pedido) {
        pedido.status = "Entregado";
        console.log({entidad:"repartidor",message:"El repartidor "+pedido.repartidor.nombre+" ha entregado el pedido "+pedido.id});
        await axios.put(`http://localhost:3001/restaurante/marcarEntregado/${pedido.id}`);
        res.json({entidad:"repartidor", message: "El repartidor "+pedido.repartidor.nombre+" ha entregado el pedido "+pedido.id});
    } else {
        console.log({entidad:"repartidor",message:"Pedido no encontrado"});
        res.json({entidad:"repartidor", message: "Pedido no encontrado" });
    }
}

