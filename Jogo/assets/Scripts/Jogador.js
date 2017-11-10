let Personagem = require("Personagem");
cc.Class({
    extends: Personagem,

    properties: {
        vivo : true,

        tiro : cc.Prefab,

        _audioDoTiro : cc.AudioSource,
        _camera : cc.Camera,
        _teclado : {
            default: [],
            type: cc.Float,
        },
    },

    // use this for initialization
    onLoad: function ()
    {
        this._super();
        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);

        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.atirar, this);
        
        this.node.on("foiAtingido", this.sofrerDano, this);

        this._audioDoTiro = this.getComponent(cc.AudioSource);

        this._camera = cc.find("Camera");
       
    },

    update: function (deltaTime)
    {
        this._super(deltaTime);
        this.ajustarDirecao();
        this.mudaAnimacao();
        this.movimentaJogador(deltaTime);
        
        
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
