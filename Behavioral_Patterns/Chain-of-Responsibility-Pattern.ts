namespace Chain_of_Responsibility {
  // 职责链模式
  // 请假 request 类
  class LeaveRequest {
    leaveName: string;
    leaveDays: number;
    constructor(leaveName: string, leaveDays: number) {
      this.leaveName = leaveName;
      this.leaveDays = leaveDays;
    }
    setLeaveName(leaveName: string) {
      this.leaveName = leaveName;
    }
    setLeaveDays(leaveDays: number) {
      this.leaveDays = leaveDays;
    }
    getLeaveName() {
      return this.leaveName;
    }
    getLeaveDays() {
      return this.leaveDays;
    }
  }

  abstract class Leader {
    name: string;
    // 下一家审批人
    successor?: Leader;
    constructor(name: string) {
      this.name = name;
    }
    setSuccessor(successor: Leader) {
      this.successor = successor;
    }
    abstract handleRequest(request: LeaveRequest);
  }

  class Director extends Leader {
    constructor(name: string) {
      super(name);
    }
    handleRequest(request: LeaveRequest) {
      if (request.getLeaveDays() < 3) {
        console.log(
          `主任[${
            this.name
          }]批准了[${request.getLeaveName()}]的[${request.getLeaveDays()}]天假`
        );
      } else {
        this.successor?.handleRequest(request);
      }
    }
  }

  class Manager extends Leader {
    constructor(name: string) {
      super(name);
    }
    handleRequest(request: LeaveRequest) {
      if (request.getLeaveDays() < 10) {
        console.log(
          `经理[${
            this.name
          }]批准了[${request.getLeaveName()}]的[${request.getLeaveDays()}]天假`
        );
      } else {
        this.successor?.handleRequest(request);
      }
    }
  }

  class GeneralManager extends Leader {
    constructor(name: string) {
      super(name);
    }
    handleRequest(request: LeaveRequest) {
      if (request.getLeaveDays() < 20) {
        console.log(
          `总经理[${
            this.name
          }]批准了[${request.getLeaveName()}]的[${request.getLeaveDays()}]天假`
        );
      } else {
        console.log(
          `请[${request.getLeaveDays()}]天假，[${request.getLeaveName()}]是不是不想干了`
        );
      }
    }
  }

  function clientCode() {
    let director: Director = new Director("Sean");
    let manager: Manager = new Manager("Claire");
    let generalManager: GeneralManager = new GeneralManager("Anan");
    // 建链
    director.setSuccessor(manager);
    manager.setSuccessor(generalManager);
    let leaveRequest = new LeaveRequest("小王", 20);
    director.handleRequest(leaveRequest);
    let leaveRequest2 = new LeaveRequest("小张", 2);
    director.handleRequest(leaveRequest2);
    let leaveRequest3 = new LeaveRequest("小李", 10);
    director.handleRequest(leaveRequest3);
  }

  clientCode();
}
