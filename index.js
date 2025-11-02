//-------Basic http server-------

// const http = require("http");
// const myServer = http.createServer((req, res) => {
//   res.end(" Starting the Backend Basic");
// });

// myServer.listen(8000, () => console.log("server started 1"));

//-------converting http server in express-----

// const express = require('express')

// const app = express()

// app.get('/',(req,res)=>{
//   res.send("Home Page")
// })

// app.listen(8000, () => console.log("server started 1"))

//---------REST API`s----------

const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

// /users with html in response is called or we can say it is SSR(server side rendering)
app.get("/users", (req, res) => {
  const htmlResponse = ` <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul> `;
  res.send(htmlResponse);
});
//--rest api start from here---

// `/api` is use to identify that it is the data which is used for mobile and other thinhg so the html response  does not work for them so we have to send it in json format.
//CLR(client side rendering)

app.get("/api/users", (req, res) => {
  return res.json(users);
});

//dynamic user
// to find user by id
//`:` is used to identify it is dyanamic route.

/*
app.get('/api/users/:id',(req,res)=>{
  const id = Number(req.params.id)
  const user = users.find((user)=>
    user.id === id
  )
  return res.json(user)
})

app.patch('/api/users/:id',(req,res)=>{
  return res.json({"Status":"Pending"})
})

app.delete('/api/users/:id',(req,res)=>{
  return res.json({"Status":"Pending"})
})
*/

//As we see above the three request `get, patch, delete` all are using same route so we can wriet then in another way which is increase the redeability of code and reduce the complexity.

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ Status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ Status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
  console.log(body);

  //   return res.json({ Status: "Pending" });
});

app.listen(PORT, () => console.log("server started REST API's"));
