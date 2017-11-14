cc.Class({
    extends: cc.Component,

    properties: {
        inimigo : cc.Prefab,
        tempoParaGerar : cc.Float,

        _cronometro : cc.Float,
    },

    // use this for initialization
    onLoad: function () {
        this._cronometro = this.tempoParaGerar;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (deltaTime) {
        this._cronometro -= deltaTime;
        if(this._cronometro < 0)
        {
            let inimigo = cc.instantiate(this.inimigo);
            inimigo.parent = this.node.parent;
            inimigo.position = this.node.position;

            this._cronometro = this.tempoParaGerar;
        }
    },
});
