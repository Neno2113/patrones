/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";



// Interface

class Player {

    name: string;
    lavel: number;

    constructor(name: string, level: number ) {
        this.name = name;
        this.lavel = level;
    }
}


interface Room {
    enter( player: Player ): void;
}




class SecretRoom implements Room {

    enter( player: Player ): void {
        console.log( `${ player.name } entra en la sala secreta` );
        console.log( `Un gran enemigo te espera.` );
    }
}




// Proxy

class MagicPortal  implements Room{
    
    private secreRoom: Room;

    constructor( room: Room ) {
        this.secreRoom = room;
    }

  
    enter(player: Player): void {
        if(player.lavel >= 10) {
            this.secreRoom.enter(player);
            return;
        }

        console.log( `${ player.name } no tiene el nivel suficiente para entrar en la sala secreta` );
    }

}



function main() {

    const portal = new MagicPortal( new SecretRoom() );
    const player = new Player('Jhon', 5);
    const player2 = new Player('Anel', 15);

    console.log(`%cPlayer 1 intenta entrar al portal`, COLORS.blue);
    portal.enter(player);

    console.log(`%cPlayer 2 intenta entrar al portal`, COLORS.blue);
    portal.enter(player2);
}


main();

