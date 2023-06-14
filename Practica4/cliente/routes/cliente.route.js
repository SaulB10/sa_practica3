const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/cliente.controller")

router.post("/crearPedido", clienteController.crearPedido)
router.get("/obtenerPedidoRestaurante/:id", clienteController.obtenerPedidoRestaurante)
router.get("/obtenerPedidoRepartidor/:id", clienteController.obtenerPedidoRepartidor)
router.put("/marcarEntregado/:id", clienteController.marcarEntregado)

module.exports = router