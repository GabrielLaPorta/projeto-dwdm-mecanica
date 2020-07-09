const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { Console } = require("console");

const jsonParser = bodyParser.json();
const router = express.Router();

const categoryService = require(path.join(__dirname, "../../api/service", "/categories"));
const userService = require(path.join(__dirname, "../../api/service", "/user"));

router.get("/", async (req, res, next) => {
    try {
        const isAthenticate = await userService.checkAuthentication(req.session.id, req.cookies.user_sid);
        if(!isAthenticate) {
            return res.status(403).send({
                message: "Acesso não autorizado",
                body: {},
            });
        }
        
        const results = await categoryService.getAll();

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

router.post("/",jsonParser, async (req, res, next) => {
    try {
        const isAthenticate = await userService.checkAuthentication(req.session.id, req.cookies.user_sid);
        if(!isAthenticate) {
            return res.status(403).send({
                message: "Acesso não autorizado",
                body: {},
            });
        }

        const category = await categoryService.save(req.body);

        if (category) {
            res.status(201).send({
                message: "Categoria cadastrada com sucesso!",
                body: {
                    data: category
                },
            });
        } else {
            res.status(400).send({
                message: "Problema ao cadastrar Categoria",
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

        const category = await categoryService.getById(req.body.id);

        if (category.rowCount !== 0) {
            await categoryService.update(req.body);

            res.status(200).send({
                message: "Categoria atualizada com sucesso!",
                body: {
                    data: category
                },
            });
        } else {
            res.status(400).send({
                message: "Categoria não encontrada",
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

router.delete("/", jsonParser, async (req, res, next) => {
    try {
        const isAthenticate = await userService.checkAuthentication(req.session.id, req.cookies.user_sid);
        if(!isAthenticate) {
            return res.status(403).send({
                message: "Acesso não autorizado",
                body: {},
            });
        }

        const category = await categoryService.getById(req.query.id);

        if (category.rowCount !== 0) {
            await categoryService.delete(req.query.id);
            res.status(200).send({
                message: "Categoria deletada com sucesso!",
                body: {
                    data: category
                },
            });
        } else {
            res.status(400).send({
                message: "Categoria não encontrada",
                body: {},
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro interno do servidor",
            body: {
                error: error
            },
        })
    }
    
});

module.exports = router;