cc.Class({
    extends: cc.Component,

    properties: {
        alvo : cc.Node,
        velocidade : cc.Float,
        direcao : cc.Vec2,
        
      

    },

    // use this for initialization
    onLoad: function () {
      
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.direcao = this.alvo.position.sub(this.node.position);
        this.direcao = this.direcao.normalize();
        let deslocamento = this.direcao.mul(dt * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },
    
    
});
