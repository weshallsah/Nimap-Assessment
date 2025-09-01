const insertcategory = `
INSERT INTO Category (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Books and publications'),
('Home & Garden', 'Home improvement and garden supplies'),
('Sports', 'Sports equipment and accessories')
ON CONFLICT (name) DO NOTHING;

`;

const insertproduct = `
INSERT INTO Product (name, description, categoryID) VALUES
('iPhone 15 Pro', 'Latest flagship smartphone with titanium design and advanced camera system', 1),
('MacBook Air M3', '13-inch laptop with M3 chip and all-day battery life', 1),
('Samsung 4K TV', '55-inch Smart TV with HDR and streaming apps', 1),
('Bluetooth Headphones', 'Wireless noise-canceling headphones with 30-hour battery', 1),
('Gaming Laptop', 'High-performance laptop for gaming and content creation', 1),
('Cotton T-Shirt', 'Comfortable cotton t-shirt available in multiple colors', 2),
('Denim Jeans', 'Classic straight-fit jeans made from premium denim', 2),
('Winter Jacket', 'Waterproof insulated jacket for cold weather', 2),
('Running Shoes', 'Lightweight athletic shoes with cushioned sole', 2),
('Casual Dress', 'Elegant dress perfect for office or casual occasions', 2),
('JavaScript Programming Guide', 'Complete tutorial for learning modern JavaScript development', 3),
('Mystery Novel', 'Bestselling thriller with unexpected plot twists', 3),
('Cookbook International', 'Collection of recipes from around the world', 3),
('History of Science', 'Comprehensive guide to scientific discoveries', 3),
('Art Techniques Book', 'Step-by-step guide to drawing and painting', 3),
('Garden Tool Set', 'Complete set of essential gardening tools', 4),
('LED Light Bulbs', 'Energy-efficient LED bulbs pack of 6', 4),
('Coffee Maker', 'Automatic drip coffee maker with timer function', 4),
('Basketball', 'Official size basketball for indoor and outdoor use', 5),
('Tennis Racket', 'Professional tennis racket with graphite frame', 5),
('Yoga Mat', 'Non-slip exercise mat with carrying strap', 5),
('Dumbbells Set', 'Adjustable dumbbells from 5 to 50 pounds', 5),
('Bicycle Mountain', 'All-terrain mountain bike with 21-speed transmission', 5)
ON CONFLICT (name) DO NOTHING;
`;

export { insertcategory, insertproduct };
