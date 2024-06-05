namespace Adapter_Pattern_Class {
  //类适配器，适配器更独立和易于扩展
  interface Robot {
    speak(): void;
    walk(): void;
  }

  class Dog {
    voice(): void {
      console.log("汪汪汪");
    }
    action(): void {
      console.log("跑起来");
    }
  }
  class Bird {
    voice() {
      console.log("叽叽叽");
    }
    action() {
      console.log("飞起来");
    }
  }

  class DogAdapter extends Dog implements Robot {
    speak(): void {
      super.voice();
    }
    walk(): void {
      super.action();
    }
  }

  class BirdAdapter extends Bird implements Robot {
    speak(): void {
      super.voice();
    }
    walk(): void {
      super.action();
    }
  }

  function clientCode(adapter: new () => Robot) {
    const robot = new adapter();
    console.log(`机器人模仿${robot.constructor.name}说话。。。`);
    robot.speak();
    console.log(`机器人模仿${robot.constructor.name}走路。。。`);
    robot.walk();
  }

  clientCode(DogAdapter); // 机器人模仿DogAdapter说话。。。汪汪汪
  clientCode(BirdAdapter); // 机器人模仿BirdAdapter说话。。。叽叽叽

  /**
   * new () => Robot 是一个特殊的类型，被称为构造签名。
   * 这个类型表示一个构造函数，这个构造函数可以被调用来创建一个
   * 新的 Robot 对象。
   * 在这个例子中，adapter: new () => Robot 表示 adapter 是一个构造函数，
   * 这个构造函数没有参数，并且返回一个 Robot 对象。你可以使用 new adapter() 来创建一个新的 Robot 对象。

    它允许你传入一个类，然后在函数内部创建这个类的新实例。在这个例子中，clientCode 函数接受一个 Robot 类型的构造函数，然后创建一个新的 Robot 对象，并让这个对象模仿动物的行为。
   */
}

namespace Adapter_Pattern_Object {
  //对象适配器，适配器更统一，关联对象的方式适用范围更广
  interface Robot {
    speak(): void;
    walk(): void;
  }
  // 模仿体
  abstract class MimicBody {
    abstract voice(): void;
    abstract action(): void;
  }

  class Dog extends MimicBody {
    voice(): void {
      console.log("汪汪汪");
    }
    action(): void {
      console.log("跑起来");
    }
  }
  class Bird extends MimicBody {
    voice() {
      console.log("叽叽叽");
    }
    action() {
      console.log("飞起来");
    }
  }

  class Adapter implements Robot {
    private mimicBody: MimicBody;
    constructor(mimicBody: MimicBody) {
      this.mimicBody = mimicBody;
    }
    speak(): void {
      this.mimicBody.voice();
    }
    walk(): void {
      this.mimicBody.action();
    }
  }

  function clientCode(mimicBody: MimicBody) {
    const robot = new Adapter(mimicBody);
    console.log(`机器人模仿${robot.constructor.name}说话。。。`);
    robot.speak();
    console.log(`机器人模仿${robot.constructor.name}走路。。。`);
    robot.walk();
  }

  clientCode(new Dog()); //机器人模仿Adapter走路。。。跑起来
  clientCode(new Bird()); //机器人模仿Adapter走路。。。飞起来
}
