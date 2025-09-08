document.addEventListener("DOMContentLoaded", () => {
    // --- SLIDER ---
    const slides = document.querySelectorAll(".slide");
    let current = 0;
    function showSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    }
    document.querySelector(".next").addEventListener("click", () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    });
    document.querySelector(".prev").addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    });
    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 5000);

    // Cart toggle button
    document.getElementById("cartBtn").addEventListener("click", () => {
        cartSidebar.classList.toggle("active");
    });

    // Close button inside sidebar
    document.getElementById("closeCart").addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });


    // --- FILTER + SEARCH ---
    const searchInput = document.getElementById("searchInput");
    const priceFilter = document.getElementById("priceFilter");
    const products = document.querySelectorAll(".product");
    function filterProducts() {
        const search = searchInput.value.toLowerCase();
        const price = priceFilter.value;
        let visibleCount = 0;
        products.forEach(product => {
            const name = product.dataset.name.toLowerCase();
            const productPrice = parseInt(product.dataset.price);
            let show = name.includes(search);
            if (price === "low") show = show && productPrice < 5000;
            else if (price === "mid") show = show && productPrice >= 5000 && productPrice <= 10000;
            else if (price === "high") show = show && productPrice > 10000;
            product.style.display = show ? "block" : "none";
            if(show) visibleCount++;
        });
        if (visibleCount === 0) {
            document.getElementById("noResults").style.display = "block";
        } else {
            document.getElementById("noResults").style.display = "none";
        }
    }
    searchInput.addEventListener("input", filterProducts);
    priceFilter.addEventListener("change", filterProducts);

    // --- PRODUCT DETAILS MODAL ---
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");



// Open modal when product image is clicked
products.forEach(product => {
    const img = product.querySelector("img");
    img.addEventListener("click", () => {
        const name = product.dataset.name;
        const price = product.dataset.price;
        const desc = product.dataset.desc || "No description available.";
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalName.textContent = name;
        modalPrice.textContent = "₹ " + price;
        modalDesc.textContent = desc;
    });
});

// Close modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal if clicked outside content
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


    // --- CART SYSTEM ---
    const cartSidebar = document.getElementById("cartSidebar");
    const cartItemsContainer = document.getElementById("cartItems");
    const cart = [];

    document.querySelectorAll(".add-to-cart").forEach((button, i) => {
        button.addEventListener("click", () => {
            const product = products[i];
            const name = product.dataset.name;
            const price = parseInt(product.dataset.price);
            cart.push({ name, price });
            renderCart();
            cartSidebar.classList.add("active");
        });
    });

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `<span>${item.name} - ₹${item.price}</span>
                             <button onclick="removeFromCart(${index})">X</button>`;
            cartItemsContainer.appendChild(div);
        });
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        renderCart();
    };

    document.getElementById("cartBtn").addEventListener("click", () => {
        cartSidebar.classList.toggle("active");
    });
});