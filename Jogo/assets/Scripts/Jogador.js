cc.Class({
    extends: cc.Component,

    properties: {
        vivo : true,

        direcao : cc.Vec2,
        velocidade : cc.Float,
        xMaximo : cc.Float,
        yMaximo : cc.Float,

        tiro : cc.Prefab,

        _audioDoTiro : cc.AudioSource,
        _animacao : cc.Animation,
        _camera : cc.Camera,
        _deltaTime : cc.Float,
        _teclado : {
            default: [],
            type: cc.Float,
        },
    },

    // use this for initialization
    onLoad: function ()
    {

        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);

        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.atirar, this);
        
        this.node.on("foiAtingido", this.sofrerDano, this);

        this._audioDoTiro = this.getComponent(cc.AudioSource);

        this._camera = cc.find("Camera");
        this._animacao = this.getComponent(cc.Animation);
    },

    update: function (deltaTime)
    {
        this.ajustarDirecao();
        this.mudaAnimacao();
        this.movimentaJogador(deltaTime);

        this._deltaTime = deltaTime;
    },

    onCollisionStay : function(other)
    {
        if(other.node.group == "cenario")
        {
            this.voltarParaPosicaoDoUltimoFrame()
        }
    }, 
    
    sofrerDano : function()
    {
        this.vivo = false;
    },
    
    movimentaJogador : function(deltaTime)
    {

        let deslocamento = this.direcao.mul(deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    voltarParaPosicaoDoUltimoFrame : function()
    {
        let deslocamento = this.direcao.mul(-1 * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    atirar : function(event)
    {
        let posicaoDoClique = event.getLocation();
        posicaoDoClique.x -= event.target.x;
        posicaoDoClique.y -= event.target.y;
        posicaoDoClique = new cc.Vec2(posicaoDoClique.x, posicaoDoClique.y);

        let posicaoDoJogador = this._camera.convertToNodeSpaceAR(this.node.position);

        let direcao = posicaoDoClique.sub(posicaoDoJogador);

        let disparo = cc.instantiate(this.tiro);
        disparo.getComponent("Tiro").inicializa(this.node.parent, this.node.position, direcao);

        this._audioDoTiro.play();
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

    ajustarDirecao : function()
    {
        this.direcao = cc.Vec2.ZERO;

        if(this.estaPressionada(cc.KEY.a))
        {
            this.direcao.x -= 1;
        }
        if(this.estaPressionada(cc.KEY.d))
        {
            this.direcao.x += 1;
        }
        if(this.estaPressionada(cc.KEY.s))
        {
            this.direcao.y -= 1;
        }
        if(this.estaPressionada(cc.KEY.w))
        {
            this.direcao.y += 1;
        }

        this.direcao = this.direcao.normalize();
    },

    estaPressionada : function(tecla)
    {
        if(this._teclado.indexOf(tecla) != -1)
        {
            return true;
        }
        return false;
    },

    teclaPressionada : function(event)
    {
        if(this._teclado.indexOf(event.keyCode) == -1)
        {
            this._teclado.push(event.keyCode);
        }
    },

    teclaSolta : function(event)
    {
        let index = this._teclado.indexOf(event.keyCode);
        this._teclado.splice(index, 1);
    },
});
