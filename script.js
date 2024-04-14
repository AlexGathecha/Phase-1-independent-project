// document.addEventListener("DOMContentLoaded", function () {
//     // Fetch inventory items from the server
//     fetch("db.json")
//         .then(response => response.json())
//         .then(data => {
//             const inventoryItems = data.inventoryItems;
//             const inventoryItemsContainer = document.getElementById("inventory-items");

//             inventoryItems.forEach(item => {
//                 const inventoryItemDiv = document.createElement("div");
//                 inventoryItemDiv.classList.add("inventory-item");
//                 inventoryItemDiv.innerHTML = `
//                     <h3>${item.name}</h3>
//                     <p>$${item.price} - ${item.description}</p>
//                     <button class="restock-btn">Restock</button>
//                     <button class="delete-btn">Delete</button>
//                 `;
//                 inventoryItemsContainer.appendChild(inventoryItemDiv);

//                 // Add event listener for restock button
//                 const restockBtn = inventoryItemDiv.querySelector(".restock-btn");
//                 restockBtn.addEventListener("click", function () {
//                     console.log(`Restock item: ${item.name}`);
//                     restockItem(item);
//                 });

//                 // Add event listener for delete button
//                 const deleteBtn = inventoryItemDiv.querySelector(".delete-btn");
//                 deleteBtn.addEventListener("click", function () {
//                     console.log(`Delete item: ${item.name}`);
//                     deleteInventoryItem(item);
//                 });
//             });
//         })
//         .catch(error => console.error("Error fetching inventory data:", error));
// });

// // Function to handle restocking of an item
// function restockItem(item) {
//     console.log(`Restocking ${item.name}`);
//     // Additional logic to adjust inventory counts can be implemented here
// }

// // Function to handle the deletion of an inventory item
// function deleteInventoryItem(item) {
//     console.log(`Deleting ${item.name}`);
//     // Logic to delete the item from the database or adjust the inventory count
// }

// // Function to fetch data from the server and display inventory items
// function getAllInventoryItems() {
//     fetch('http://localhost:3000/inventory')
//         .then(response => response.json())
//         .then(items => {
//             items.forEach(item => displayInventoryItem(item));
//         })
//         .catch(error => console.error('Error fetching inventory items:', error));
// }

// // Function to display each inventory item
// function displayInventoryItem(item) {
//     let inventoryItem = document.createElement("div");
//     inventoryItem.classList.add("inventory-item");
//     inventoryItem.innerHTML = `
//         <h3>${item.name}</h3>
//         <p>${item.description}</p>
//         <p>Price: $${item.price}</p>
//         <button class="restock-btn">Restock</button>
//         <button class="delete-btn">Delete</button>
//     `;
//     document.getElementById("inventory-items").appendChild(inventoryItem);
// }

// // Initialize the application
// function initialize() {
//     getAllInventoryItems();
// }

// // Call the initialize function when the window loads
// window.onload = initialize;
function collectCustomerInfoAndSendNotification(foodName) {

    const username = document.getElementById('inlineFormInputGroupUsername').value;
    const preference = document.getElementById('inlineFormSelectPref').value;
    const rememberMe = document.getElementById('inlineFormCheck').checked;

    
    const data = {
        foodName: foodName,
        username: username,
        preference: preference,
        rememberMe: rememberMe
    };

    fetch('https://localhost:3000/sendNotification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send notification');
        }
        return response.json();
    })
    .then(responseData => {
    
        console.log('Notification sent successfully:', responseData);
        alert('Notification sent successfully!');
    })
    .catch(error => {
        
        console.error('Error sending notification:', error);
        alert('Failed to send notification. Please try again later.');
    });
}


function handleOrderButtonClick() {
    const foodName = this.dataset.food;
    
    collectCustomerInfoAndSendNotification(foodName);
}


function handleDeleteButtonClick() {
    const foodName = this.dataset.food;
    const confirmDelete = confirm(`Are you sure you want to delete ${foodName} from your order?`);
    if (confirmDelete) {
        this.parentElement.remove();
        alert(`${foodName} removed from your order.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', handleOrderButtonClick);
    });


    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDeleteButtonClick);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const inventoryData = {
        "inventoryItems": [
            {"id": 1, "name": "Laptop", "description": "15-inch laptop with 8GB RAM and 256GB SSD, perfect for everyday business tasks.", "price": 1200, "stockLevel": 25, "supplier": "TechAdvance"},
            {"id": 2, "name": "Ergonomic Chair", "description": "Comfortable ergonomic office chair with adjustable lumbar support.", "price": 300, "stockLevel": 40, "supplier": "ComfortSeating"},
            {"id": 3, "name": "LED Desk Lamp", "description": "Adjustable LED desk lamp with four color modes and USB charging port.", "price": 45, "stockLevel": 75, "supplier": "BrightWork"},
            {"id": 4, "name": "Wireless Keyboard and Mouse", "description": "Wireless keyboard and mouse combo with long battery life and silent typing.", "price": 60, "stockLevel": 50, "supplier": "InputGear"},
            {"id": 5, "name": "External Hard Drive", "description": "2TB USB 3.0 external hard drive, suitable for backups and additional storage.", "price": 80, "stockLevel": 30, "supplier": "StoragePlus"}
        ]
    };

    const container = document.getElementById("inventory-items");
    inventoryData.inventoryItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `<h4>${item.name}</h4>
                                 <p>${item.description}</p>
                                 <p>Price: $${item.price}</p>
                                 <p>Stock Level: ${item.stockLevel}</p>
                                 <p>Supplier: ${item.supplier}</p>`;
        container.appendChild(itemElement);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Fetch order data
    fetch("orders.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Process order data
            console.log("Order data:", data);
        })
        .catch(error => {
            console.error("Error fetching order data:", error);
        });

    // Fetch demand data
    fetch("demand-data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Process demand data
            console.log("Demand data:", data);
        })
        .catch(error => {
            console.error("Error fetching demand data:", error);
        });
});

