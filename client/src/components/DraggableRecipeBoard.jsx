import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { Card, Button, message } from "antd";
import { useSelector } from "react-redux";
import API_BASE_URL from "../constant.js";
import styles from "../styles/draggableRecipeBoard.module.css"; // Using CSS Module correctly

const DraggableRecipeBoard = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?.data?.data?.user?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(`${API_BASE_URL}/api/v1/category`);
        const recipeRes = await axios.get(
          `${API_BASE_URL}/api/v1/recipe/userRecipes/${userId}`
        );

        setCategories(categoryRes.data.data);
        setRecipes(recipeRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userId) fetchData();
  }, [userId]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Copy recipes to avoid direct mutation
    const updatedRecipes = [...recipes];

    // Find the dragged recipe
    const draggedRecipeIndex = updatedRecipes.findIndex(
      (r) => r._id === draggableId
    );
    const draggedRecipe = { ...updatedRecipes[draggedRecipeIndex] }; // Create a new object

    if (!draggedRecipe) return;

    // Remove the dragged recipe from the source category
    updatedRecipes.splice(draggedRecipeIndex, 1);

    // Update category and order for the dragged recipe
    draggedRecipe.category = destination.droppableId;
    draggedRecipe.order = destination.index;

    // Insert at the new position
    updatedRecipes.splice(destination.index, 0, draggedRecipe);

    // Ensure the order remains correct within each category
    const reorderedRecipes = updatedRecipes.map((recipe, index) => ({
      ...recipe,
      order: index, // Reassign order to maintain correct indexing
    }));

    setRecipes(reorderedRecipes);
  };

  const handleSave = async () => {
    try {
      for (const recipe of recipes) {
        await axios.put(`${API_BASE_URL}/api/v1/recipe/update/${recipe._id}`, {
          category: recipe.category,
          order: recipe.order,
        });
      }
      message.success("Changes saved successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to save changes");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.recipeBoard}>
        {categories.map((category) => (
          <Droppable
            key={category._id}
            droppableId={String(category._id)}
            type="recipe"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.categoryColumn}
              >
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                <div className={styles.recipeList}>
                  {recipes
                    .filter((recipe) => recipe.category === category._id)
                    .sort((a, b) => a.order - b.order) // Maintain order after updates
                    .map((recipe, index) => (
                      <Draggable
                        key={recipe._id}
                        draggableId={recipe._id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.recipeCard}
                          >
                            <div className={styles.recipeContent}>
                              <img
                                alt={recipe.name}
                                src={recipe.recipeImg}
                                className={styles.recipeImageSmall}
                              />
                              <p className={styles.recipeName}>{recipe.name}</p>
                            </div>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
      <Button type="primary" onClick={handleSave} className={styles.saveButton}>
        Save Changes
      </Button>
    </DragDropContext>
  );
};

export default DraggableRecipeBoard;
