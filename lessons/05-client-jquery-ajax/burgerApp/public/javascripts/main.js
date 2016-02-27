var $form = $("#ajax-form");
var $remove = $("#removeLink");
var $edit = $("#editStock");
var $order = $("#orderBurger");
var $rmOrder = $("#removeOrder");
var $checkbox = $(".checkbox");
var totalPrice = 0;

var onSuccess = function(data, status) {
  var $ingredients = $(".ingredients");

  console.log($ingredients.eq(0).children(".name").html(), 'first index of $ingredients')
  for(var i = 0; i < $ingredients.length; i++){
    if($ingredients.eq(i).children(".name").html() === data.name){
      console.log($ingredients.eq(i).children(".name").html(data.name), 'mainjs')
      $ingredients.eq(i).children(".name").html(data.name)
      $ingredients.eq(i).children(".price").html('$' + data.price)
      $ingredients.eq(i).children(".outOfStock").text(data.outOfStock)
      break;
    } else{
      var $tempIngredient = $ingredients.first().clone();
      $tempIngredient.children(".name").html(data.name);
      $tempIngredient.children(".price").html('$' + data.price);
      $tempIngredient.children(".outOfStock").text(data.outOfStock);
      $ingredients.first().before($tempIngredient);
      break;
    }
  }
};

var onRemove = function(data, status) {
  var $ingredients = $(".ingredients");

  data.forEach(function(ingredient){
    for(var i = 0; i < $ingredients.length; i++){
      if ($ingredients.eq(i).children('.name').text() === ingredient.name){
        $ingredients.eq(i).remove();
      }
    }
  })
};

var onRemoveOrder = function(data, status) {
  /* It looks like you're defining the input with the id "removeOrderInput" and the
     ul with the id "orderMakeup" in an {{#each}} Handlebars helper (views/kitchen.handlebars).

     Ids are supposed to appear only once on the page -- and you have as many things
     with the same id as you have orders.

     That's why you can only delete the first order on the page -- the selector
     $("#removeOrderInput") looks for the *one* item with id "removeOrderInput", it
     finds the first one, and it doesn't even consider that there might be more.

     So no matter which order you mark removed, the first one will always be removed.

     It looks like you're already:
     1) sending the order mongo id (_id) to the server in the initial ajax request
     2) deleting the order with that id in the server
     3) responding with res.json({id: selectedId}) (routes/kitchen.js)

     So most of the infrastructure you need to check off any order is in place.
     4) You should have access to the mongo id in this function -- data.id
        All you have to do is use jQuery to look for the input whose value matches
        the mongo id and remove it.
        I think the selector will look something like $('input[value=' + data.id + ']');
   */
  var $rmOrderInput = $("#removeOrderInput");
  if(data === $rmOrderInput.val()){
    $('#orderMakeup').remove();
    $rmOrderInput.remove();
  }

};

var sendBurger = function(data, status) {
  var $priceMessage = $('.priceMessage');
  var minutes = Math.floor((Math.random() * 20) + 1);
  $priceMessage.html("Your burger will cost $" + data.price.toFixed(2) +'.  It will be ready in '+ minutes +" minutes.")
  totalPrice = 0;
};

// var addPrice = function(data, status){
//   console.log(data, 'add price data')
//   var $priceCountVal = $('#priceCountVal');
//   $priceCountVal.html('HELLO IM HERE')
// }

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  formData = $form.serialize();

  $.post("ingredients", formData)
    .done(onSuccess)
    .error(onError);
});

$remove.submit(function(event){
  event.preventDefault();
  formData = $form.serialize();

  $.post("removeOutOfStock", formData)
    .done(onRemove)
    .error(onError);
})

$rmOrder.submit(function(event){
  event.preventDefault();
  formData = $rmOrder.serialize();

  $.post("removeOrder", formData)
    .done(onRemoveOrder)
    .error(onError);
})

$order.submit(function(event){
  event.preventDefault();
  formData = $order.serialize();

  $.post("orderBurger", formData)
    .done(sendBurger)
    .error(onError);
})

$checkbox.change(function(event){
  event.preventDefault();
  if($(this).is(":checked")){
    totalPrice += Number($(this).attr("price"));
  } else {
    totalPrice -= Number($(this).attr("price"));
  }
  $("#priceCountVal").html('$'+totalPrice.toFixed(2));
  // $.post("onClick", formData)
  //   .done(addPrice)
  //   .error(onError);
})

