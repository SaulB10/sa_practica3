const express = require("express")
const router = express.Router()
const repartidorController = require("../controllers/repartidor.controller")

router.post("/recibirPedido", repartidorController.recibirPedido)
router.get("/obtenerPedido/:id", repartidorController.obtenerPedido)
router.put("/marcarEntregado/:id", repartidorController.marcarEntregado)

module.exports = router