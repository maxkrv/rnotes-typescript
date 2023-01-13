import express from "express";
import cors from "cors";
import { CLIENT_URL, PORT } from "./config";
import router from "./routes";
import log from "./utils/logger";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(router);
app.use(errorMiddleware);

(async () => {
	try {
		app.listen(PORT, () => {
			log.info(`Server running on port ${PORT}`);
		});
	} catch (error) {
		log.error(error);
	}
})();
