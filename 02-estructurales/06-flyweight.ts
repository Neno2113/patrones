/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";

// ! Ejemplo

interface Location {
    display( coordinates: { x: number, y: number}): void;
}

// Flyweight
class LocationIcon implements Location {

    private type: string;
    private iconImage: string;

    constructor(type: string, iconImage: string) {
        this.type = type;
        this.iconImage = iconImage;
    }

    display(coordinates: { x: number; y: number; }): void {
        console.log(`Coords: ${this.type} at ${coordinates.x} and ${coordinates.y} with icon %c[${this.iconImage}]`, COLORS.green);
    }
}



// Flyweight Factory
class LocationIconFactory {

    private icons: Record<string, LocationIcon> = {};

    getLocationIcon(type: string): LocationIcon {
        if( !this.icons[type]){
            console.log(`%cCreating a new instance of ${type} icon`, COLORS.red);
            const iconImage = `icon-${type}.png`;
            this.icons[type] = new LocationIcon(type, iconImage);
        }

        return this.icons[type];
    }

}


class MapLocation {

    private coordinates: { x: number, y: number };
    private icon:LocationIcon;

    constructor(icon: LocationIcon, x: number, y: number, ) {
        this.coordinates = { x, y };
        this.icon = icon;
    }

    display(): void {
        this.icon.display(this.coordinates);
    }
}


function main(){

    const factory = new LocationIconFactory();

    const locations = [
        new MapLocation(factory.getLocationIcon('hospital'), 10, 20),
        new MapLocation(factory.getLocationIcon('hospital'), 20, 30),
        new MapLocation(factory.getLocationIcon('restaurant'), 30, 40),
        new MapLocation(factory.getLocationIcon('restaurant'), 40, 50),
        new MapLocation(factory.getLocationIcon('hospital'), 50, 60),
        new MapLocation(factory.getLocationIcon('restaurant'), 60, 70),
        new MapLocation(factory.getLocationIcon('park'), 70, 80),
        new MapLocation(factory.getLocationIcon('school'), 70, 80),
    ];


    locations.forEach( location => location.display() );
}




main();