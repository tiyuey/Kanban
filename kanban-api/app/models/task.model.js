const User = require("./user.model")(mongoose);
const Task = require("./task.model")(mongoose);

// Task modelini güncelleyin
module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      title: String,
      type: String, // next up, in progress, done
      due: Date, // when it's due
      brand: String, // Hexaworks, Babil, Babil Kitap, for example
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // user reference
      description: String,
      points: Number, // story points
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Task = mongoose.model("task", schema);
  return Task;
};
