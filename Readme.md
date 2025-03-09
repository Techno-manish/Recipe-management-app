app.use("/api/v1/users/", userRoute);
//http://localhost:8000/api/v1/users/register
//http://localhost:8000/api/v1/users/login

app.use("/api/v1/recipe/", recipeRoute);
//GET http://localhost:8000/api/v1/recipe/ - Get all recipe

//POST http://localhost:8000/api/v1/recipe/create - Create new recipe - default category is null else id of categories available

{
"name": "Idli",
"description": "Idli is one of the most healthiest and popular South Indian breakfast dish.",
"ingredients": [
"With Idli Rice",
"With Idli Rava",
"Soaking rice and lentils",
"urad dal"
],
"instructions": "1. In a bowl or pan take 1 cup parboiled rice and 1 cup regular rice. Here I have used the Indian variety of sona masuri rice along with parboiled rice.\n2. Pick and then rinse both the rice varieties a couple of times in fresh water. Drain all the water and keep it aside.\n3. Take ¼ cup thick poha (flattened rice or parched rice) in a bowl. Poha helps in making the idli soft and fluffy. If you don’t have poha then you can skip it.\n4. Rinse the poha once or twice with fresh water.\n5. Then add the poha to the rice. Add 2 cups of water. Mix very well and keep aside covered to soak for 4 to 5 hours.\n6. In a wet grinder jar, add the urad dal. Initially add ¼ cup of the reserved water or fresh water.\n7. Use the reserved urad dal strained water or regular fresh water to grind the rice and poha too. Add water in parts and grind.\n8. Now pour the rice batter in the bowl containing the urad dal batter.",
"recipeImg": "https://res.cloudinary.com/sanket12/image/upload/v1704963820/orgv0s1cvikeyw5wpjp3.jpg",
"cookingTime": 30,
"category": "",
"order": 0,
"userOwner": "659ed8cb9a560cebea7714f7",
}
