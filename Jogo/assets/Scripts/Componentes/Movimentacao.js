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
    
    andar: function(sentido){
        let deslocamento = this._direcao.mul(sentido * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },
    
    andarParaFrente : function(){
        this.andar(1);
    },

    andarParaTras: function(){
        this.andar(-1);
    },

    setDirecao : function(novaDirecao){
        this._direcao = novaDirecao.normalize();
    }
});
