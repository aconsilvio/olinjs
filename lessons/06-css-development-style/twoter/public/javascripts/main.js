var $form = $("#ajax-form");
var $login = $("#login-form");
var $loginlink = $("#loginlink");
var $logout = $("#logoutbutton");

//This is actually really good. Reactive inferaces with jquery require more code, which is why frontend frameworks exist. 
var onSuccess = function(data, status) {
  var $twotes = $(".twotes");
  var $tempTwote = $twotes.first().clone();//This only works if there is already a tweet
  $tempTwote.removeClass().addClass("twotes " +data.author)
  $tempTwote.children("#twotetext").html(data.text);
  $tempTwote.children("#authortext").html("-"+data.author);
  $tempTwote.attr("id", data._id);
  $twotes.first().before($tempTwote);

  $(".twotes").click(function(event){
    var author = $(this).children("#authortext").attr("author");
    var username = $("#username").text();
    console.log(username)
    if(author === username){
      $(this).children().css("display", "block")
    }
  })

  $(".deleteButton").click(function(event){
    var button =  $(this);
    var buttonId = $(this).parent().attr("id");
    $.post("deleteTwote", {id:buttonId})
    .done(function(data, status){
      button.parent().remove();
    }).error(onError);
  })
};

var onLogout = function(data, status) {
  var $message = $("#logoutmessage");
  $message.text("You have logged out.")
};



var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

// on hover select twotes by id in user
$(".users").hover(function(event){
  var userTwoteIds = $(this).attr("twotes").split(",").join(", #");

  var userTwotes = $(userTwoteIds);
  userTwotes.css("background-color", "#14716c");

}, function(event){
    var userTwoteIds = $(this).attr("twotes").split(",").join(", #");

  var userTwotes = $(userTwoteIds);
  userTwotes.css("background-color", "#20B2AA");

})

$(".deleteButton").click(function(event){
  var button =  $(this);
  var buttonId = $(this).parent().attr("id");
  $.post("deleteTwote", {id:buttonId})
  .done(function(data, status){
    button.parent().remove();
  }).error(onError);
})

$(".twotes").click(function(event){
  var author = $(this).children("#authortext").attr("author");
  var username = $("#username").text();
  console.log(username)
 if(author === username){
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

$logout.submit(function(event) {
  event.preventDefault();
  formData = $login.serialize();

  $.post("logout", formData)
    .done(onLogout)
    .error(onError);
});


//code from login without passport
// $login.submit(function(event) {
//   event.preventDefault();
//   formData = $login.serialize();

//   $.post("login", formData)
//     .done(onLogin)
//     .error(onError);
// });



// var onLogin = function(data, status) {
//   var $message = $("#loginmessage");
//   console.log(data, 'THIS IS DATA HELLO')
//   $message.text(data.name + " is logged in.")
// };
