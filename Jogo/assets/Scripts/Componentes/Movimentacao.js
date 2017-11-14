cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
        _deltaTime: 0,
    },


    update: function (deltaTime) {
        this._deltaTime = deltaTime;
    },

    andarParaFrente : function(){

        let deslocamento = this.direcao.mul(this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);

    },

    andarParaTras: function(){
        let deslocamento = this.direcao.mul(-1 * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    setDirecao : function(novaDirecao){
        this.direcao = novaDirecao.normalize();
    }
});
