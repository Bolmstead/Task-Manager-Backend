import { connect, connection, set } from "mongoose";

// Exit application on error
connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

set("debug", true);

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection

 */

export function connect() {
  connect(mongo.uri, {
    useCreateIndex: true,
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  return connection;
}
