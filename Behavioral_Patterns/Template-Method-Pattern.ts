namespace Template_Method_Pattern {
  // 模板方法模式
  // 抽象类
  abstract class BankTemplateMethod {
    // 具体方法（公共行为）
    takeNumber() {
      console.log("取号排队");
    }
    // 抽象方法
    abstract transact(): void;
    // 具体方法（公共行为）
    evaluate() {
      console.log("反馈评分");
    }
    // 模板方法，定义了具体的执行顺序
    process() {
      this.takeNumber();
      this.transact();
      this.evaluate();
    }
    // 钩子方法
    complaints() {}
  }
  // 具体子类
  class Deposit extends BankTemplateMethod {
    transact() {
      console.log("存款");
    }
  }
  class Withdraw extends BankTemplateMethod {
    transact() {
      console.log("取款");
    }
  }
  class Transfer extends BankTemplateMethod {
    transact() {
      console.log("转账");
    }
  }
  function clientCode() {
    let bank: BankTemplateMethod = new Deposit();
    bank.process();
    console.log("-------------");
    bank = new Withdraw();
    bank.process();
    console.log("-------------");
    bank = new Transfer();
    bank.process();
  }
  clientCode();
}
