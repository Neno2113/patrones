import { Logger } from 'jsr:@deno-library/logger';





interface LoggerAdapter {
    file: string;
    writeLog(message: string): void;
    writeWarning(message: string): void;
    writeError(message: string): void;
}



export class DenoLoggerAdapterImpl implements LoggerAdapter {

  public file: string;
  private logger = new Logger();

  constructor(file: string){
    this.file = file;
  }

  writeLog(message: string): void {
    this.logger.info(`[${ this.file} Log] ${message}`);
  }
  writeWarning(message: string): void {
    this.logger.warn(`[${ this.file} warning] ${message}`);
  }
  writeError(message: string): void {
    this.logger.error(`[${ this.file} error] ${message}`);
  }

}


