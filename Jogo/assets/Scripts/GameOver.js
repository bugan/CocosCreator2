cc.Class({
    extends: cc.Component,

    properties: {
        _jogador : cc.Component,
        _gameOver: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        cc.director.resume();
        
        let jogador = cc.find("Personagens/Jogador");
 
        this._jogador = jogador.getComponent("Jogador");
        this._gameOver = cc.find("Canvas/GameOver");
        
        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.clicou, this);
    },

    update: function (deltaTime) {
        if(!this._jogador.vivo)
        {
            cc.director.pause();
            this._gameOver.active = true;
        }
    },

    clicou : function(event)
    {
        if(!this._jogador.vivo)
        {
            cc.director.loadScene("Jogo");
        }
    },
});
