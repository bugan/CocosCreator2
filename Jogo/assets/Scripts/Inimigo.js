cc.Class({
    extends: cc.Component,

    properties: {
        alvo : cc.Node,
        velocidade : cc.Float,
        direcao : cc.Vec2,

        distanciaDoAtaque : cc.Float,

        _distanciaAtual : cc.Float,
        _deltaTime : cc.Float,

        _animacao : cc.Animation,

    },

    // use this for initialization
    onLoad: function (){
        this.node.on("foiAtingido", this.sofrerDano, this);

        this.alvo = cc.find("Personagens/Jogador");
        this._animacao = this.getComponent(cc.Animation);
    },

    sofrerDano : function()
    {
        this.node.destroy();
    },

    update: function (deltaTime) {
        this._deltaTime = deltaTime;
        this.direcao = this.alvo.position.sub(this.node.position);
        this._distanciaAtual = this.direcao.mag();

        if(this._distanciaAtual < this.distanciaDoAtaque)
        {
            this.alvo.emit("foiAtingido");   
        }
        else
        {
            this.movimentarInimigo();
        }
        
        this.mudaAnimacao();
    },
    movimentarInimigo : function()
    {
        this.direcao = this.direcao.normalize();
        let deslocamento = this.direcao.mul(deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);  
    },
    mudaAnimacao : function()
    {
        let proximaAnimacao = this.getAnimacaoParaDirecaoAtual();
        if(!this._animacao.getAnimationState(proximaAnimacao).isPlaying)
        {
            this._animacao.play(proximaAnimacao);
        }
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

    onCollisionStay : function(other)
    {
        if(other.node.group == "cenario")
        {
            this.voltarParaPosicaoDoUltimoFrame();
        }
    },

    voltarParaPosicaoDoUltimoFrame : function()
    {
        let deslocamento = this.direcao.mul(-1 * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

});
