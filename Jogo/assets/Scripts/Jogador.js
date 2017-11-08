cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
        xMaximo : cc.Float,
        yMaximo : cc.Float,

        tiro : cc.Prefab,

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
        
        
        this._camera = cc.find("Camera");
        this._animacao = this.getComponent(cc.Animation);
    },

    atirar : function(event)
    {
       
        let posicaoClick = event.getLocation();
        posicaoClick.x -= event.target.x;
        posicaoClick.y -= event.target.y;
        posicaoClick = new cc.Vec2(posicaoClick.x, posicaoClick.y);
        
        let posicaoJogador = this._camera.convertToNodeSpaceAR(this.node.position);
        
        let dir = posicaoClick.sub(posicaoJogador);
        
        let disparo = cc.instantiate(this.tiro);
        disparo.parent = this.node.parent;
        disparo.position = this.node.position;
        //acionamos o metodo init, passando a posição atual do tiro e o angulo do movimento
        disparo.getComponent("Tiro").init(dir);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.verificaTeclas();
        this.mudaAnimacao();

        this._deltaTime = dt;

        this.direcao = this.direcao.normalize();
        let deslocamento = this.direcao.mul(dt * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
        this.limitarPosicao();
    },

    onCollisionStay : function(other)
    {
        if(other.node.group == "cenario")
        {
            //Ao detectarmos a colisão precisamos voltar o jogador para a posição logo antes da colisão acontecer
            let deslocamento = this.direcao.mul(-1.05 * this._deltaTime * this.velocidade);
            this.node.position = this.node.position.add(deslocamento);

        }
    }, 


    limitarPosicao : function()
    {
        this.node.x = Math.max(0, this.node.x);  
        this.node.y = Math.max(0, this.node.y);

        this.node.x = Math.min(this.xMaximo, this.node.x);
        this.node.y = Math.min(this.yMaximo, this.node.y);
    },

    mudaAnimacao : function()
    {
        let anima = "Andar";

        if(this.direcao.x > 0)
        {
            anima += "Direita";
        }
        else if(this.direcao.x < 0)
        {
            anima += "Esquerda";
        }

        if(this.direcao.y > 0)
        {
            anima += "Cima";
        }
        else if(this.direcao.y < 0)
        {
            anima += "Baixo";
        }

        //Se não tivemos nenhuma alteração quer dizer que o jogador não apertou nenhuma tecla
        if(anima == "Andar")
        {
            anima = "Idle";
        }

        if(!this._animacao.getAnimationState(anima).isPlaying)
            this._animacao.play(anima);
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
