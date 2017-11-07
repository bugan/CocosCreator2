cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
    },

    // use this for initialization
    onLoad: function () {
      
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.direcao = this.direcao.normalize();

        let deslocamento = this.direcao.mul(dt * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },
    
   
});
