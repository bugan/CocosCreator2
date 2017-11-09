cc.Class({
    extends: cc.Component,
    
     update: function (deltaTime) {
         this.node.zIndex = -this.node.y;
     },
});
