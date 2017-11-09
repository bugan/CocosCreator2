cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
    },

    // use this for initialization
    onLoad: function () {

    },

    inicializa : function(pai, posicao, direcao)
    {
        this.node.parent = pai;
        this.node.position = posicao;
        this.direcao = direcao.normalize();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (deltaTime) {
        let deslocamento = this.direcao.mul(deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    onCollisionEnter : function(other)
    {
        console.log(other);
        
        if(other.node.group == "inimigo")
        {
            other.node.emit("foiAtingido");
        }
        
        this.node.destroy();
    }
});
