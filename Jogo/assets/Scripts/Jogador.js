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
    onLoad: function () {

        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);

        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.atirar, this);

        this._audioDoTiro = this.getComponent(cc.AudioSource);
        
        this._camera = cc.find("Camera");
        this._animacao = this.getComponent(cc.Animation);
    },


    update: function (deltaTime) {
        this.verificaTeclas();
        this.mudaAnimacao();

        this._deltaTime = deltaTime;

        this.direcao = this.direcao.normalize();
        let deslocamento = this.direcao.mul(deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
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

    verificaTeclas : function()
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
