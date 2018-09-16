$(function() {

    $("#submit-btn").on("click", function(event) {
        event.preventDefault();
        console.log("click");
        var newBurger = {
            burgerName: $("#input").val().trim(),
            devoured: false
        };

        $.post("/api/burgers", newBurger)
          .then(
            function() {
                console.log("New burger " + newBurger.burgerName + " added!");

                location.reload();
            });
    });

    $(".devour-burger").on("click", function() {
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");
        
        //data object sent to server
        var devouredState = {
            devoured: newDevoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(
            function() {
                console.log("Burger with id: " + id + " changed to " + newDevoured);

                location.reload();
            });
    });

    $(".delete-burger").on("click", function() {
        var id = $(this).data("id");
    
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("Burger with id: " + id + " has been removed.");

                location.reload();
            });
    })

})