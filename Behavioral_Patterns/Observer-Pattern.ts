namespace Observer_Pattern {
  // 观察者模式
  // 抽象的观察目标
  abstract class MySubject {
    observers: MyObserver[];
    constructor() {
      this.observers = [];
    }
    attach(obs: MyObserver) {
      this.observers.push(obs);
    }
    detach(obs: MyObserver) {
      this.observers = this.observers.filter((observer) => obs === observer);
    }
    // 通知方法
    abstract cry(): void;
  }
  // 具体观察目标
  class Cat extends MySubject {
    cry(): void {
      console.log("猫叫了");
      for (const observer of this.observers) {
        observer.response();
      }
    }
  }
  // 抽象的观察者
  interface MyObserver {
    // 响应方法
    response(): void;
  }
  // 具体的观察者
  class Mouse implements MyObserver {
    response(): void {
      console.log("老鼠逃跑");
    }
  }
  class Dog implements MyObserver {
    response(): void {
      console.log("狗叫");
    }
  }
  function clientCode() {
    const cat = new Cat();
    const mouse = new Mouse();
    const dog = new Dog();
    cat.attach(mouse);
    cat.attach(dog);
    cat.cry();
  }
  clientCode();
}
