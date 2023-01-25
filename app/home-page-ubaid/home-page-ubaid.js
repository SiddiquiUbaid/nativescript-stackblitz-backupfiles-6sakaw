



export function onDashboardTabLoaded(args) {

  var object = args.object
  var page = object.page

}

export function onItemPressed(args) {
  var defaultClassName = args.object.className
  // var defaultFontSize = args.object._subViews[0].fontSize
  
  if(defaultClassName == "content-leaf-style-rtl") {

      console.log("rtl: " + args.object.className )

      setTimeout(function(){
          args.object.className = "content-leaf-style-rtl"

      }, 100)

     
      args.object.className = "content-leaf-style-rtl-pressed"
               
    

      //args.object.className = defaultClassName 

  }
  else if(defaultClassName == "content-leaf-style-ltr") {

      console.log("rtl: " + args.object.className )

      setTimeout(function(){
          args.object.className = "content-leaf-style-ltr"

      }, 100)

     
      args.object.className = "content-leaf-style-ltr-pressed"

  }
  
  

  //args.object.className = "content-leaf-style-pressed" 
  // setTimeout(
  //     function () {
  //         args.object.className = "content-leaf-style-pressed" 
  
        
  //     }, 5000)
      
         // args.object.className = defaultClassName

     
      

      



}