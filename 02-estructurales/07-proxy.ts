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
    
    private secreRoom: SecretRoom;

    constructor( room: SecretRoom ) {
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

