cc.Class({
    extends: cc.Component,

    properties: {
        
        _animacao : cc.Animation,
    },

    onLoad: function () {
        this._animacao = this.getComponent(cc.Animation);
    },

    animacaoEstaTocando : function(proximaAnimacao){
        return this._animacao.getAnimationState(proximaAnimacao).isPlaying
    },

    mudaAnimacao : function(direcao, estadoAtual){
        let proximaAnimacao = estadoAtual;
        proximaAnimacao += this.escolheAnimacaoParaDirecaoAtual(direcao);
        if(!this.animacaoEstaTocando(proximaAnimacao)){
            this._animacao.play(proximaAnimacao);
        }
    },

    escolheAnimacaoParaDirecaoAtual : function(direcao){
        let stringDirecao = "";
        stringDirecao += this.escolheAnimacaoParaEixo(direcao.x, "Direita", "Esquerda");
        stringDirecao += this.escolheAnimacaoParaEixo(direcao.y, "Cima", "Baixo");
       
        return stringDirecao;
    },
    
    escolheAnimacaoParaEixo : function(valorDoEixo, animacaoValorPositivo, animacaoValorNegativo){
        if(valorDoEixo > 0){
            return animacaoValorPositivo;
        }

        if(valorDoEixo < 0){
            return animacaoValorNegativo;
        }

        return "";
    },
});
