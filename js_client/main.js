var jeu = {
    scene : null,
    world : world,
    player : player,
    cursor : null,
    zombieTemplate : zombieTemplate
}

function preload(){
    jeu.scene = this;
    jeu.scene.load.image("tiles", "tilesheet.png");
    jeu.scene.load.tilemapTiledJSON("map", "JeuPlateforme3.json");
    jeu.scene.load.atlas("player", "player.png", "playerAtlas.json");
    jeu.scene.load.atlas("zombie", "zombie.png", "zombieAtlas.json");
    jeu.scene.load.image("spark", "particle.png");

    jeu.scene.load.audio("gemmeSound", "handleCoins2.ogg");
    jeu.scene.load.audio("battleMusic", "battleThemeA.ogg");
    jeu.scene.load.audio("game_over", "game_over.ogg");
    jeu.scene.load.audio("you_win", "you_win.ogg");
    jeu.scene.load.audio("you_lose", "you_lose.ogg");
    jeu.scene.load.audio("zombie", "zombie.ogg");

    jeu.scene.load.image("validation", "yellow_boxCheckmark.png");
    jeu.scene.load.image("panel", "yellow_panel.png");

    jeu.world.gameOver = false;
    jeu.player.isAlive = true;
}
function create(){
    jeu.world.initialiserWorld();
    jeu.player.initialiserPlayer();
    jeu.player.generatePlayerAnimations();
    jeu.zombieTemplate.generateZombieAnimations();

    jeu.zombieTemplate.createZombie(jeu.world.debutZombie1.x, jeu.world.debutZombie1.y, 100).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie2.x, jeu.world.debutZombie2.y, 150).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie3.x, jeu.world.debutZombie3.y, 300).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie4.x, jeu.world.debutZombie4.y, 100).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie5.x, jeu.world.debutZombie5.y, 300).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie6.x, jeu.world.debutZombie6.y, 150).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie7.x, jeu.world.debutZombie7.y, 300).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie8.x, jeu.world.debutZombie8.y, 100).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie9.x, jeu.world.debutZombie9.y, 150).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie10.x, jeu.world.debutZombie10.y, 150).initZombie();
    jeu.zombieTemplate.createZombie(jeu.world.debutZombie11.x, jeu.world.debutZombie11.y, 300).initZombie();
    jeu.world.gererCollider();
    jeu.cursor = jeu.scene.input.keyboard.createCursorKeys();
    jeu.world.gererCamera();

    console.log(jeu.scene.sound);
}
function update(time, delta){
    jeu.player.gererDeplacement();
    ajusterTailleEcran();
}

function ajusterTailleEcran(){
    var canvas = document.querySelector("canvas");

    var fenetreWidth = window.innerWidth;
    var fenetreHeight = window.innerHeight;
    var fenetreRatio = fenetreWidth / fenetreHeight;

    var jeuRatio = config.width / config.height;

    if(fenetreRatio < jeuRatio){
        canvas.style.width = fenetreWidth + "px";
        canvas.style.height = (fenetreWidth/jeuRatio) + "px";
    } else {
        canvas.style.width = (fenetreHeight * jeuRatio) + "px";
        canvas.style.height = fenetreHeight + "px";
    }
}