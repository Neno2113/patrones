/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";


class CodeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsavedChanges: boolean;

    constructor(content: string, cursorPosition: number, unsavedChanges: boolean) {
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsavedChanges = unsavedChanges;
        
    }

    displayState(){
        console.log(`%cEstado del editor`, COLORS.green);
        console.log(`
            Contenido: ${this.content}
            Posición del cursor: ${this.cursorPosition}
            Cambios sin guardar: ${this.unsavedChanges}
        `);
    }

    copyWith({
        content,
        cursorPosition,
        unsavedChanges
    }: Partial<CodeEditorState>) : CodeEditorState{
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsavedChanges ?? this.unsavedChanges
        )
    }

}



class CodeEditorHistory {

    private history: CodeEditorState[] = [];
    private currentStateIndex = -1;


    save(state: CodeEditorState): void{
        if( this.currentStateIndex < this.history.length - 1){
            this.history = this.history.slice(0, this.currentStateIndex + 1);
        }

        this.history.push(state);
        this.currentStateIndex++;
    }

    redo(): CodeEditorState | null{
        if(this.currentStateIndex < this.history.length - 1){
            this.currentStateIndex++;
            return this.history[this.currentStateIndex];
        }

        return null;
    }

    undo(): CodeEditorState | null{
        if(this.currentStateIndex > 0){
            this.currentStateIndex--;
            return this.history[this.currentStateIndex];

        }

        return null;
    }
}



function main(){

    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState('const a = 1;', 12, false);

    history.save(editorState);

    console.log(`%cEstado inicial`, COLORS.green);
    editorState.displayState();


    editorState = editorState.copyWith({content: 'const a = 2;', unsavedChanges: true});
    history.save(editorState);

    console.log(`%cDespues del primer cambio`, COLORS.green);
    editorState.displayState();

    console.log(`%cDespues de mover el cursor`, COLORS.green);
    editorState = editorState.copyWith({cursorPosition: 2 });
    history.save(editorState);
    editorState.displayState();


    console.log(`%cDespues del Undo`, COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();

    
    console.log(`%cDespues del Redo`, COLORS.blue);
    editorState = history.redo()!;
    editorState.displayState();



}



main();