const app = require("express")();
const http = require("http").createServer(app);
const debug = require("debug")("app");
const io = require("socket.io")(http)
const compression = require("compression");
const helmet = require("helmet");

app.use(compression());
app.use(helmet());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

io.on("connection", (socket) => {
    debug("a user connected");
    socket.on("disconnect", () => {
        debug("user disconnected");
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

const port = process.env.PORT || 3000

http.listen(port, ()=> {
    debug("Listening on " + port);
});