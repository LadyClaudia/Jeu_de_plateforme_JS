var player = {
    aPlayer : null,
    isJumping : false,
    isAlive : true,

    initialiserPlayer : function(){
        this.aPlayer = jeu.scene.physics.add.sprite(jeu.world.positionDebut.x, jeu.world.positionDebut.y, "player", "adventurer_stand");
        this.aPlayer.setCollideWorldBounds(true);
        this.aPlayer.setOrigin(0.5,1);
    },

    generatePlayerAnimations : function(){
        jeu.scene.anims.create ({
            key : "playerWalk",
            frames : jeu.scene.anims.generateFrameNames("player", {prefix: "adventurer_walk", start:1, end:2}),
            frameRate : 5,
            repeat : -1 
        });
        jeu.scene.anims.create ({
            key : "playerIdle",
            frames : [{key : "player", frame : "adventurer_stand"},{key : "player", frame : "adventurer_idle"}],
            frameRate : 2,
            repeat : -1 
        });
    },

    gererDeplacement : function(){
        if(this.isAlive){
            if(jeu.cursor.left.isDown){
                this.aPlayer.setVelocityX(-200);
                this.aPlayer.setFlip(true, false);
            }else if(jeu.cursor.right.isDown){
                this.aPlayer.setVelocityX(200);
                this.aPlayer.setFlip(false, false);
            } else {
                this.aPlayer.setVelocityX(0);
            }

            if(jeu.cursor.up.isDown && this.aPlayer.body.onFloor()){
                this.isJumping = true;
                this.aPlayer.setVelocityY(-450);
            }

            if(this.aPlayer.body.onFloor()){
                this.isJumping = false;
            } else {
                this.isJumping = true;
            }

            if(this.isJumping){
                this.aPlayer.setTexture("player", "adventurer_jump");
            } else {
                if(jeu.cursor.left.isDown){
                    this.aPlayer.anims.play("playerWalk", true);
                }else if(jeu.cursor.right.isDown){
                    this.aPlayer.anims.play("playerWalk", true);
                } else {
                    this.aPlayer.anims.play("playerIdle", true);
                }
            }
        } else {
            this.aPlayer.setVelocityX(0);
        }
        
    },

    killPlayer : function(){
        jeu.scene.sound.play("game_over");
        this.aPlayer.setTexture("player", "adventurer_hurt");
        this.isAlive = false;
    }
}