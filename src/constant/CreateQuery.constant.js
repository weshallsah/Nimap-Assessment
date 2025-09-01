const createProductquery = `CREATE TABLE IF NOT EXISTS Product (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL unique,
    description TEXT,
    categoryID INT,
    FOREIGN KEY (categoryID) REFERENCES Category(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`;

const createCategoryquery = `CREATE TABLE IF NOT EXISTS Category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL unique,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`;

export { createCategoryquery, createProductquery };
