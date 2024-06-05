namespace Memento_Pattern {
  // 备忘录模式/Token标记模式
  // 源发器 Originator：创建备忘录，调用备忘录的方法
  class UserInfoDTO {
    private account: string;
    private password: string;
    private telNo: string;
    constructor(account: string, password: string, telNo: string) {
      this.account = account;
      this.password = password;
      this.telNo = telNo;
    }
    getAccount() {
      return this.account;
    }
    setAccount(account: string) {
      this.account = account;
    }
    getPassword() {
      return this.password;
    }
    setPassword(password: string) {
      this.password = password;
    }
    getTelNo() {
      return this.telNo;
    }
    setTelNo(telNo: string) {
      this.telNo = telNo;
    }
    saveMemento(): ReadOnlyMemento {
      return new Memento(this.account, this.password, this.telNo);
    }
    restoreMemento(user: ReadOnlyMemento) {
      this.account = user.getAccount();
      this.password = user.getPassword();
      this.telNo = user.getTelNo();
    }
    show() {
      console.log(
        `用户名：[${this.account}],密码：[${this.password}],电话:[${this.telNo}]`
      );
    }
  }
  interface ReadOnlyMemento {
    getAccount(): string;
    getPassword(): string;
    getTelNo(): string;
  }
  // 备忘录，只能被源发器改动，客户端不能直接访问和修改备忘录对象
  class Memento {
    private account: string;
    private password: string;
    private telNo: string;
    constructor(account: string, password: string, telNo: string) {
      this.account = account;
      this.password = password;
      this.telNo = telNo;
    }
    getAccount() {
      return this.account;
    }
    getPassword() {
      return this.password;
    }
    getTelNo() {
      return this.telNo;
    }
  }
  // 负责人：保存和管理备忘录，不对备忘录的内容进行操作，可以有多个备忘录。这样，Originator 对象就不需要关心如何保存和管理 Memento 对象，可以专注于自己的主要职责。
  class Caretaker {
    private memento: ReadOnlyMemento;
    constructor(memento: ReadOnlyMemento) {
      this.memento = memento;
    }
    setMemento(memento: ReadOnlyMemento) {
      this.memento = memento;
    }
    getMemento() {
      return this.memento;
    }
  }
  function clientCode() {
    const user = new UserInfoDTO("sean", "sean", "12345678");
    console.log("更改状态前");
    user.show();
    console.log("---------------");
    const c = new Caretaker(user.saveMemento());
    user.setAccount("claire");
    user.setTelNo("188888888");
    console.log("更改状态后");
    user.show();
    console.log("---------------");
    console.log("恢复状态");
    user.restoreMemento(c.getMemento());
    user.show();
  }
  clientCode();
}
