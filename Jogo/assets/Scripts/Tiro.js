cc.Class({
    extends: cc.Component,

    properties: {
        movimentacao : null,
    },

    // use this for initialization
    onLoad: function () {
        this.movimentacao = this.getComponent("Movimentacao");
    },

    inicializa : function(pai, posicao, direcao)
    {
        this.node.parent = pai;
        this.node.position = posicao;
        this.movimentacao.setDirecao(direcao);
    },
    
    update: function (deltaTime) {
        this.movimentacao.andarParaFrente();
    },

    onCollisionEnter : function(other)
    {
        if(other.node.group == "inimigo")
        {
            other.node.emit("foiAtingido");
        }
        
        this.node.destroy();
    }
});
