cc.Class({
    extends: cc.Component,

    properties: {
        alvo : cc.Node,
        distanciaDoAtaque : cc.Float,
        _distanciaAtual : cc.Float,
        _movimentacao : null,
        _controleAnimacao : null,
        
    },

    // use this for initialization
    onLoad: function (){
        this.node.on("foiAtingido", this.sofrerDano, this);
        this.alvo = cc.find("Personagens/Jogador");
        this.movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleAnimacaoInimigo");
    },
    
    sofrerDano : function()
    {
        this.node.destroy();
    },

    update: function (deltaTime) {
        let direcao = this.alvo.position.sub(this.node.position);
        this._distanciaAtual = direcao.mag();
        this.movimentacao.setDirecao(direcao);

        if(this._distanciaAtual < this.distanciaDoAtaque)
        {
            this.alvo.emit("foiAtingido");   
        }
        else
        {
            this.movimentacao.andarParaFrente();
        }
        
        this._controleAnimacao.mudaAnimacao(this.movimentacao.direcao, "Andar");
    },
    
});
