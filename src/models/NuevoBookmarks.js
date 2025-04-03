const { Schema, model, models } = require("mongoose");

const NuevoBookmarksSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const NuevoBookmarks =
  models.NuevoBookmarks || model("NuevoBookmarks", NuevoBookmarksSchema);

export default NuevoBookmarks;
