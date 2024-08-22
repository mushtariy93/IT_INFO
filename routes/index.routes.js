const express = require("express");


const indexRouter = express.Router();
dictionaryRouter = require("./dictionary.routes");
categoryRouter = require("./Category.routes");

indexRouter.use("/dict", dictionaryRouter);
indexRouter.use("/cat", categoryRouter);







module.exports = indexRouter;
