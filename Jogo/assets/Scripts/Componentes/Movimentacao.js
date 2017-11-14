cc.Class({
    extends: cc.Component,

    properties: {
        _direcao : cc.Vec2,
        velocidade : cc.Float,
        _deltaTime: 0,
    },


    update: function (deltaTime) {
        this._deltaTime = deltaTime;
    },

    andarParaFrente : function(){

        let deslocamento = this._direcao.mul(this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);

    },

    andarParaTras: function(){
        let deslocamento = this._direcao.mul(-1 * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    setDirecao : function(novaDirecao){
        this._direcao = novaDirecao.normalize();
    }
});
