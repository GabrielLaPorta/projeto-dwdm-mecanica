const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const router = express.Router();

const productService = require(path.join(__dirname, "../../api/service", "/products"));
const userService = require(path.join(__dirname, "../../api/service", "/user"));

router.get("/", async (req, res, next) => {
    try {
        const results = await productService.getAll();
        
        res.status(200).send({
            message: "",
            body: {
                data: results.rows
            }
        });
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor",
            body: {
                error: error
            },
        });
    }
        
});

router.get("/:id", async (req, res, next) => {
    try {
        const isAthenticate = await userService.checkAuthentication(req.session.id, req.cookies.user_sid);
        if(!isAthenticate) {
            return res.status(403).send({
                message: "Acesso não autorizado",
                body: {},
            });
        }

        const results = await productService.getById(req.params.id);
    
        res.status(200).send({
            message: "",
            body:{
                data: results.rows
            }
        });
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor",
            body: {
                error: error
            },
        });
    }
});

router.post("/",jsonParser, async (req, res, next) => {
    try {
        const isAthenticate = await userService.checkAuthentication(req.session.id, req.cookies.user_sid);
        if(!isAthenticate) {
            return res.status(403).send({
                message: "Acesso não autorizado",
                body: {},
            });
        }

        if (!req.body) {
            return res.status(400).send({
                message: "Problema ao cadastrar produto",
                body: {},
            });
        }

        const result = await productService.save(req.body);

        if (result.rowCount === 1) {
            res.status(201).send({
                message: "Produto cadastrado com sucesso!",
                body: {
                    data: {}
                },
            });
        } else {
            res.status(400).send({
                message: "Problema ao cadastrar produto",
                body: {},
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor",
            body: {
                error: error
            },
        });
    }
    
});

router.put("/", jsonParser, async (req, res, next) => {
    try {
        const isAthenticate = await userService.checkAuthentication(req.session.id, req.cookies.user_sid);
        if(!isAthenticate) {
            return res.status(403).send({
                message: "Acesso não autorizado",
                body: {},
            });
        }

        const product = await productService.getById(req.body.id);

        if (product.rowCount === 0) {
            return res.status(400).send({
                message: "Produto não encontrado",
                body: {},
            });
        } else {
            const result = await productService.update(req.body);

            if (result.rowCount === 1) {
                res.status(201).send({
                    message: "Produto atualizado com sucesso!",
                    body: {
                        data: {}
                    },
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor",
            body: {
                error: error
            },
        });
    }
    
});

router.delete("/", jsonParser, async (req, res, next) => {
    try {
        const isAthenticate = await userService.checkAuthentication(req.session.id, req.cookies.user_sid);
        if(!isAthenticate) {
            return res.status(403).send({
                message: "Acesso não autorizado",
                body: {},
            });
        }

        const product = await productService.getById(req.query.id);

        if (product.rowCount === 0) {
            return res.status(400).send({
                message: "Produto não encontrado",
                body: {},
            });
        } else { 
            const result = await productService.delete(req.query.id);

            if (result.rowCount === 1) {
                res.status(200).send({
                    message: "Produto deletado com sucesso!",
                    body: {},
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor",
            body: {
                error: error
            },
        });
    }
    
});

module.exports = router;