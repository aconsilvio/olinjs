var $form = $("#ajax-form");
var $remove = $("#removeLink");
var $edit = $("#editStock");
var $order = $("#orderBurger");

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

var sendBurger = function(data, status) {
  var $ingredients = $(".ingredients");
};

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

$order.submit(function(event){
  event.preventDefault();
  formData = $form.serialize();

  $.post("orderBurger", formData)
    .done(sendBurger)
    .error(onError);
})