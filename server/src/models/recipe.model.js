import mongoose, { Schema } from "mongoose";

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ingredients: [
      {
        type: String,
        required: true,
      },
    ],

    instructions: {
      type: String,
      required: true,
    },

    recipeImg: {
      type: String,
      required: true,
    },

    cookingTime: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: () => new mongoose.Types.ObjectId("67cd53edd5f5d1c3cf7a19fd"),
    },

    order: { type: Number, required: true, default: 0 },

    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", RecipeSchema);
