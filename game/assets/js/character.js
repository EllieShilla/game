
class Character extends Phaser.Scene {

    CharAnimation() {
        const speed = 60;

        if (!cursors || !girl)
            return;

        if (cursors.left.isDown) {
            girl.anims.play('girl-go-side', true);
            girl.setVelocity(-speed, 0);

            girl.scaleX = -1;
            girl.body.offset.x = 23;
        }
        else if (cursors.right.isDown) {
            girl.anims.play('girl-go-side', true);
            girl.setVelocity(speed, 0);
            girl.scaleX = 1;
            girl.body.offset.x = 8;
        }
        else if (cursors.up.isDown) {
            girl.anims.play('girl-go-up', true);
            girl.setVelocity(0, -speed);
        }
        else if (cursors.down.isDown) {
            girl.anims.play('girl-go-down', true);
            girl.setVelocity(0, speed);
        }
        else {
            if(girl.anims.currentAnim['key']!='girl-faint'){
                const parts = girl.anims.currentAnim['key'].split('-');
                parts[1] = 'stop';
                girl.play(parts.join('-'));
                girl.setVelocity(0, 0);
            }
            
        }

        return girl;
    }

    characterAttac() {

        if (!cursors || !girl)
        return;

        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            
                girl.anims.play('girl-go-up', true);
                girl.setVelocity(0, -500);
        }


        // if (pointer.isDown) {
        //     const parts = girl.anims.currentAnim['key'].split('-');
        //     if (parts[2] == 'up') {
        //         girl.anims.play('girl-go-up', true);
        //         girl.setVelocity(0, -500);
        //     }
        //     else if (parts[2] == 'down') {
        //         girl.anims.play('girl-go-down', true);
        //         girl.setVelocity(0, 500);
        //     }
        //     else if (parts[2] == 'side') {
        //         if (girl.scaleX == 1) {
        //             girl.anims.play('girl-go-side', true);
        //             girl.setVelocity(500, 0);
        //             girl.body.offset.x = 8;
        //         }
        //         else {
        //             girl.anims.play('girl-go-side', true);
        //             girl.setVelocity(-500, 0);
        //             girl.body.offset.x = 23;
        //         }
        //     }
        // }
        // return girl;
    }

    dinoAnimation(enemy) {
        const speed = 60;

        if (enemy.body['center']['x'] == 200) {
            enemy.anims.play('dino-go', true);
            enemy.setVelocity(-speed, 0);
            enemy.scaleX = -1;
            enemy.body.offset.x = 16;
        }
        else if (enemy.body['center']['x'] == 100) {
            enemy.anims.play('dino-go', true);
            enemy.setVelocity(speed, 0);
            enemy.scaleX = 1;
            enemy.body.offset.x = 0;
        }




        return enemy;
    }

    dinoAttac(enemy) {
        const speed = 60;

        if (girl.body['center']['x'] + 20 == enemy.body['center']['x']) {

            enemy.anims.play('dino-go', true);
            enemy.setVelocity(-speed, 0);
            enemy.scaleX = -1;
            enemy.body.offset.x = 16;
        }
        else if (girl.body['center']['x'] - 20 == enemy.body['center']['x']) {
            enemy.anims.play('dino-go', true);
            enemy.setVelocity(speed, 0);

            enemy.scaleX = 1;
            enemy.body.offset.x = 0;
        }
        else if(girl.body['center']['x']  == enemy.body['center']['x']&&girl.body['center']['y']  < enemy.body['center']['y']){
            enemy.anims.play('dino-go', true);
            enemy.setVelocity(0, -speed);
        }
        else if(girl.body['center']['x']  == enemy.body['center']['x']&&girl.body['center']['y']  > enemy.body['center']['y']){
            enemy.anims.play('dino-go', true);
            enemy.setVelocity(0, speed);
        }
        
        if(Math.floor(girl.body['center']['x'])  == Math.floor(enemy.body['center']['x'])&&Math.floor(girl.body['center']['y'])  == Math.floor(enemy.body['center']['y']))
        {
            count++;
        }

        if(count==3){
            girl.anims.play('girl-faint', true);
            died=true;
        }

    }
}