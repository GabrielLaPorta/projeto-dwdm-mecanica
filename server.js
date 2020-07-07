const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.get("/*", (req,res) => {
    res.sendFile(`/index.html`, { root: __dirname });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));