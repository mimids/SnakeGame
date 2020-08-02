class Controller{

  constructor(view,model){
    this.model = model;
    this.view = view;
    this.handleSetData(this.model.snake,this.model.apple,this.model.alert,this.model.canvas);
  }// END consrtuctor

  handleSetData(snake,apple,alert,canvas){
    this.view.setData(snake,apple,alert,canvas);
  }
 
//---------------------------- 
}//End Class Controller