document.addEventListener('DOMContentLoaded', function() {
    const addForm = document.getElementById('addProductForm');
    const productList = document.getElementById('productList');

    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(addForm);
    
        fetch('/api/products', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(addProduct)
        .catch(err => console.error('Error:', err));
    });

    function addProduct(product) {
        const row = document.createElement('tr');
        
        let imageDisplay = product.imageUrl ? `<img src="/${product.imageUrl}" alt="${product.name}" style="max-width: 100px;">` : 'No image';
        
        row.innerHTML = `
            <td>${product._id}</td>
            <td>${imageDisplay}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Delete</button>
                <button class="btn btn-primary" onclick="updateProduct('${product._id}')">Update</button>
            </td>
        `;
        productList.appendChild(row);
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
        const formData = new FormData();
        formData.append('name', document.getElementById('updateName').value);
        formData.append('price', document.getElementById('updatePrice').value);
        formData.append('description', document.getElementById('updateDescription').value);
        formData.append('category', document.getElementById('updateCategory').value);
        const imageFile = document.getElementById('updateImage').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }
        
        fetch(`/api/products/${id}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Update successful:', data);
            document.getElementById('updateProductForm').style.display = 'none';
            fetchProducts();
        })
        .catch(err => console.error('Error:', err));
    };

    fetchProducts();
});
