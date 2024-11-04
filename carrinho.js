// Inicializa o carrinho vazio ou obtém o carrinho do armazenamento local
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Função para adicionar curso ao carrinho
function addToCart(courseName, price) {
    const existingItem = cart.find(item => item.name === courseName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: courseName, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${courseName} adicionado ao carrinho!`);
    window.location.href = "carrinho.html";
}

// Função para renderizar o carrinho na página do carrinho
function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartSummary = document.getElementById("cartSummary");
    const subtotalElement = document.getElementById("subtotal");

    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        cartSummary.style.display = "none";
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        subtotal += parseFloat(itemTotal);

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>R$ ${item.price.toFixed(2)}</span>
                <div class="quantity-control">
                    <button onclick="updateQuantity('${item.name}', 'decrease')">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 'increase')">+</button>
                </div>
                <span>Total: R$ ${itemTotal}</span>
            </div>
        `;
    });

    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    cartSummary.style.display = "block";
}

// Função para atualizar a quantidade
function updateQuantity(name, action) {
    const item = cart.find(item => item.name === name);

    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity--;
    } else if (action === 'decrease' && item.quantity === 1) {
        cart = cart.filter(cartItem => cartItem.name !== name);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Renderiza o carrinho ao carregar a página do carrinho
if (window.location.pathname.includes("carrinho.html")) {
    document.addEventListener("DOMContentLoaded", renderCart);
}
