namespace Command_Pattern {
  // 命令模式/Action模式/Transaction事务模式
  interface AbstractCommand {
    execute: () => void;
  }
  // 请求发送者
  class Controller {
    private openCommand: AbstractCommand;
    private closeCommand: AbstractCommand;
    private changeCommand: AbstractCommand;
    constructor(
      openCommand: AbstractCommand,
      closeCommand: AbstractCommand,
      changeCommand: AbstractCommand
    ) {
      {
        this.openCommand = openCommand;
        this.closeCommand = closeCommand;
        this.changeCommand = changeCommand;
      }
    }
    open() {
      this.openCommand.execute();
    }
    close() {
      this.closeCommand.execute();
    }
    change() {
      this.changeCommand.execute();
    }
  }
  // 请求接受者
  class Television {
    open() {
      console.log("开电视机");
    }
    close() {
      console.log("关电视机");
    }
    changeChannel() {
      console.log("切换频道");
    }
  }
  class TVOpenCommand implements AbstractCommand {
    private television: Television;
    constructor(television: Television) {
      this.television = television;
    }
    execute() {
      this.television.open();
    }
  }
  class TVCloseCommand implements AbstractCommand {
    private television: Television;
    constructor(television: Television) {
      this.television = television;
    }
    execute() {
      this.television.close();
    }
  }
  class TVChangeCommand implements AbstractCommand {
    private television: Television;
    constructor(television: Television) {
      this.television = television;
    }
    execute() {
      this.television.changeChannel();
    }
  }

  function clientCode() {
    const tv = new Television();
    const controller = new Controller(
      new TVOpenCommand(tv),
      new TVCloseCommand(tv),
      new TVChangeCommand(tv)
    );
    controller.open();
    controller.close();
    controller.change();
  }

  clientCode();
}
