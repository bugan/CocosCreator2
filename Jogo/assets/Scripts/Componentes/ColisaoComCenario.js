cc.Class({
    extends: cc.Component,

    properties: {
        _movimentacao : null,
    },

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },

    onCollisionStay : function(other)
    {
        if(other.node.group == "cenario")
        {
            this._movimentacao.andarParaTras();
        }
    },
});
