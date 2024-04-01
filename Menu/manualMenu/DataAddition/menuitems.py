from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project0')  # Update with your MongoDB connection string
db = client['project']  # Update with your database name
collection = db['menuItems']  # Update with your collection name

# Function to add menu item data
def add_menu_item(name, display_name, description, price, availability, is_veg, add_ons, tags, kitchen, image_url):
    menu_item_data = {
        'name': name,
        'displayName': display_name,
        'description': description,
        'price': price,
        'availability': availability,
        'isVeg': is_veg,
        'addOns': add_ons,
        'tags': tags,
        'kitchen': kitchen,
        'imageUrl': image_url
    }
    result = collection.insert_one(menu_item_data)
    print("Menu item added with ID:", result.inserted_id)

# Take input from user
    
for i in range(16):
    name = input("Enter menu item name: ")
    display_name = input("Enter display name: ")
    description = input("Enter description: ")
    price = float(input("Enter price: "))
    availability = bool(input("Enter availability (True/False): "))
    is_veg = bool(input("Is it vegetarian? (True/False): "))
    add_ons = input("Enter IDs of add-ons (comma-separated): ").split(',')
    tags = input("Enter IDs of tags (comma-separated): ").split(',')
    kitchen = input("Enter ID of kitchen: ")
    image_url = input("Enter image URL: ")

    # Add data to MongoDB
    add_menu_item(name, display_name, description, price, availability, is_veg, add_ons, tags, kitchen, image_url)

    