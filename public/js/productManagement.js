document.addEventListener('DOMContentLoaded', function() {
    const addForm = document.getElementById('addProductForm');
    const productList = document.getElementById('productList');

    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(addForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(addProduct)
        .catch(err => console.error('Error:', err));
    });

    function addProduct(product) {
        const item = document.createElement('li');
        item.innerHTML = `${product.name} - ${product.price} - ${product.description} - ${product.category}
                          <button onclick="deleteProduct('${product._id}')">Delete</button>
                          <button onclick="updateProduct('${product._id}')">Update</button>`;
        productList.appendChild(item);
    }

    function fetchProducts() {
        fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = '';
            products.forEach(addProduct);
        });
    }

    window.deleteProduct = function(id) {
        fetch(`/api/products/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => fetchProducts());
    };

    
    function showUpdateForm(product) {
        document.getElementById('updateId').value = product._id;
        document.getElementById('updateName').value = product.name;
        document.getElementById('updatePrice').value = product.price;
        document.getElementById('updateDescription').value = product.description;
        document.getElementById('updateCategory').value = product.category;
        document.getElementById('updateProductForm').style.display = 'block';
    }
    
    window.updateProduct = function(id) {
        fetch(`/api/products/${id}`)
        .then(response => response.json())
        .then(product => showUpdateForm(product));
    };
    
    window.submitUpdate = function() {
        const id = document.getElementById('updateId').value;
        const updatedData = {
            name: document.getElementById('updateName').value,
            price: parseFloat(document.getElementById('updatePrice').value),
            description: document.getElementById('updateDescription').value,
            category: document.getElementById('updateCategory').value
        };
    
        fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Update successful:', data);
            document.getElementById('updateProductForm').style.display = 'none';
            fetchProducts(); // Refresh the list after update
        })
        .catch(err => console.error('Error:', err));
    };
    

    fetchProducts();
});
