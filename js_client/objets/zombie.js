var zombieTemplate = {
    createZombie : function(posX, posY, range){
        var zombie = {
            aZombie : null,

            initZombie : function(){
                this.aZombie = jeu.scene.physics.add.sprite(posX, posY, "zombie", "zombie_stand");
                this.aZombie.setOrigin(0,1);
                this.gererDeplacement();
                this.gererCollide();
            },
            gererDeplacement : function(){
                this.aZombie.anims.play("zombieWalk");
                var tween = jeu.scene.tweens.add({
                    targets : this.aZombie,
                    x : posX + range,
                    ease : "Linear",
                    duration : 1000 * range / 100,
                    yoyo : true,
                    repeat : -1,
                    onStart : function (){},
                    onComplete : function (){},
                    onYoyo : function (tween){tween.targets[0].flipX = !tween.targets[0].flipX},
                    onRepeat : function (tween){tween.targets[0].flipX = !tween.targets[0].flipX}
                });
            },
            gererCollide : function(){
                jeu.scene.physics.add.collider(this.aZombie, jeu.world.worldLayer);
                jeu.scene.physics.add.overlap(jeu.player.aPlayer, this.aZombie, this.attackZombie);
            },
            attackZombie : function(player, zombie){
                if(jeu.player.isJumping){
                    jeu.scene.sound.play("zombie");
                    zombie.destroy();
                } else {
                    jeu.world.killPlayer();
                }
            }
        }
        return zombie;
    },
    generateZombieAnimations : function(){
        jeu.scene.anims.create ({
            key : "zombieWalk",
            frames : jeu.scene.anims.generateFrameNames("zombie", {prefix: "zombie_walk", start:1, end:2}),
            frameRate : 5,
            repeat : -1 
        });
    },
}

