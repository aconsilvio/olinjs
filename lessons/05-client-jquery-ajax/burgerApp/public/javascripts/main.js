var $form = $("#ajax-form");
var $remove = $("#removeLink");

var onSuccess = function(data, status) {
  var $ingredients = $(".ingredients");

  var $tempIngredient = $ingredients.first().clone();
  var name = $tempIngredient.children(".outOfStock").first();
  $tempIngredient.children(".name").html(data.name);
  $tempIngredient.children(".price").html('$' + data.price);
  $tempIngredient.children(".outOfStock").text('false');

  $ingredients.first().before($tempIngredient);
};

var onRemove = function(data, status) {
  var $ingredients = $(".ingredients");
  console.log(data);
  data.forEach(function(ingredient){
    for(var i = 0; i < $ingredients.length; i++){
      if ($ingredients.eq(i).children('.name').text() === ingredient.name){ 
        $ingredients.eq(i).remove();
        console.log($ingredients.eq(i));
      }
    }
  })  
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