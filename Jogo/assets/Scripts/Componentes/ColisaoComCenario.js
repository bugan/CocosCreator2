cc.Class({
    extends: cc.Component,

    properties: {
        _deltaTime : cc.Float,
        _movimentacao : null,
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },

    update: function (deltaTime) {
        this._deltaTime = deltaTime;
    },

    onCollisionStay : function(other)
    {
        if(other.node.group == "cenario")
        {
            this._movimentacao.andarParaTras();
        }
    },
});
