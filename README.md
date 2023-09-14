# Z-Prefix-CRUD

1. Fork and/or Clone the repository: https://github.com/Davth5/Z-Prefix-CRUD

2. cd into your project directory where you cloned the repo

3. "code ." to open the project in your editor (VS code will be the assumed choice)

4. "docker-compose up" to start container for postgres

5. cd into client directory and "npm install", then "npm start"

6. cd into server directory and "npm install", then "nodemon app.js"

7. still in the server directory, run script "npm run migrate-and-seed"

8. You should now be at the Login page. From here, you may click on Inventory to navigate to the current inventory of items. However, if you want to edit, delete, or add any items; please register for an account or use one of the default users provided:

Username: john.doe
Password: 12345

9. If you choose to create a new user, after filling in all the details you will be redirected to the dashboard.

9. Once you are logged in as any Inventory Manager, you will have to ability to add any new items or edit existing items, as well as delete any items from your dashboard. You may also view your current inventory.

10. To edit an item, click on it from your inventory or the Inventory page and then edit any details. You may also delete the item from the edit page.

11. To tear down the app, stop both servers with CTRL/Command + C in their respective terminals and docker-compose down. Don't forget to delete the container, images, and volume.