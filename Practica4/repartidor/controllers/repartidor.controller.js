const pedidos = require('../config/config').pedidos;
const axios = require('axios');

exports.recibirPedido = async (req, res) => {
    const { pedido } = req.body;
    console.log(pedido)
    const repartidor = {
        id: 1,
        nombre: "Juan"
    };

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
        await axios.post(`http://localhost:3004/esb/restaurante`, { operation: 'markDelivered', data: { id: pedido.id } });
        res.json({entidad:"repartidor", message: "El repartidor "+pedido.repartidor.nombre+" ha entregado el pedido "+pedido.id});
    } else {
        console.log({entidad:"repartidor",message:"Pedido no encontrado"});
        res.json({entidad:"repartidor", message: "Pedido no encontrado" });
    }
}

