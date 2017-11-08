cc.Class({
    extends: cc.Component,

    properties: {
        alvo : cc.Node,
        velocidade : cc.Float,
        direcao : cc.Vec2,

        distanciaAtaque : cc.Float,

        _distanciaAtual : cc.Float,
        _gameOver : cc.Node,

    },

    // use this for initialization
    onLoad: function () {
        this._gameOver = cc.find("Canvas/GameOver");
        this.alvo = cc.find("Personagens/Jogador");
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        this.direcao = this.alvo.position.sub(this.node.position);

        this._distanciaAtual = this.direcao.mag();

        if(this._distanciaAtual < this.distanciaAtaque)
        {
            cc.director.pause();
            this.alvo.getComponent("Jogador").vivo = false;
            this._gameOver.active = true;
            
            
            
            
        }
        else
        {
            this.direcao = this.direcao.normalize();
            let deslocamento = this.direcao.mul(dt * this.velocidade);
            this.node.position = this.node.position.add(deslocamento);

        }


    },


});
