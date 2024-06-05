namespace Bridge_Pattern {
  //桥接模式的难点就是识别出不同的变化维度
  //如从两个不同的数据源读取数据并解析成不同的格式
  //当存在两个不同时可以考虑桥接模式
  // 颜料
  interface Pigment {
    // 着色
    bePaint(penType: string, topic: string): void;
  }
  class Blank implements Pigment {
    bePaint(penType: string, topic: string): void {
      console.log(`${penType}黑色的${topic}.`);
    }
  }
  class Red implements Pigment {
    bePaint(penType: string, topic: string): void {
      console.log(`${penType}红色的${topic}.`);
    }
  }
  abstract class Pen {
    protected pigment: Pigment;
    constructor(pigment: Pigment) {
      this.pigment = pigment;
    }
    abstract draw(topic: string): void;
  }

  class smallPen extends Pen {
    draw(topic: string): void {
      this.pigment.bePaint("小号笔绘制", topic);
    }
  }

  class bigPen extends Pen {
    draw(topic: string): void {
      this.pigment.bePaint("大号笔绘制", topic);
    }
  }

  function clientCode(pigment: Pigment) {
    const pen = new smallPen(pigment);
    pen.draw("圆形");
    const pen2 = new bigPen(pigment);
    pen2.draw("方形");
  }

  clientCode(new Red());
  clientCode(new Blank());
}
