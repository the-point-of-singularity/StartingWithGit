var student = function(name){

    this.name = name;
  
    var printName = () => {
  
      console.log(this.name)
  
    }
  
     printName()
  
  }
  
  var yash = new student("yash")