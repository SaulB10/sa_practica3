const express = require("express")
const router = express.Router()
const esbController = require("../controllers/esb.controller")

router.post("/restaurante", esbController.connectRestaurante)
router.post("/cliente", esbController.connectCliente)
router.post("/repartidor", esbController.connectRepartidor)

module.exports = router










