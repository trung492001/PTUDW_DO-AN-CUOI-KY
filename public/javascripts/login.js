function myFunction() {
    var x = document.querySelectorAll("#password");
    x.forEach(item => {
        if (item.type === "password")
            item.type = "text";
        else item.type = "password";
    });
  }