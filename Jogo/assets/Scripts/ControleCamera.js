cc.Class({
    extends: cc.Component,

    properties: {
        alvo : cc.Node,
    },

    update: function (deltaTime) {
        this.node.position = this.alvo.position;
    },
});
