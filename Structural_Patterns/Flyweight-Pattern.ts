namespace Flyweight_Pattern {
  // 享元模式，有外部状态
  interface NetworkDevice {
    getType(): String;
    // port 为外部状态
    use(port: Port): void;
  }

  class Switch implements NetworkDevice {
    private type: string;
    constructor(type: string) {
      this.type = type;
    }
    getType(): String {
      return this.type;
    }
    use(port: Port): void {
      console.log(`端口号 ${port.getPort()} 使用 switch '${this.type}'`);
    }
  }

  class Hub implements NetworkDevice {
    private type: string;
    constructor(type: string) {
      this.type = type;
    }
    getType(): String {
      return this.type;
    }
    use(port: Port): void {
      console.log(`端口号 ${port.getPort()} 使用 集线器 '${this.type}'`);
    }
  }

  class Port {
    private port: string;
    constructor(port: string) {
      this.port = port;
    }
    getPort() {
      return this.port;
    }
  }

  class NetworkDeviceFactory {
    private devices: NetworkDevice[] = [];
    private totalTerminal: number = 0;
    constructor() {
      const switchDevice = new Switch("cisco-test-device");
      const hubDevice = new Hub("TP-LINK-test");
      this.devices.push(switchDevice);
      this.devices.push(hubDevice);
    }
    getNetWorkDevice(type: string): NetworkDevice {
      this.totalTerminal++;
      const device = this.devices.find((device: NetworkDevice) =>
        device.getType().includes(type)
      );
      if (!device) {
        throw Error("没有这个设备，联系老板购买");
      }
      return device;
    }
    getTotalDevice() {
      return this.devices.length;
    }
    getTotalTerminal() {
      return this.totalTerminal;
    }
  }

  function clientCode() {
    let nd1: NetworkDevice;
    let nd2: NetworkDevice;
    let nd3: NetworkDevice;
    let nd4: NetworkDevice;
    let nd5: NetworkDevice;
    const ndFactory = new NetworkDeviceFactory();
    nd1 = ndFactory.getNetWorkDevice("cisco");
    nd1.use(new Port("1000"));
    nd2 = ndFactory.getNetWorkDevice("cisco");
    nd2.use(new Port("1001"));
    nd3 = ndFactory.getNetWorkDevice("TP-LINK");
    nd3.use(new Port("1002"));
    nd4 = ndFactory.getNetWorkDevice("TP-LINK");
    nd4.use(new Port("1003"));
    nd5 = ndFactory.getNetWorkDevice("cisco");
    nd5.use(new Port("1004"));
    console.log("-------------------------");
    console.log("终端总数:", ndFactory.getTotalTerminal());
    console.log("设备总数:", ndFactory.getTotalDevice());
  }

  clientCode();
}
