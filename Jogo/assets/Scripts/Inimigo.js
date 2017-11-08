cc.Class({
    extends: cc.Component,

    properties: {
        alvo : cc.Node,
        velocidade : cc.Float,
        direcao : cc.Vec2,

        distanciaAtaque : cc.Float,

        _distanciaAtual : cc.Float,
        _gameOver : cc.Node,
        _deltaTime : cc.Float,

    },

    // use this for initialization
    onLoad: function () {
        this._gameOver = cc.find("Canvas/GameOver");
        this.alvo = cc.find("Personagens/Jogador");
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._deltaTime = dt;
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

    onCollisionStay : function(other)
    {
        if(other.node.group == "cenario")
        {
            //Ao detectarmos a colisão precisamos voltar o jogador para a posição logo antes da colisão acontecer
            let deslocamento = this.direcao.mul(-1.05 * this._deltaTime * this.velocidade);
            this.node.position = this.node.position.add(deslocamento);

        }
    }, 

});
