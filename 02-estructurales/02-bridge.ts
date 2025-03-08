/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";


interface Ability {
    use(): void;
}


class SwordAttack implements Ability {
  use(): void {
    console.log(`Ataca con una %cespada`, COLORS.blue);
    
  }

}

class AxeAttack implements Ability {
    use(): void {
      console.log(`Ataca con una %chacha`, COLORS.red);
      
    }
  
  }
  


class MagicSpell implements Ability {
    use(): void {
      console.log(`Lanza un hechizo magico poderoso`, COLORS.green);
      
    }
  
}

class FireballSpell implements Ability {
  use(): void {
    console.log(`Lanza una bola de %cfuego`, COLORS.red);
    
  }

}


abstract class Character {
    protected ability: Ability

    constructor( ability: Ability ){
        this.ability = ability;
    }

    setAbility( ability: Ability):void {
        this.ability = ability;
    }

    abstract performAbility(): void;
}



class Warrior extends Character {

  override performAbility(): void {
    console.log(`El guerrero esta listo para luchar`);
    this.ability.use();
    
  }

}


class Mage extends Character {

    override performAbility(): void {
      console.log(`El Mago prepara su magia`);
      this.ability.use();
      
    }
  
}


function main (){
    const warrior = new Warrior( new SwordAttack() )
    warrior.performAbility();

    warrior.setAbility( new AxeAttack() )
    warrior.performAbility();


    const mage = new Mage( new MagicSpell());
    mage.performAbility();
    mage.setAbility( new FireballSpell());
    mage.performAbility();


}



main();