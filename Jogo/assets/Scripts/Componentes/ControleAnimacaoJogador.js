cc.Class({
    extends: cc.Component,

    properties: {
        _animacao : cc.Animation,

    },

    onLoad: function () {
        this._animacao = this.getComponent(cc.Animation);
    },

    
    mudaAnimacao : function(direcao){
        let proximaAnimacao = this.escolheAnimacaoParaDirecaoAtual(direcao);
        proximaAnimacao = this.verificaAnimacaoParado(proximaAnimacao);
        
        if(!this.animacaoEstaTocando(proximaAnimacao)){
            this._animacao.play(proximaAnimacao);
        }
        
    },
    
    animacaoEstaTocando : function(proximaAnimacao){
        return this._animacao.getAnimationState(proximaAnimacao).isPlaying
    },
    
     escolheAnimacaoParaDirecaoAtual : function(direcao){
        let proximaAnimacao = "Andar";

        proximaAnimacao += this.escolheAnimacaoParaEixo(direcao.x, "Direita", "Esquerda");
        proximaAnimacao += this.escolheAnimacaoParaEixo(direcao.y, "Cima", "Baixo");
       
        return proximaAnimacao;
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
    
    verificaAnimacaoParado : function(proximaAnimacao){
        if(proximaAnimacao == "Andar"){
            return "Parado";
        }
        
        return proximaAnimacao;
    }
});
