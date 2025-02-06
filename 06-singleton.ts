/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
*/

import { COLORS } from "../helpers/colors.ts";




class DragonBalls {

    private static instance: DragonBalls;
    private ballsCollected: number = 0;


    private constructor() { 
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if(!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
            console.log('%cSe ha creado una instancia de DragonBalls', COLORS.cyan);
            
        }

        return DragonBalls.instance;
    }

    collectBall() {
        if( this.ballsCollected < 7 ) {
            this.ballsCollected++;
            console.log(`%cBola recolectada: ${this.ballsCollected}`, COLORS.blue);
            return;
        }

        console.log('%cYa tienes las 7 bolas de dragón', COLORS.red);
        
    }

    summonShenron() {
        if(this.ballsCollected === 7) {
            console.log('%cHas invocado a Shenron', COLORS.green);
            this.ballsCollected = 0;
            return;
        }

        console.log('%cNo puedes invocar a Shenron', COLORS.red);
    }

}



function main(){
    const goku = DragonBalls.getInstance();
    
    goku.collectBall();
    goku.collectBall();
    goku.collectBall();
    
    goku.summonShenron();

    const vegeta = DragonBalls.getInstance();
    vegeta.collectBall();
    vegeta.collectBall();
    vegeta.collectBall();
    vegeta.collectBall(); 

    goku.summonShenron();
    vegeta.summonShenron();

}


main();

