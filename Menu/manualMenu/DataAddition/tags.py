from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project0')  # Update with your MongoDB connection string
db = client['project']  # Update with your database name
collection = db['Tags']  # Update with your collection name


# Function to add tag data


def add_tag(name, display_name, image_url, category):
    tag_data = {
        'name': name,
        'displayName': display_name,
        'imageURL': image_url,
        'category': category
    }
    result = collection.insert_one(tag_data)
    print("Tag added with ID:", result.inserted_id)

# Take input from 
for i in range(5):
    name = input("Enter tag name: ")
    display_name = input("Enter display name: ")
    image_url = input("Enter image URL: ")
    category = input("Enter category: ")

    # Add data to MongoDB
    add_tag(name, display_name, image_url, category)