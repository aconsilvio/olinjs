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
  var $rmOrderInput = $("#removeOrderInput");
  console.log(data, 'data')
  console.log($rmOrderInput.val(), '$rmOrderInput')
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

