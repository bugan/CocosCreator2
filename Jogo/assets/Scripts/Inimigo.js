let Personagem = require("Personagem");
cc.Class({
    extends: Personagem,

    properties: {
        alvo : cc.Node,
        distanciaDoAtaque : cc.Float,
        _distanciaAtual : cc.Float,
    },

    // use this for initialization
    onLoad: function (){
        this._super();
        this.node.on("foiAtingido", this.sofrerDano, this);

        this.alvo = cc.find("Personagens/Jogador");
     
    },

    sofrerDano : function()
    {
        this.node.destroy();
    },

    update: function (deltaTime) {
        this.direcao = this.alvo.position.sub(this.node.position);
        this._distanciaAtual = this.direcao.mag();

        if(this._distanciaAtual < this.distanciaDoAtaque)
        {
            this.alvo.emit("foiAtingido");   
        }
        else
        {
            this.movimentarInimigo(deltaTime);
        }
        
        this.mudaAnimacao();
        
        this._super(deltaTime);
    },
    movimentarInimigo : function(deltaTime)
    {
        this.direcao = this.direcao.normalize();
        let deslocamento = this.direcao.mul(deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);  
    },
});
