namespace Composite_Pattern {
  // 安全组合模式：叶子对象可以用抽象构建 MyElement 声明，容器对象只能用容器构建 Plate 定义
  abstract class MyElement {
    abstract eat(): void;
  }
  class Apple extends MyElement {
    eat(): void {
      console.log("吃苹果");
    }
  }
  class Banana extends MyElement {
    eat(): void {
      console.log("吃香蕉");
    }
  }
  class Plate extends MyElement {
    private children: MyElement[] = [];
    add(child: MyElement) {
      this.children.push(child);
    }
    remove() {
      this.children.pop();
    }
    eat(): void {
      for (const child of this.children) {
        child.eat();
      }
    }
  }

  function clientCode() {
    const apple1: MyElement = new Apple();
    const apple2: MyElement = new Apple();
    const apple3: MyElement = new Apple();
    const banana1: MyElement = new Banana();
    const banana2: MyElement = new Banana();
    const banana3: MyElement = new Banana();
    const plate1: Plate = new Plate();
    const plate2: Plate = new Plate();
    plate1.add(apple2);
    plate1.add(banana2);
    plate1.add(banana3);
    plate2.add(apple1);
    plate2.add(apple3);
    plate2.add(banana1);
    plate2.add(plate1);
    // plate2.eat();
    plate1.eat();
  }

  clientCode();
}
