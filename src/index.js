import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Example app listening on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.log(err));

// app external errors(port in use, db connection) no access to req,res obj
app.on("error", (err) => {
  console.error("❌ Server Error:", err);
});

// for promises -- Promise is rejected, but no .catch() is provided.
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Unhandled Rejection, shutting down ..............😢😢😢😢");
  console.log(err.name, err.message);
  process.exit(1);
});

// Handles application-level errors (e.g., invalid DB queries, missing required fields).
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});
