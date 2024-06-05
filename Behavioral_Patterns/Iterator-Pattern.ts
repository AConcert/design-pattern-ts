namespace Iterator_Pattern {
  // 迭代器模式
  // 聚合类
  interface Television {
    obj: string[];
    createIterator(): TVIterator;
  }
  // 迭代器
  interface TVIterator {
    setChannel(i: number): void;
    currentChannel(): string;
    next(): void;
    previous(): void;
    isLast(): boolean;
    isFirst(): boolean;
  }
  class TCLTelevision implements Television {
    obj: string[] = [
      "湖南卫视",
      "湖西卫视",
      "湖北卫视",
      "江苏卫视",
      "上海卫视",
    ];
    createIterator(): TVIterator {
      return new TCLIterator(this);
    }
  }
  class SonyTelevision implements Television {
    obj: string[] = [
      "CCTV1",
      "CCTV2",
      "CCTV3",
      "CCTV4",
      "CCTV5",
      "CCTV6",
      "CCTV7",
    ];
    createIterator(): TVIterator {
      return new SonyIterator(this);
    }
  }
  class TCLIterator implements TVIterator {
    private tv: Television;
    private cursor: number;
    constructor(tv: Television) {
      this.tv = tv;
      this.cursor = 0;
    }
    setChannel(i: number): void {
      this.cursor = i;
    }
    currentChannel(): string {
      return this.tv.obj[this.cursor];
    }
    next(): void {
      if (this.cursor < this.tv.obj.length) {
        this.cursor++;
      }
    }
    previous(): void {
      if (this.cursor > 0) {
        this.cursor--;
      }
    }
    isLast(): boolean {
      return this.cursor === this.tv.obj.length;
    }
    isFirst(): boolean {
      return this.cursor === 0;
    }
  }
  class SonyIterator implements TVIterator {
    private tv: Television;
    private cursor: number;
    constructor(tv: Television) {
      this.tv = tv;
      this.cursor = 0;
    }
    setChannel(i: number): void {
      this.cursor = i;
    }
    currentChannel(): string {
      return this.tv.obj[this.cursor];
    }
    next(): void {
      if (this.cursor < this.tv.obj.length) {
        this.cursor++;
      }
    }
    previous(): void {
      if (this.cursor > 0) {
        this.cursor--;
      }
    }
    isLast(): boolean {
      return this.cursor === this.tv.obj.length;
    }
    isFirst(): boolean {
      return this.cursor === 0;
    }
  }

  function display(tv: Television) {
    const tv_iterator: TVIterator = tv.createIterator();
    while (!tv_iterator.isLast()) {
      console.log(tv_iterator.currentChannel());
      tv_iterator.next();
    }
  }

  function reverseDisplay(tv: Television) {
    const tv_iterator: TVIterator = tv.createIterator();
    tv_iterator.setChannel(5);
    while (!tv_iterator.isFirst()) {
      tv_iterator.previous();
      console.log(tv_iterator.currentChannel());
    }
  }

  function clientCode() {
    const tv: Television = new SonyTelevision();
    // const tv: Television = new TCLTelevision();
    display(tv);
    console.log("-------------------");
    reverseDisplay(tv);
  }

  clientCode();
}
