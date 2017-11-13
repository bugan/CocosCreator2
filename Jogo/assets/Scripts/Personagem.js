let Personagem = cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
        estadoAtual : cc.String,

        _animacao : cc.Animation,
        _deltaTime : cc.Float,
        
    },

    // use this for initialization
    onLoad: function () {

        this._animacao = this.getComponent(cc.Animation);
        this.estadoAtual = "Parado";
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (deltaTime) {
        this._deltaTime = deltaTime;
    },

    onCollisionStay : function(other)
    {
        if(other.node.group == "cenario")
        {
            this.voltarParaPosicaoDoUltimoFrame()
        }
    }, 
    
    voltarParaPosicaoDoUltimoFrame : function()
    {
        let deslocamento = this.direcao.mul(-1 * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    mudaAnimacao : function()
    {
        let proximaAnimacao = this.escolheAnimacaoParaDirecaoAtual();

        if(!this.animacaoEstaTocando(proximaAnimacao))
        {
            this._animacao.play(proximaAnimacao);
        }
    },

    animacaoEstaTocando : function(proximaAnimacao)
    {
        return this._animacao.getAnimationState(proximaAnimacao).isPlaying
    },

    escolheAnimacaoParaDirecaoAtual : function()
    {
        let proximaAnimacao = this.estadoAtual;

        proximaAnimacao += this.escolheAnimacaoParaEixo(this.direcao.x, "Direita", "Esquerda");
        proximaAnimacao += this.escolheAnimacaoParaEixo(this.direcao.y, "Cima", "Baixo");
       
        return proximaAnimacao;

    },

    escolheAnimacaoParaEixo : function(valorDoEixo, animacaoValorPositivo, animacaoValorNegativo)
    {
        if(valorDoEixo > 0)
        {
            return animacaoValorPositivo;
        }
        
        if(valorDoEixo < 0)
        {
            return animacaoValorNegativo;
        }

        return "";
    },

   
});
module.exports = Personagem;
