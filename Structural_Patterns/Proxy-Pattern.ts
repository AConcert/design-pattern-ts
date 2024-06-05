namespace Proxy_Pattern {
  // 代理模式
  interface AbstractPermission {
    modifyUserInfo(): void;
    viewNote(): void;
    publishNote(): void;
    modifyNote(): void;
    setLevel(level: number): void;
  }

  class RealPermission implements AbstractPermission {
    modifyNote(): void {
      console.log("可以改帖子");
    }
    viewNote(): void {
      console.log("可以读帖子");
    }
    publishNote(): void {
      console.log("可以发帖子");
    }
    modifyUserInfo(): void {
      console.log("可以更改用户信息");
    }
    setLevel(level: number): void {}
  }

  class ProxyPermission implements AbstractPermission {
    private realPermission: AbstractPermission;
    private level;
    constructor() {
      this.realPermission = new RealPermission();
      this.level = 0;
    }
    modifyUserInfo(): void {
      if (this.level >= 1) {
        this.realPermission.modifyUserInfo();
      } else {
        console.log("没有修改用户信息权限");
      }
    }
    viewNote(): void {
      this.realPermission.viewNote();
    }
    publishNote(): void {
      if (this.level >= 1) {
        this.realPermission.publishNote();
      } else {
        console.log("没有修改发帖权限");
      }
    }
    modifyNote(): void {
      if (this.level >= 1) {
        this.realPermission.modifyNote();
      } else {
        console.log("没有更改帖子权限");
      }
    }
    setLevel(level: number): void {
      this.level = level;
    }
  }

  function clientCode() {
    const proxyPermission = new ProxyPermission();
    proxyPermission.modifyNote();
    proxyPermission.modifyUserInfo();
    proxyPermission.publishNote();
    proxyPermission.viewNote();
    console.log("---------------------");
    proxyPermission.setLevel(1);
    proxyPermission.modifyNote();
    proxyPermission.modifyUserInfo();
    proxyPermission.publishNote();
    proxyPermission.viewNote();
  }

  clientCode();
}
