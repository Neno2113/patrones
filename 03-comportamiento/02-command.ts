/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";



interface Command {
    execute():void;
}



class Light {
    
    turnOn():void {
        console.log('%cLight is on', COLORS.yellow);
    }

    turnOff():void {
        console.log('%cLight is off', COLORS.red);
    }
}



class Fan {
    
    On():void {
        console.log('%Fan is on', COLORS.violet);
    }

    Off():void {
        console.log('%Fan is off', COLORS.red);
    }
}



// Commands

class LightOnCommand implements Command{
    
    constructor( private light: Light) {
    }
  
    execute(): void {
        this.light.turnOn();
    }

}


class LightOffCommand implements Command{
    
    constructor( private light: Light) {
    }
  
    execute(): void {
        this.light.turnOff();
    }
}



class FanOnCommand implements Command{
    
    constructor( private fan: Fan ) {
    }
  
    execute(): void {
        this.fan.On();
    }
}


class FanOffCommand implements Command{
    
    constructor( private fan: Fan ) {
    }
  
    execute(): void {
        this.fan.Off();
    }
}


class RemoteControl {

    private commands: Record<string, Command> = {};


    setCommand( button: string, command: Command){
        this.commands[button] = command;
    }

    pressButton( button: string){
        if( this.commands[button]){
            this.commands[button].execute();
            return;
        }

        console.log('%cButton not found', COLORS.red);
        
    }
}



function main(){
    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan();

    // Commands
    const lightOnCommand = new LightOnCommand(light);
    const lightOffCommand = new LightOffCommand(light);
    const fanOnCommand = new FanOnCommand(fan);
    const fanOffCommand = new FanOffCommand(fan);

    // Set commands
    remoteControl.setCommand('1', lightOnCommand);
    remoteControl.setCommand('2', lightOffCommand);
    remoteControl.setCommand('3', fanOnCommand);
    remoteControl.setCommand('4', fanOffCommand);


    // Press buttons
    let continueProgram = true;
    do {
        console.clear();
        const pressedButton = prompt(`
            Commands:
            1. Light On
            2. Light Off
            3. Fan On
            4. Fan Off
            5. Exit    
        `,) ?? '';
        
        remoteControl.pressButton(pressedButton);
        
        const continueProgramResponse = prompt('\n Do you want to continue? (y/n)') ?? '';
        if( continueProgramResponse.toLowerCase() !== 'y'){
            continueProgram = false;
            break;
        }

    } while (continueProgram);
}



main();