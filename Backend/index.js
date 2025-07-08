import app from "./app.js";
import config from "./src/config.js";
import "./database.js";

async function main() {
    const PORT = config.SERVER.PORT;
    app.listen(PORT);
    console.log(`Server is on fire`);
}

main().catch((error) => {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
});
