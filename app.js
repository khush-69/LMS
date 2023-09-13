const express = require("express");
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());

//to get all customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Prisma.customer.findMany({
      include: {
        orders: true,
      },
    });
    res.send(customers);
  } catch (error) {
    res.status(404).send("No Customer Found");
  }
});

//to get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Prisma.order.findMany({});
    res.send(orders);
  } catch (error) {
    res.status(404).send("No Order Found");
  }
});

//to get customer by id
app.get("/customers/:id", async (req, res) => {
  // learn about number and parseInt where to use them and why
  try {
    const { id } = req.params;
    // understand the concepts of sql where to find where to join learn more about sql joins and best practice
    // const customer = await Prisma.customer.findUnique({
    //   where: {
    //     id: Number(id),
    //   },
    //   include: {
    //     orders: true,
    //   },
    // });

    const customer = await Prisma.order.findMany({
      where: {
        customerId: Number(id),
      },
    });
    res.json(customer);
  } catch (error) {
    res.status(404).send("Customer does not exist");
  }
});

//to get order by id
app.get("/orders/:id", async (req, res) => {
  // make your resolver optimized
  try {
    const { id } = req.params;
    const orders = await Prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.send(orders);
  } catch (error) {
    res.status(404).send("Order does not exist");
  }
});

//to add customer
app.post("/customers", async (req, res) => {
  try {
    const customer = await Prisma.customer.create({
      data: req.body,
    });
    res.status(201).send(customer);
  } catch (error) {
    res.status(500).send("Unable to Post");
  }
});

//to add order
app.post("/orders", async (req, res) => {
  // revamp the apis with best practice
  try {
    const order = await Prisma.order.create({
      data: req.body,
    });
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send("Unable to Post");
  }
});

//to delete customer
app.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Customer Removed");
  } catch (error) {
    res.status(404).send("Customer Not Found");
  }
});

//to delete order
app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Prisma.order.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Order Removed");
  } catch (error) {
    res.status(404).send("Order Not Found");
  }
});

// read more about express middlewares

//to update customer
app.patch("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.send(customer);
  } catch (error) {
    res.status(404).send("Customer Not Found");
  }
});

//to update order
app.patch("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Prisma.order.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.send(order);
  } catch (error) {
    res.status(404).send("order Not Found");
  }
});

app.get("/books", async (req, res) => {
  const booksData = await Prisma.book.findMany({
    include: {
      books: {
        select: {
          author: true,
        },
      },
    },
  });
  res.send(booksData);
});
app.get("/authors", async (req, res) => {
  const authorData = await Prisma.author.findMany({
    include: {
      authors: {
        select: {
          book: true,
        },
      },
    },
  });
  res.send(authorData);
});

// //to get book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Prisma.book.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        books: {
          select: {
            author: true,
          },
        },
      },
    });
    res.send(book);
  } catch (error) {
    res.status(404).send("Book does not exist");
  }
});

//to create a book
app.post("/books", async (req, res) => {
  try {
    const book = await Prisma.book.create({
      data: req.body,
    });
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send("Unable to Add");
  }
});

// //to update book
app.patch("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Prisma.book.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.send(book);
  } catch (error) {
    res.status(404).send("Book Not Found");
  }
});

// //to delete book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Book Removed");
  } catch (error) {
    res.status(404).send("Book Not Found");
  }
});

//to get author by id
app.get("/authors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Prisma.author.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        authors: {
          select: {
            book: true,
          },
        },
      },
    });
    res.send(author);
  } catch (error) {
    res.status(404).send("Author does not exist");
  }
});

// //to create a Author
app.post("/authors", async (req, res) => {
  try {
    const author = await Prisma.author.create({
      data: req.body,
    });
    res.status(201).send(author);
  } catch (error) {
    res.status(500).send("Unable to Add");
  }
});

// //to update author
app.patch("/authors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Prisma.author.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.send(author);
  } catch (error) {
    res.status(404).send("Author Not Found");
  }
});

// //to delete author
app.delete("/authors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Prisma.author.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Author Removed");
  } catch (error) {
    res.status(404).send("Author Not Found");
  }
});

app.get("/bookauth", async (req, res) => {
  try {
    const bookauth = await Prisma.book_author.findMany({
      include: {
        book: true,
        author: true,
      },
    });
    res.send(bookauth);
  } catch (error) {
    res.send("Unable to get Books");
  }
});
app.post("/bookauth", async (req, res) => {
  try {
    const bookauth = await Prisma.book_author.create({
      data: req.body,
    });
    res.status(201).send(bookauth);
  } catch (error) {
    res.status(500).send("Unable to Add");
  }
});

app.listen(3000, () => {
  console.log("Server running on Port 3000");
});
