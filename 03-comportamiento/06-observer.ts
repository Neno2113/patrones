/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";



interface Observer {
    notify(videoTitle: string): void;
}


class YoutubeChannel {

    private subscribers: Observer[] = [];
    private name: String;

    constructor(name: string){
        this.name = name;
    }

    subscribe(observer: Observer): void {

        this.subscribers.push(observer);
        console.log(`%cNuevo Subspcriptor al canal ${this.name}`, COLORS.green);
        
    }

    unsubscribe(observer: Observer): void {
        this.subscribers = this.subscribers.filter( sub => sub !== observer );

        console.log(`%cUn subcriptor se ha dado de baja ${this.name}`, COLORS.red);
        
    }

    uploadVideo( videoTitle: string): void{
        console.log(`Canal ${this.name } ha subido un nuevo video %c${ videoTitle}`, COLORS.green);

        for (const subscribers of this.subscribers) {
            subscribers.notify(videoTitle);
        }
        
    }
}



class Subscriber implements Observer {

    private name: string;

    constructor(name: string){
        this.name = name;
    }

    notify(videoTitle: string): void {
      console.log(`%c${ this.name} ha sido notificado: %cNuevo video ${videoTitle}`, COLORS.blue, COLORS.yellow);
      
    }
}


function main (){

    const channel = new YoutubeChannel('Cocinando con Anel');

    const melissa =  new Subscriber('Melisa');
    const cesar =  new Subscriber('cesar');
    const emin =  new Subscriber('Emin');


    channel.subscribe( melissa );
    channel.subscribe( cesar );

    channel.uploadVideo('Receta de tamales de Angular');

    console.log(`\n\n`);

    channel.subscribe(emin);

    channel.uploadVideo('Receta de React al pastor');

    channel.unsubscribe(cesar);

    channel.uploadVideo('Receta de Vue de choclo');

    

}


main();