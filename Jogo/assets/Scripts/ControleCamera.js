cc.Class({
    extends: cc.Component,

    properties: {
        alvo : cc.Node,
        xMaximo : cc.Float,
        yMaximo : cc.Float,
        _resolucao : cc.Size,

    },

    // use this for initialization
    onLoad: function () {
        this._resolucao = cc.view.getVisibleSize();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.position = this.alvo.position;
        this.node.x = Math.max(0 + this._resolucao.width / 2, this.node.x);
        this.node.y = Math.max(0 + this._resolucao.height / 2, this.node.y);
        
        this.node.x = Math.min(this.xMaximo - this._resolucao.width / 2, this.node.x);
        this.node.y = Math.min(this.yMaximo - this._resolucao.height / 2, this.node.y);
    },
});
