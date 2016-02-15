var $form = $("#ajax-form");
var $login = $("#login-form");
var $loginlink = $("#loginlink");
var $logout = $("#logoutbutton");

var onSuccess = function(data, status) {
  var $twotes = $(".twotes");
  var $tempTwote = $twotes.first().clone();
  $tempTwote.children("#twotetext").html(data.text);
  $tempTwote.children("#authortext").html("-"+data.author);
  $twotes.first().before($tempTwote);
};


var onLogin = function(data, status) {
  var $message = $("#loginmessage");
  console.log(data, 'THIS IS DATA HELLO')
  $message.text(data.name + " is logged in.")
};

var onLogout = function(data, status) {
  var $message = $("#logoutmessage");
  $message.text("You have logged out.")
};



var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$(".users").hover(function(event){
  var name = $(this).attr("id");
  $("." + name ).css("background-color", "#49A5CD");

}, function(event){
  var name = $(this).attr("id");
  $("." + name ).css("background-color", "#20B2AA");

})

$(".deleteButton").click(function(event){
  var button =  $(this);
  var buttonId = $(this).attr("id");
  $.post("deleteTwote", {id:buttonId})
  .done(function(data, status){
    button.parent().remove();
  }).error(onError);
})

$(".twotes").click(function(event){
  var username = $("#username").text();
 if($(this).attr("class").split(" ")[1] === username){
    $(this).children().css("display", "block")
 }
})

$form.submit(function(event) {
  event.preventDefault();
  formData = $form.serialize();

  $.post("newTwote", formData)
    .done(onSuccess)
    .error(onError);
});

$login.submit(function(event) {
  event.preventDefault();
  formData = $login.serialize();

  $.post("login", formData)
    .done(onLogin)
    .error(onError);
});

$logout.submit(function(event) {
  event.preventDefault();
  formData = $login.serialize();

  $.post("logout", formData)
    .done(onLogout)
    .error(onError);
});
