cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
    },

    // use this for initialization
    onLoad: function () {

    },

    init : function(dir)
    {
        this.direcao = dir.normalize();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let deslocamento = this.direcao.mul(dt * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    onCollisionEnter : function(other)
    {
        console.log(other);
        if(other.node.group == "inimigo")
        {
            other.node.destroy();
        }
        
        this.node.destroy();
    }
});
