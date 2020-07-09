const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const keys = require("./api/keys.js");
const path = require("path");
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: "user_sid",
    secret: keys.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 31557600
    }
}));
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie("user_sid");
    }

    next();
});

app.get("/app/*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/admin/*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/app/admin/index.html"));
});

app.get("/", (req, res, next) => {
    res.sendFile(`/index.html`, { root: __dirname });
});

const categories = require(path.join(__dirname + "/api/route/categories"));
const products = require(path.join(__dirname + "/api/route/products"));
const user = require(path.join(__dirname + "/api/route/user"));

// api routes
app.use("/api/v1/categories", categories);
app.use("/api/v1/products", products);
app.use("/api/v1/users", user);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));