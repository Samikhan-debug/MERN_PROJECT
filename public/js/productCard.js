document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');
    const pagination = document.getElementById('pagination');

    let currentPage = 1;
    const limit = 6;

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        let imageDisplay = product.imageUrl ? `<img src="/${product.imageUrl}" alt="${product.name}" class="card-img-top">` : 'No image';
        
        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                ${imageDisplay}
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <h6 class="card-subtitle mb-2 text-muted">$${product.price}</h6>
                    <button class="btn btn-primary add-to-cart" onclick="addToCart('${product._id}')">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    }

    function createPagination(totalPages) {
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.className = 'btn btn-outline-primary mx-1';
            pageButton.onclick = () => {
                currentPage = i;
                fetchProducts();
            };

            pagination.appendChild(pageButton);
        }
    }

    function fetchProducts() {
        fetch(`/api/products?page=${currentPage}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = '';
            data.products.forEach(createProductCard);
            createPagination(data.totalPages);
        });
    }

    window.addToCart = function(productId) {
        // Placeholder for add to cart functionality
        alert('Added product ' + productId + ' to cart!');
    };

    fetchProducts();
});
