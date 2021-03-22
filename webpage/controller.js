console.log("Abriu o controller.js");

$.ajax("http://localhost:3000/users", {
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        name: "Renan",
        surname: "Almeida",
        email: "renaasdasdnasdasdasdasd@gmail.com",
        password: "renan123",
    }),
    success: (data) => {
        console.log("sucesso", data);
    },
    error: (err) => {
        console.log("erro");
        console.log(err.status);
        console.log(err.responseText);
    },
});
