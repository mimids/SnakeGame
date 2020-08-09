class Controller{

  constructor(view,model){
    this.model = model;
    this.view = view;
    //---------------------------
    // Init set
    //---------------------------
    this.handleSetData(this.model.snake,this.model.apple,this.model.alert,this.model.canvas);
    //---------------------------
    // Key lListeners set
    //---------------------------
    this.view.bindKeyListeners(this.handleKeyListeners);
  }// END consrtuctor

  handleSetData(snake,apple,alert,canvas){
    this.view.setData(snake,apple,alert,canvas);
  }
 
  handleKeyListeners=(snake,e)=>{
    this.model.keyListeners(snake,e);
  }
//---------------------------- 
}//End Class Controller