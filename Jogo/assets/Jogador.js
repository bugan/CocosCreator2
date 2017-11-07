cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
        _teclado : {default: [],
                    type: cc.Float,
                   }
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.verificaTeclas();

        this.direcao = this.direcao.normalize();
        let deslocamento = this.direcao.mul(dt * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    verificaTeclas : function()
    {
        this.direcao = cc.Vec2.ZERO;
        
        if(this.estaPressionada(cc.KEY.a))
        {
            this.direcao.x -= 1;
        }
        if(this.estaPressionada(cc.KEY.d))
        {
            this.direcao.x += 1;
        }
        if(this.estaPressionada(cc.KEY.s))
        {
            this.direcao.y -= 1;
        }
        if(this.estaPressionada(cc.KEY.w))
        {
            this.direcao.y += 1;
        }
    },

    estaPressionada : function(tecla)
    {
        if(this._teclado.indexOf(tecla) != -1)
        {
            return true;
        }
        return false;
    },

    teclaPressionada : function(event)
    {
        if(this._teclado.indexOf(event.keyCode) == -1)
        {
            this._teclado.push(event.keyCode);
        }
    },

    teclaSolta : function(event)
    {
        let index = this._teclado.indexOf(event.keyCode);
        this._teclado.splice(index, 1);
    },
});
