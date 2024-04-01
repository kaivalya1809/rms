from pymongo import MongoClient

client = MongoClient('mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project0')  # Update with your MongoDB connection string
db = client['project']  # Update with your database name
collection = db['menuItems']  # Update with your collection name

# Retrieve all items from the collection
items = collection.find({})

# Print all items
print("All items in the collection:")
k = []
for item in items:
    print(item["_id"])
