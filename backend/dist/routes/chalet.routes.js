"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chalets_controller_1 = require("../controllers/chalets.controller");
const router = (0, express_1.Router)();
// Rota GET /chalets/:id
router.get("/:id", chalets_controller_1.getChaletById);
exports.default = router;
