const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const rootStaticFiles = ["/favicon.ico"];

    // if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
    //     const path = join(__dirname, "static", parsedUrl.pathname);
    //     app.serveStatic(req, res, path);
    // }

    server.get("/edit/:address", (req, res) => {
        return app.render(req, res, "/index", {
            address: req.params.address,
            editMode: true,
        });
    });

    server.get("*", (req, res) => {
        return handle(req, res, "/index");
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
    });
});
