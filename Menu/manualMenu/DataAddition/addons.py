from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project0')  # Update with your MongoDB connection string
db = client['project']  # Update with your database name
collection = db['AddOns']  # Update with your collection name

# Function to add add-on data
def add_addon(name, display_name, price, availability):
    addon_data = {
        'name': name,
        'displayName': display_name,
        'price': price,
        'availability': availability
    }
    result = collection.insert_one(addon_data)
    print("Add-on added with ID:", result.inserted_id)


for i in range(10):
# Take input from user
    name = input("Enter add-on name: ")
    display_name = input("Enter display name: ")
    price = float(input("Enter price: "))
    availability = 1

    # Add data to MongoDB
    add_addon(name, display_name, price, availability)









