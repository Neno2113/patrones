/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";


class Projector {
    turnOn(){
        console.log('Proyector encendido');
    }

    turnoOff(){
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on(){
        console.log('Sistema de sonido encendido');
    }


    off(){
        console.log('Sistema de sonido apagado');
    }
}


class videoPlayer {

    on(){
        console.log('Reproductor de video encendido');
    }
    play(movie: string){
        console.log(`Reproduciendo %c${movie}`, COLORS.green);
    }

    stop(){
        console.log('Video detenido');
    }

    off(){
        console.log('Reproductor de video apagado');
    }
}


class PopcornMaker {

    poppingPopCorn(){
        console.log('Haciendo palomitas');
    }


    stop(){
        console.log('Palomitas listas');
    }
}

interface HomeTheaerFacadeOptions {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: videoPlayer;
    popcornMaker: PopcornMaker;
}


class HomeTheaerFacade {

    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: videoPlayer;
    private popcornMaker: PopcornMaker;

    constructor({
        projector,
        soundSystem,
        videoPlayer,
        popcornMaker
    }: HomeTheaerFacadeOptions){
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker;
    }


    watchMovie(movie: string){
        console.log(`Viendo la película %c${movie}`, COLORS.green);
        
        this.projector.turnOn();
        this.soundSystem.on();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);
        this.popcornMaker.poppingPopCorn();

        console.log('%cDisfrutando de la película', COLORS.blue);
        
    }

    endWatchingMovie(movie: string){
        console.log(`\n \nTerminando la %c${movie}`, COLORS.red);
        
        this.projector.turnoOff();
        this.soundSystem.off();
        this.videoPlayer.off();
        this.videoPlayer.off();
        this.popcornMaker.stop();

        console.log('%Todo apagado', COLORS.violet);
        
    }



}



function main(){

    const homeTheater = new HomeTheaerFacade({
        projector: new Projector(),
        soundSystem: new SoundSystem(),
        videoPlayer: new videoPlayer(),
        popcornMaker: new PopcornMaker()
    });

    homeTheater.watchMovie('The Lord of the Rings');
    homeTheater.endWatchingMovie('The Lord of the Rings');

}



main();