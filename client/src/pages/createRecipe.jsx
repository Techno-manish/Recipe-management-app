import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Input, Form, Button, Tag, message, Select, Spin } from "antd";
import createRecipeImg from "../assets/createRecipe.png";
import "../styles/createRecipe.css";
import UploadWidget from "../components/UploadWidget.jsx";

import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx";
import API_BASE_URL from "../constant.js";

const { Option } = Select;

const CreateRecipe = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.data.data.user._id;

  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Stores fetched categories
  const [lastOrder, setLastOrder] = useState(0); // Stores last order value

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    recipeImg: "",
    cookingTime: 0,
    category: "", // Default empty category
    order: 0, // Will be updated dynamically
    userOwner: userId,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const categoryResp = await axios.get(
          `${API_BASE_URL}/api/v1/category/`
        );
        const recipeResp = await axios.get(`${API_BASE_URL}/api/v1/recipe/`);

        console.log("Category Response:", categoryResp.data);
        console.log("Recipe Response:", recipeResp.data);

        // Extract categories safely
        setCategories(categoryResp.data?.data || []);

        // Extract recipes and determine next order
        const recipesArray = recipeResp.data?.data || [];
        const maxOrder = recipesArray.length
          ? Math.max(...recipesArray.map((r) => r.order || 0))
          : 0;

        setLastOrder(maxOrder);
        setRecipe((prev) => ({ ...prev, order: maxOrder + 1 }));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories or order data", error);
        setCategories([]); // Ensure categories is always an array
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleIngredientChange = (value, index) => {
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    handleChange("ingredients", ingredients);
  };

  const handleAddIngredient = () => {
    handleChange("ingredients", [...recipe.ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    handleChange("ingredients", ingredients);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const requiredFields = ["name", "instructions", "recipeImg"];
      if (requiredFields.some((field) => !recipe[field])) {
        console.error("Required fields are missing");
        message.error("Please fill in all required fields.");
        setIsLoading(false);
        return;
      }
      console.log("Submitting Recipe Data:", recipe);
      const resp = await axios.post(
        `${API_BASE_URL}/api/v1/recipe/create`,
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      console.log("Response:", resp);
      setIsLoading(false);
      message.success("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Failed to create recipe");
      setIsLoading(false);
    }
  };

  const handleImageUpload = (imageUrl) => {
    handleChange("recipeImg", imageUrl);
  };

  return (
    <>
      <Navbar />
      <div className="createRecipeContainer container">
        <p className="sectionHeading">Create Recipe</p>
        <div className="createRecipe">
          <img src={createRecipeImg} alt="" />
          <Form onFinish={handleSubmit} className="createRecipeForm">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input
                placeholder="Name"
                value={recipe.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea
                placeholder="Description"
                value={recipe.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Item>

            <Form.Item name="ingredients">
              <div>
                {recipe.ingredients.map((ingredient, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveIngredient(index)}
                  >
                    <Input
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(e.target.value, index)
                      }
                    />
                  </Tag>
                ))}
                <Button
                  type="dashed"
                  onClick={handleAddIngredient}
                  style={{ marginTop: 8 }}
                >
                  Add Ingredient
                </Button>
              </div>
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select
                placeholder="Select a category (optional)"
                allowClear
                value={recipe.category}
                onChange={(value) => handleChange("category", value)}
                loading={isLoading}
              >
                {categories.map((cat) => (
                  <Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="instructions"
              rules={[
                { required: true, message: "Please input the instructions!" },
              ]}
            >
              <Input.TextArea
                placeholder="Instructions"
                value={recipe.instructions}
                onChange={(e) => handleChange("instructions", e.target.value)}
              />
            </Form.Item>

            <Form.Item name="recipeImg">
              <Input
                placeholder="Image URL"
                disabled
                value={recipe.recipeImg}
                onChange={(e) => handleChange("recipeImg", e.target.value)}
              />
              <UploadWidget onImageUpload={handleImageUpload} />
            </Form.Item>

            <Form.Item
              name="cookingTime"
              rules={[
                { required: true, message: "Please input the cooking time!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Cooking Time (minutes)"
                value={recipe.cookingTime}
                onChange={(e) => handleChange("cookingTime", e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              {isLoading ? (
                <Button type="primary" htmlType="submit">
                  <Spin />
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  Create Recipe
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;
