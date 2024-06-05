namespace Facade_Pattern {
  // 外观模式
  class Light {
    position: String;
    constructor(position: string) {
      this.position = position;
    }
    on() {
      console.log(`开${this.position}的灯`);
    }
    off() {
      console.log(`关${this.position}的灯`);
    }
  }
  class Fan {
    on() {
      console.log("开风扇");
    }
    off() {
      console.log("关风扇");
    }
  }
  class AirConditioner {
    on() {
      console.log("开空调");
    }
    off() {
      console.log("关空调");
    }
  }
  class Television {
    on() {
      console.log("开电视");
    }
    off() {
      console.log("关电视");
    }
  }
  class GeneralSwitchFacade {
    lights: Light[] = [];
    fan: Fan;
    airConditioner: AirConditioner;
    television: Television;
    constructor() {
      const light1 = new Light("东面");
      const light2 = new Light("西面");
      const light3 = new Light("南面");
      const light4 = new Light("北面");
      this.lights.push(light1);
      this.lights.push(light2);
      this.lights.push(light3);
      this.lights.push(light4);
      this.fan = new Fan();
      this.airConditioner = new AirConditioner();
      this.television = new Television();
    }
    on() {
      this.fan.on();
      this.airConditioner.on();
      this.television.on();
      this.lights.forEach((light: Light) => light.on());
    }
    off() {
      this.fan.off();
      this.airConditioner.off();
      this.television.off();
      this.lights.forEach((light: Light) => light.off());
    }
  }

  function clientCode() {
    const generalSwitchFacade = new GeneralSwitchFacade();
    generalSwitchFacade.on();
    console.log("----------------------------");
    generalSwitchFacade.off();
  }

  clientCode();
}
