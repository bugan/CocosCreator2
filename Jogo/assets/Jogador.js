cc.Class({
    extends: cc.Component,

    properties: {
        direcao : cc.Vec2,
        velocidade : cc.Float,
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.direcao = this.direcao.normalize();

        let deslocamento = this.direcao.mul(dt * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },
    
    teclaPressionada : function(event)
    {
       
        if(event.keyCode == cc.KEY.w)
        {
            this.direcao.y = 1;
        }
         if(event.keyCode == cc.KEY.s)
        {
            this.direcao.y = -1;
        }
         if(event.keyCode == cc.KEY.a)
        {
            this.direcao.x = -1;
        }
         if(event.keyCode == cc.KEY.d)
        {
            this.direcao.x = 1;
        }
    },
    
    teclaSolta : function(event)
    {
        if(event.keyCode == cc.KEY.w)
        {
            this.direcao.y = 0;
        }
         if(event.keyCode == cc.KEY.s)
        {
            this.direcao.y = 0;
        }
         if(event.keyCode == cc.KEY.a)
        {
            this.direcao.x = 0;
        }
         if(event.keyCode == cc.KEY.d)
        {
            this.direcao.x = 0;
        }
    },
});
