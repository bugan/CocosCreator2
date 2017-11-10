let Personagem = cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,

        _animacao : cc.Animation,
        _deltaTime : cc.Float,
    },

    // use this for initialization
    onLoad: function () {

        this._animacao = this.getComponent(cc.Animation);
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
        let proximaAnimacao = this.getAnimacaoParaDirecaoAtual();

        if(!this.animacaoEstaTocando(proximaAnimacao))
        {
            this._animacao.play(proximaAnimacao);
        }
    },

    animacaoEstaTocando : function(proximaAnimacao)
    {
        return this._animacao.getAnimationState(proximaAnimacao).isPlaying
    },

    getAnimacaoParaDirecaoAtual : function()
    {
        let proximaAnimacao = "Andar";

        proximaAnimacao += this.escolheAnimacaoParaEixo(this.direcao.x, "Direita", "Esquerda");
        proximaAnimacao += this.escolheAnimacaoParaEixo(this.direcao.y, "Cima", "Baixo");

        proximaAnimacao = this.verificaAnimacaoParado(proximaAnimacao);

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

    verificaAnimacaoParado : function(nomeProximaAnimacao)
    {
        if(nomeProximaAnimacao == "Andar")
        {
            return "Parado";
        }

        return nomeProximaAnimacao;
    },
});
module.exports = Personagem;
