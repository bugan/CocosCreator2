let Teclado = require("Teclado");
cc.Class({
    extends: cc.Component,

    properties: {

        vivo : true,
        tiro : cc.Prefab,
        _movimentacao : null,
        _controleDeAnimacoes : null,
        _audioDoTiro : cc.AudioSource,
        _camera : cc.Camera,
        _canvas : cc.Canvas,

    },

    // use this for initialization
    onLoad: function ()
    {
        this._canvas = cc.find("Canvas");
        this._canvas.on("mousedown", this.atirar, this);
        this._canvas.on("mousemove", this.mudarDirecao, this);

        this.node.on("foiAtingido", this.sofrerDano, this);

        this._controleDeAnimacoes = this.getComponent("ControleAnimacaoJogador");
        this._movimentacao = this.getComponent("Movimentacao");
        this._audioDoTiro = this.getComponent(cc.AudioSource);
        this._camera = cc.find("Camera");

    },
    mudarDirecao : function(event){
        let posicaoDoClique = event.getLocation();
        posicaoDoClique = new cc.Vec2(posicaoDoClique.x, posicaoDoClique.y);
        posicaoDoClique = this._canvas.convertToNodeSpaceAR(posicaoDoClique);

        let posicaoDoJogador = this._camera.convertToNodeSpaceAR(this.node.position);

        let direcao = posicaoDoClique.sub(posicaoDoJogador);
        this._controleDeAnimacoes.mudaAnimacao(direcao);
    },
    update: function (deltaTime)
    {
        this.movimentaJogador();
        //this._controleDeAnimacoes.mudaAnimacao(this.calcularDirecao());
    },

    sofrerDano : function()
    {
        this.vivo = false;
    },

    movimentaJogador : function(deltaTime)
    {
        this._movimentacao.setDirecao(this.calcularDirecao());
        this._movimentacao.andarParaFrente();
    },


    atirar : function(event){
        let posicaoDoClique = event.getLocation();
        posicaoDoClique = new cc.Vec2(posicaoDoClique.x, posicaoDoClique.y);
        posicaoDoClique = this._canvas.convertToNodeSpaceAR(posicaoDoClique);

        let posicaoDoJogador = this._camera.convertToNodeSpaceAR(this.node.position);

        let direcao = posicaoDoClique.sub(posicaoDoJogador);

        let disparo = cc.instantiate(this.tiro);
        disparo.getComponent("Tiro").inicializa(this.node.parent, this.node.position, direcao);

        this._audioDoTiro.play();
    },

    calcularDirecao : function(){
        let direcao = cc.Vec2.ZERO;
        //console.log(Teclado.estaPressionada(cc.KEY.a));
        if(Teclado.estaPressionada(cc.KEY.a)){
            direcao.x -= 1;
        }

        if(Teclado.estaPressionada(cc.KEY.d)){
            direcao.x += 1;
        }

        if(Teclado.estaPressionada(cc.KEY.s)){
            direcao.y -= 1;   
        }

        if(Teclado.estaPressionada(cc.KEY.w)){
            direcao.y += 1;
        }

        direcao = direcao.normalize();

        return direcao;
    },

});
