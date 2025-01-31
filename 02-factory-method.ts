import { COLORS } from "../helpers/colors.ts";
/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */



interface Hamburger {
    prepare(): void;    
}


class ChickenHumburger implements Hamburger {
  
    prepare(): void {
        console.log(`Preparando una hambuger de %cpollo`, COLORS.yellow);
    }

}



class BeefHumburger implements Hamburger {
  
    prepare(): void {
        console.log(`Preparando una hambuger de %cres`, COLORS.red);
    }

}


class BeanHamburger implements Hamburger {
  prepare(): void {
    console.log(`Preparando una hambuger de %beans`, COLORS.brown);

    
  }


}


abstract class Restaurant {

    protected abstract createHamburguer(): Hamburger

    orderHambuger():void {
        const hamburger = this.createHamburguer();
        hamburger.prepare();
    }

}


class ChickengRestaurant extends Restaurant {
    override createHamburguer(): Hamburger {
      return new ChickenHumburger()
    }
}


class BeefRestaurant extends Restaurant {
    override createHamburguer(): Hamburger {
      return new BeefHumburger()
    }
}


class BeanRestaurant extends Restaurant {
  override createHamburguer(): Hamburger {
    return new BeanHamburger();
  }



}


function main(){
    let restaurant: Restaurant;

    const burgerType = prompt('Que tipo de hamburguesa quieres? ( chicken/beef/bean )')

    switch (burgerType) {
        case 'chicken':
            restaurant = new ChickengRestaurant();
            break;
        case 'beef':
            restaurant = new BeefRestaurant();
            break;
        case 'bean':
            restaurant = new BeanRestaurant();
            break
        default:
            throw new Error('Opcion no valida.');
    }

    restaurant.orderHambuger();


}



main()