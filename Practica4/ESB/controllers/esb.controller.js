const restaurante = require('../config/config').restaurante;
const cliente = require('../config/config').cliente;
const repartidor = require('../config/config').repartidor;
const axios = require('axios');


exports.connectRestaurante = async (req, res) => {
    const { operation, data } = req.body;
    console.log({entidad: 'esb', operation, data});
    let pedido = data
    switch (operation) {
        case 'createOrder':
            await axios.post(`http://${restaurante.host}:${restaurante.port}/restaurante/crearPedido`, {pedido})
                .then(response => {
                    res.json(response.data);
                }
                ).catch(error => {
                    res.send(error);
                }
                );
            break;
        case 'getOrder':
            await axios.get(`http://${restaurante.host}:${restaurante.port}/restaurante/obtenerPedido/${data.id}`)
                .then(response => {
                    res.json(response.data);
                }
                ).catch(error => {
                    res.send(error);
                }
                );
            break;
        case 'markDelivered':
            await axios.put(`http://${restaurante.host}:${restaurante.port}/restaurante/marcarEntregado/${data.id}`)
                .then(response => {
                    res.json(response.data);
                }
                ).catch(error => {
                    res.send(error);
                }
                );
            break;
        default:
            res.json({ message: 'Operation not supported' });
            break;
    }
}


exports.connectCliente = async (req, res) => {
    const { operation, data } = req.body;
    console.log({entidad: 'esb', operation, data});
    switch (operation) {
        case 'markDelivered':
            await axios.put(`http://${cliente.host}:${cliente.port}/cliente/marcarEntregado/${data.id}`)
                .then(response => {
                    res.json(response.data);
                }
                ).catch(error => {
                    res.send(error);
                }
                );
            break;
        default:
            res.json({ message: 'Operation not supported' });
            break;
    }
}

exports.connectRepartidor = async (req, res) => {
    const { operation, data } = req.body;
    console.log({entidad: 'esb', operation, data});
    let pedido = data
    switch (operation) {
        case 'getOrder':
            await axios.get(`http://${repartidor.host}:${repartidor.port}/repartidor/obtenerPedido/${data.id}`)
                .then(response => {
                    res.json(response.data);
                }
                ).catch(error => {
                    res.send(error);
                }
                );
            break;
        case 'receiveOrder':
            await axios.post(`http://${repartidor.host}:${repartidor.port}/repartidor/recibirPedido`, {pedido})
                .then(response => {
                    res.json(response.data);
                }
                ).catch(error => {
                    res.send(error);
                }
                );
            break;
        default:
            res.json({ message: 'Operation not supported' });
            break;
    }
}










