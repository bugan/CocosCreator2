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
            this.alvo.getComponent("Jogador").vivo = false;   
        }
        else
        {
            this.direcao = this.direcao.normalize();
            let deslocamento = this.direcao.mul(deltaTime * this.velocidade);
            this.node.position = this.node.position.add(deslocamento);
        }
        this.mudaAnimacao();
    },
    
    mudaAnimacao : function()
    {
        let proximaAnimacao = "Andar";

        if(this.direcao.x > 0)
        {
            proximaAnimacao += "Direita";
        }
        else if(this.direcao.x < 0)
        {
            proximaAnimacao += "Esquerda";
        }

        if(this.direcao.y > 0)
        {
            proximaAnimacao += "Cima";
        }
        else if(this.direcao.y < 0)
        {
            proximaAnimacao += "Baixo";
        }

        //Se não tivemos nenhuma alteração quer dizer que o jogador não apertou nenhuma tecla
        if(proximaAnimacao == "Andar")
        {
            proximaAnimacao = "Parado";
        }

        if(!this._animacao.getAnimationState(proximaAnimacao).isPlaying)
        {
            this._animacao.play(proximaAnimacao);
        }
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
