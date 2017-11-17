cc.Class({
    extends: cc.Component,

    properties: {
        utilizarLimitesDaJanela : false,
        posicaoMaxima : cc.Vec2,
        posicaoMinima : cc.Vec2,
    },


    onLoad: function () {
        let resolucao = cc.view.getVisibleSize();

        let metadeDaLarguraDaTela = resolucao.width / 2;
        let metadeDaAlturaDaTela = resolucao.height / 2;

        if(this.utilizarLimitesDaJanela)
        {
            this.posicaoMaxima.x -= metadeDaLarguraDaTela;
            this.posicaoMinima.x += metadeDaLarguraDaTela;
            
            this.posicaoMaxima.y -= metadeDaAlturaDaTela;
            this.posicaoMinima.y += metadeDaAlturaDaTela;
        }

    },

    update: function (deltaTime) {

        if(this.node.x < this.posicaoMinima.x)
        {
            this.node.x = this.posicaoMinima.x;
        }
        else if(this.node.x > this.posicaoMaxima.x)
        {
            this.node.x = this.posicaoMaxima.x;
        }

        if(this.node.y < this.posicaoMinima.y)
        {
            this.node.y = this.posicaoMinima.y;
        }
        else if(this.node.y > this.posicaoMaxima.y)
        {
            this.node.y = this.posicaoMaxima.y;
        }
    },
    
});
