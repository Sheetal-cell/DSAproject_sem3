// Data Store
        const menuItems = [
            { id: 1, name: "Grilled Salmon Bowl", price: 18.99, rating: 4.8, category: "Main Course", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80", time: "25-30 min" },
            { id: 2, name: "Classic Avocado Toast", price: 12.50, rating: 4.5, category: "Salads", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80", time: "15-20 min" },
            { id: 3, name: "Truffle Beef Burger", price: 15.99, rating: 4.9, category: "Fast Food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", time: "20-25 min" },
            { id: 4, name: "Thai Green Curry", price: 14.20, rating: 4.7, category: "Main Course", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=400&q=80", time: "30-35 min" },
            { id: 5, name: "Greek Caesar Salad", price: 10.99, rating: 4.3, category: "Salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80", time: "10-15 min" },
            { id: 6, name: "Molten Choco Lava", price: 8.50, rating: 4.9, category: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", time: "15 min" },
            { id: 7, name: "Margherita Woodfire", price: 13.99, rating: 4.6, category: "Fast Food", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80", time: "20-25 min" },
            { id: 8, name: "Berry Smoothie Bowl", price: 9.99, rating: 4.4, category: "Desserts", image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=400&q=80", time: "10 min" }
        ];

        const recipes = [
            {
                name: "Mediterranean Roast Chicken",
                servings: 4,
                calories: "450 kcal",
                time: "45 min",
                ingredients: ["Chicken breast", "Olive oil", "Lemon", "Garlic", "Rosemary"],
                steps: "1. Marinate chicken with oil and herbs. 2. Roast at 200°C for 30 minutes. 3. Squeeze lemon before serving.",
                image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80"
            },
            {
                name: "Vegan Power Bowl",
                servings: 2,
                calories: "320 kcal",
                time: "15 min",
                ingredients: ["Quinoa", "Avocado", "Kale", "Chickpeas", "Tahini dressing"],
                steps: "1. Cook quinoa. 2. Massage kale with oil. 3. Combine ingredients and drizzle dressing.",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
            }
        ];

        let cart = [];
        let currentTab = 'home';

        // Initialize
        window.onload = () => {
            renderMenu();
            renderRecipes();
            updateCartUI();
        };

        // UI Logic
        function switchTab(tabId) {
            document.querySelectorAll('.view-content').forEach(view => view.classList.add('hidden'));
            document.getElementById(`${tabId}-view`).classList.remove('hidden');
            window.scrollTo(0, 0);
            currentTab = tabId;
        }

        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            sidebar.classList.toggle('translate-x-full');
        }

        function toggleChat() {
            const chat = document.getElementById('chat-window');
            chat.classList.toggle('hidden');
        }

        // Menu Logic
        function renderMenu() {
            const filter = document.getElementById('category-filter').value;
            const container = document.getElementById('menu-grid');
            container.innerHTML = '';

            const filtered = filter === 'all' ? menuItems : menuItems.filter(item => item.category === filter);

            filtered.forEach(item => {
                container.innerHTML += `
                    <div class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div class="relative h-48 overflow-hidden">
                            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold">
                                <span>★</span> ${item.rating}
                            </div>
                        </div>
                        <div class="p-5">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="font-bold text-lg">${item.name}</h4>
                                <span class="text-orange-500 font-bold">$${item.price.toFixed(2)}</span>
                            </div>
                            <p class="text-slate-400 text-xs mb-4 flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                ${item.time}
                            </p>
                            <button onclick="addToCart(${item.id})" class="w-full py-2 bg-slate-50 text-slate-900 rounded-xl font-bold border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        // Cart Logic
        function addToCart(id) {
            const item = menuItems.find(i => i.id === id);
            const existing = cart.find(c => c.id === id);
            
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({...item, quantity: 1});
            }
            
            updateCartUI();
            showModal('Item Added!', `${item.name} is now in your basket.`, 'success');
        }

        function updateCartUI() {
            const container = document.getElementById('cart-items');
            const countLabel = document.getElementById('cart-count');
            const subtotalLabel = document.getElementById('cart-subtotal');
            const totalLabel = document.getElementById('cart-total');

            container.innerHTML = '';
            let subtotal = 0;
            let count = 0;

            cart.forEach((item, index) => {
                subtotal += item.price * item.quantity;
                count += item.quantity;
                container.innerHTML += `
                    <div class="flex gap-4 items-center bg-slate-50 p-3 rounded-2xl">
                        <img src="${item.image}" class="w-16 h-16 rounded-xl object-cover">
                        <div class="flex-grow">
                            <h5 class="font-bold text-sm">${item.name}</h5>
                            <p class="text-orange-500 text-xs font-bold">$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="changeQty(${index}, -1)" class="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded-lg">-</button>
                            <span class="text-xs font-bold">${item.quantity}</span>
                            <button onclick="changeQty(${index}, 1)" class="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded-lg">+</button>
                        </div>
                    </div>
                `;
            });

            countLabel.innerText = count;
            subtotalLabel.innerText = `$${subtotal.toFixed(2)}`;
            totalLabel.innerText = `$${(subtotal > 0 ? subtotal + 2.99 : 0).toFixed(2)}`;
        }

        function changeQty(index, delta) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) cart.splice(index, 1);
            updateCartUI();
        }

        // Recipe Logic
        function renderRecipes() {
            const container = document.getElementById('recipe-grid');
            recipes.forEach(recipe => {
                container.innerHTML += `
                    <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row">
                        <img src="${recipe.image}" class="w-full md:w-48 h-48 md:h-auto object-cover">
                        <div class="p-6">
                            <div class="flex gap-2 mb-2">
                                <span class="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">${recipe.calories}</span>
                                <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">${recipe.time}</span>
                            </div>
                            <h4 class="text-xl font-bold mb-4">${recipe.name}</h4>
                            <div class="space-y-4">
                                <div>
                                    <p class="text-xs font-bold text-slate-400 uppercase mb-1">Ingredients</p>
                                    <p class="text-sm text-slate-600">${recipe.ingredients.join(', ')}</p>
                                </div>
                                <div>
                                    <p class="text-xs font-bold text-slate-400 uppercase mb-1">Steps</p>
                                    <p class="text-sm text-slate-600 line-clamp-2">${recipe.steps}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Chatbot Simulation
        function sendMessage() {
            const input = document.getElementById('chat-input');
            const messages = document.getElementById('chat-messages');
            const val = input.value.trim();
            
            if(!val) return;

            // User Message
            messages.innerHTML += `
                <div class="bg-orange-500 text-white p-3 rounded-2xl rounded-tr-none ml-8 text-right">
                    ${val}
                </div>
            `;
            
            input.value = '';
            
            // Bot logic
            setTimeout(() => {
                let reply = "I'm not sure about that. Try asking for 'menu' or 'status'!";
                const lowerVal = val.toLowerCase();
                
                if (lowerVal.includes('menu')) {
                    reply = "Our top items today are the Grilled Salmon Bowl and Truffle Burger! Would you like to see the menu tab?";
                } else if (lowerVal.includes('track') || lowerVal.includes('status')) {
                    reply = "Your last order #FGP-9821 is currently being prepared! Head to the Live Track tab for real-time updates.";
                } else if (lowerVal.includes('hello') || lowerVal.includes('hi')) {
                    reply = "Hello! Foodie Assistant here. I can help you find meals or track your orders.";
                }

                messages.innerHTML += `
                    <div class="bg-slate-100 p-3 rounded-2xl rounded-tl-none mr-8">
                        ${reply}
                    </div>
                `;
                messages.scrollTop = messages.scrollHeight;
            }, 600);
        }

        // Order Action
        function checkout() {
            if(cart.length === 0) {
                showModal('Basket Empty', 'Add some delicious food before checking out!', 'error');
                return;
            }
            
            toggleCart();
            showModal('Order Success!', 'Your food is being prepared. Redirecting to tracking...', 'success');
            setTimeout(() => {
                cart = [];
                updateCartUI();
                switchTab('tracking');
                closeModal();
            }, 2000);
        }

        // Modal Handler
        function showModal(title, desc, type) {
            const container = document.getElementById('modal-container');
            const titleEl = document.getElementById('modal-title');
            const descEl = document.getElementById('modal-desc');
            const iconEl = document.getElementById('modal-icon');

            titleEl.innerText = title;
            descEl.innerText = desc;
            
            iconEl.innerHTML = type === 'success' ? 
                '<div class="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl">✓</div>' :
                '<div class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl">!</div>';

            container.classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('modal-container').classList.add('hidden');
        }

        // Support Enter key for chat
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') sendMessage();
        });