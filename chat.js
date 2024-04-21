const message = document.getElementById("message"),
  input = document.getElementById("input");
new EventSource("/sse").onmessage = function (e) {
  message.innerHTML += `<p>${e.data}</p>`;
};
form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(`/chat?message=${input.value}`);
  input.value = "";
});

// $(() => {
//   $("#send").click(() => {
//     sendMessage({
//       name: $("#name").val(),
//       message: $("#message").val(),
//     });
//   });
//   getMessages();
// });

// function addMessages(message) {
//   $("#messages").append(`
//     <h4> ${message.name} </h4>
//     <p>  ${message.message} </p>`);
// }

// function getMessages() {
//   $.get(`http://localhost:3000/messages`, (data) => {
//     data.forEach(addMessages);
//   });
// }

// function sendMessage(message) {
//   $.post(`http://localhost:3000/messages`, message);
// }
