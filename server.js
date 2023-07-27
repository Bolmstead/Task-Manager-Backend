"use strict";

import { connect } from "mongoose";
import app from "./app.js";

connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 8000, function () {
    console.log(`Started`);
  });
});
