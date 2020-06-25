if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => {
            console.log("Service Worker registrado com sucesso!");
        })
        .catch((error) => {
            console.log(`Falha ao registrar o Service Worker erro: ${error}`);
        })
}