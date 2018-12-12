CREATE TABLE books {
    id SERIAL PRIMARY KEY,
    author VARCHAR (255),
    title VARCHAR (255), 
    isbn NUMERIC (13),
    image_url VARCHAR (255),
    description TEXT,
    bookshelf VARCHAR (255),
}

