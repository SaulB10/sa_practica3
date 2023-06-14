const express = require("express")
const router = express.Router()
const restauranteController = require("../controllers/restaurante.controller")

router.post("/crearPedido", restauranteController.crearPedido)
router.get("/obtenerPedido/:id", restauranteController.obtenerPedido)
router.put("/enviarPedido/:id", restauranteController.enviarPedido)
router.put("/marcarEntregado/:id", restauranteController.marcarEntregado)

module.exports = router
