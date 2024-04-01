from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project0')  # Update with your MongoDB connection string
db = client['project']  # Update with your database name
collection = db['Menu']  # Update with your collection name

# Function to add menu data
def add_menu(name, display_name, items):
    menu_data = {
        'name': name,
        'displayName': display_name,
        'items': items
    }
    result = collection.insert_one(menu_data)
    print("Menu added with ID:", result.inserted_id)

# Take input from user
name = input("Enter menu name: ")
display_name = input("Enter display name: ")
items = input("Enter IDs of menu items (comma-separated): ").split(',')

# Add data to MongoDB
add_menu(name, display_name, items)
