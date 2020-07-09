const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("../passport/passport")
const jsonParser = bodyParser.json();
const router = express.Router();

const userService = require(path.join(__dirname, "../../api/service", "/user"));

router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            const user = await userService.authenticate(req.user.id, req.user.emails[0].value);
    
            if (user) {
                await userService.createUserSession(req.session, req.session.passport.user);
                res.status(200).redirect(`/app/admin/index.html`);  
            } else {
                res.status(400).send({
                    message: "Usuário não cadastrado",
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
    }  
);

router.get("/", async (req, res, next) => {
    const user = await userService.authenticate(req.query.username, req.query.password);

    if (user) {
        await userService.createUserSession(req.session, user);
        
        res.status(200).send({
            message: "Usuário autenticado com sucesso!",
            body: {
                data: req.session.user
            } 
        });
    } else {
        res.status(400).send({
            message: "Usuário não cadastrado",
            body: {},
        });
    }

});

router.get("/:id", async (req, res, next) => {
    if (req.session.user) {
        res.send({
            message: "Usuário autenticado com sucesso!",
            body: {
                data: req.session.user
            } 
        });
    } else {
        res.send(null);
    }
});

router.post("/", jsonParser, async (req, res, next) => {
    if (await userService.userExist(req.body.email)) {
        const user = await userService.save(req.body);

        if (user) {
            await userService.createUserSession(req.session, user);
        }

        res.status(201).send({
            message: "Usuário cadastrado com sucesso!",
            body: {
                data: req.session.user
            },
        });
    }
    else {
        res.status(400).send({
            message: "Existe um usário cadastrado com esse email",
            body: {
                data: req.body.email
            },
        });
    }
});

router.delete("/", jsonParser, async (req, res, next) => {
    if (req.session) {
        await userService.logOut(req.session);

        res.clearCookie("user_sid", {
            path: "/"
        });
        res.status(200).send({
            message: "Sessão finalizada!",
            body: {}
        });
    } else {
        res.status(400).send({
            message: "Usuário não está autenticado",
            body: {}
        });
    }
});

module.exports = router;