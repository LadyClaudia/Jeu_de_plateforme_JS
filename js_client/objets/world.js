var world = {
    gameName : null,
    tilemap : null,
    tileset : null,
    downLayer : null,
    worldLayer : null,
    topLayer : null,
    overlapLayer : null,
    positionDebut : null,
    positionFin : null,
    score : 0,
    scoreText : null,
    gameOver : false,
    debutZombie1 : null,
    debutZombie2 : null,
    debutZombie3 : null,

    initialiserWorld : function(){
        this.tilemap = jeu.scene.make.tilemap({key : "map"});
        this.tileset = this.tilemap.addTilesetImage("tilesheet", "tiles");
        this.downLayer = this.tilemap.createStaticLayer("bot", this.tileset, 0,0);
        this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset, 0,0);
        this.topLayer = this.tilemap.createStaticLayer("top", this.tileset, 0,0);
        this.overlapLayer = this.tilemap.createDynamicLayer("overlap", this.tileset, 0,0);

        this.positionDebut = this.tilemap.findObject("Objects", obj => obj.name === "debut");
        this.positionFin = this.tilemap.findObject("Objects", obj => obj.name === "fin");

        this.debutZombie1 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie1");
        this.debutZombie2 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie2");
        this.debutZombie3 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie3");
        this.debutZombie4 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie4");
        this.debutZombie5 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie5");
        this.debutZombie6 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie6");
        this.debutZombie7 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie7");
        this.debutZombie8 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie8");
        this.debutZombie9 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie9");
        this.debutZombie10 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie10");
        this.debutZombie11 = this.tilemap.findObject("Objects", obj => obj.name === "debutZombie11");
        this.worldLayer.setCollisionByProperty({Collides : true});

        this.music = jeu.scene.sound.add("battleMusic");
        this.music.loop = true;
        this.music.play();

        jeu.scene.physics.world.setBounds(0,0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);

        var policeTitre = {
            fontSize : "25px",
            color : "#000000",
            fontFamily : "Permanent Marker"
        }
        this.scoreText = jeu.scene.add.text (16, 16, "Score : 0", policeTitre);
        this.scoreText.setScrollFactor(0);

        this.gameName = jeu.scene.add.text (600, 16, "Thanin's world", policeTitre);
        this.gameName.setScrollFactor(0);
    },

    gererCollider : function(){
        this.overlapLayer.setTileIndexCallback(50, this.collectGemme, this);
        this.overlapLayer.setTileIndexCallback(52, this.collectGemme, this);
        this.overlapLayer.setTileIndexCallback(71, this.killPlayer, this);
        this.overlapLayer.setTileIndexCallback(76, this.finlevel, this);
        this.overlapLayer.setTileIndexCallback(90, this.finlevel, this);
        jeu.scene.physics.add.collider(jeu.player.aPlayer, this.worldLayer);
        jeu.scene.physics.add.overlap(jeu.player.aPlayer, this.overlapLayer);
    },

    finlevel : function(player, tile){
        if(player.x > this.positionFin.x - 2 && player.x < this.positionFin.x + 2){
            if(!this.gameOver){
                this.gameOver = true;
                jeu.player.killPlayer();
                jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y, "panel").setScale(5,3);
                var restartBouton = jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y+100, "validation").setInteractive();
                restartBouton.on("pointerup", function(){
                    jeu.scene.scene.restart();
                });

                jeu.scene.sound.play("you_win");
                this.score = 0;
                this.music.stop();

                var policeTitre = {
                    fontSize : "40px",
                    color : "#000000",
                    fontFamily : "Permanent Marker"
                }
                jeu.scene.add.text (jeu.scene.cameras.main.midPoint.x-200, jeu.scene.cameras.main.midPoint.y-100, "Thanin is the BEST ! \n \nRestart ?", policeTitre);
            }
        };
    },

    gererCamera : function(){
        jeu.scene.cameras.main.startFollow(jeu.player.aPlayer);
        jeu.scene.cameras.main.setBounds(0,0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    },

    collectGemme : function(player, tile){
        jeu.scene.sound.play("gemmeSound");
        this.genererParicules(tile.getCenterX(), tile.getCenterY());
        this.addScoreGemme(tile.properties.item);
        this.scoreText.setText("Score : " + this.score);
        this.overlapLayer.removeTileAt(tile.x, tile.y).destroy();
    },

    addScoreGemme : function(item){
        if(item === "gemmeVerte"){
            this.score += 5;
        } else if(item === "gemmeBleu"){
            this.score += 10;
        }
    },

    genererParicules : function(posX, posY){
        var particules = jeu.scene.add.particles("spark");

        var configParticules = {
            x : posX,
            y : posY,
            speed : 200,
            angle : {min : 180, max : 360},
            lifeSpan : {min : 300, max : 400},
            scale :{start : 0.1, end : 0.1},
            blendMode : "ADD"
        }

        var emitter = particules.createEmitter(configParticules);

        jeu.scene.time.delayedCall(300 , function(){
            particules.destroy();
        })
    },

    killPlayer : function(){
        if(!this.gameOver){
            this.gameOver = true;
            jeu.player.killPlayer();
            jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y, "panel").setScale(5,3);
            var restartBouton = jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y+100, "validation").setInteractive();
            restartBouton.on("pointerup", function(){
                jeu.scene.scene.restart();
            });

            jeu.scene.sound.play("you_lose");
            this.score = 0;
            this.music.stop();

            var policeTitre = {
                fontSize : "40px",
                color : "#000000",
                fontFamily : "Permanent Marker"
            }
            jeu.scene.add.text (jeu.scene.cameras.main.midPoint.x-145, jeu.scene.cameras.main.midPoint.y-100, "Oh no... \nThanin is dead... \n \nRestart ?", policeTitre);
        };
    }
}