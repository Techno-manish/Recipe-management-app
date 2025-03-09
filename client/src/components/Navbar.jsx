import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Popover, Button, Modal, Spin, Card, message } from "antd";
import { useCookies } from "react-cookie";
import {
  MenuFoldOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";

import logo from "../assets/logo.svg";
import "../styles/navbar.css";

import { useSelector } from "react-redux";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth/login");
  };

  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser.data.data.user.username;
  const userEmail = currentUser.data.data.user.email;

  const content = (
    <div>
      <p>Email: {userEmail}</p>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );

  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const fetchRandomRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/recipe/random"
      );
      const data = await response.json();

      if (response.ok) {
        setRecipe(data.data); // Assuming API returns { data: { recipe details } }
        setIsModalOpen(true);
      } else {
        message.error(data.message || "Failed to fetch recipe");
      }
    } catch (error) {
      message.error("Error fetching recipe. Please try again!");
    }
    setLoading(false);
  };

  return (
    <>
      <nav>
        <div
          className={`navbarContainer container ${showMenu ? "showMenu" : ""}`}
        >
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="hamburgerIcon" onClick={toggleMenu}>
            {showMenu ? (
              <CloseOutlined className="closeIcon" />
            ) : (
              <MenuFoldOutlined className="menuIcon" />
            )}
          </div>
          <div className={`menuItems ${showMenu ? "show" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/create-recipe">Create Recipes</Link>
            <Link to="/saved-recipes">Saved Recipes</Link>
            <Link to="/my-recipes">My Recipes</Link>
          </div>

          {/* Surprise Me Button - Placed Before User Profile */}
          <Button
            type="primary"
            onClick={fetchRandomRecipe}
            loading={loading}
            style={{ marginRight: "10px" }}
          >
            Surprise Me! 🎉
          </Button>

          <div className="userProfile">
            <Popover content={content} title={userName}>
              <span>
                <UserOutlined /> {userName}
              </span>
            </Popover>
          </div>
        </div>
      </nav>

      {/* Recipe Modal with Image */}
      <Modal
        title="Random Recipe"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {loading ? (
          <Spin />
        ) : recipe ? (
          <Card
            title={recipe.name}
            style={{
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            {/* Recipe Image (Smaller Size) */}
            {recipe.recipeImg && (
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <img
                  src={recipe.recipeImg}
                  alt={recipe.name}
                  style={{
                    width: "200px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}

            <p>
              <strong>Category:</strong>{" "}
              {recipe.category?.name || "Uncategorized"}
            </p>
            <p>
              <strong>Ingredients:</strong>{" "}
              {recipe.ingredients?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Instructions:</strong>{" "}
              {recipe.instructions || "No instructions available."}
            </p>
          </Card>
        ) : (
          <p>No recipe found.</p>
        )}
      </Modal>
    </>
  );
};

export default Navbar;
