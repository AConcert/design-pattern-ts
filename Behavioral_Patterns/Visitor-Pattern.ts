namespace Visitor_Pattern {
  // 访问者模式
  // 抽象访问者
  abstract class Department {
    abstract visit(employee: FulltimeEmployee): void;
    abstract visit(employee: PartimeEmployee): void;
  }
  // 具体访问者
  class FADepartment extends Department {
    visit(employee: FulltimeEmployee | PartimeEmployee): void {
      if (employee instanceof FulltimeEmployee) {
        let workTime = employee.getWorkTime();
        let weeklyWage = employee.getWeeklyWage();
        if (workTime > 40) {
          weeklyWage += (workTime - 40) * 100;
        } else if (workTime < 40) {
          weeklyWage -= (40 - workTime) * 80;
          if (weeklyWage < 0) {
            weeklyWage = 0;
          }
        }
        console.log(
          "正式员工：" + employee.getName() + "，实际工资：" + weeklyWage
        );
      } else if (employee instanceof PartimeEmployee) {
        let workTime = employee.getWorkTime();
        let hourWage = employee.getHourWage();
        console.log(
          "临时工：" + employee.getName() + "，实际工资：" + workTime * hourWage
        );
      }
    }
  }
  // 具体访问者
  class HRDepartment extends Department {
    visit(employee: FulltimeEmployee | PartimeEmployee): void {
      if (employee instanceof FulltimeEmployee) {
        let workTime = employee.getWorkTime();
        console.log(
          "正式员工：" + employee.getName() + "，工作时间：" + workTime + "小时"
        );
        if (workTime > 40) {
          console.log(
            "正式员工：" +
              employee.getName() +
              "，加班时间：" +
              (workTime - 40) +
              "小时"
          );
        } else if (workTime < 40) {
          console.log(
            "正式员工：" +
              employee.getName() +
              "，请假时间：" +
              (40 - workTime) +
              "小时"
          );
        }
      } else if (employee instanceof PartimeEmployee) {
        let workTime = employee.getWorkTime();
        console.log(
          "临时工：" + employee.getName() + "，工作时间：" + workTime + "小时"
        );
      }
    }
  }
  // 抽象元素
  interface Employee {
    accept(handler: Department): void;
  }
  // 具体元素
  class FulltimeEmployee implements Employee {
    private name: string;
    private weeklyWage: number;
    private workTime: number;
    constructor(name: string, weeklyWage: number, workTime: number) {
      this.name = name;
      this.weeklyWage = weeklyWage;
      this.workTime = workTime;
    }
    getName(): string {
      return this.name;
    }
    getWorkTime(): number {
      return this.workTime;
    }
    getWeeklyWage(): number {
      return this.weeklyWage;
    }
    accept(handler: Department): void {
      handler.visit(this);
    }
  }
  // 具体元素
  class PartimeEmployee implements Employee {
    private name: string;
    private hourWage: number;
    private workTime: number;
    constructor(name: string, hourWage: number, workTime: number) {
      this.name = name;
      this.hourWage = hourWage;
      this.workTime = workTime;
    }
    getName(): string {
      return this.name;
    }
    getWorkTime(): number {
      return this.workTime;
    }
    getHourWage(): number {
      return this.hourWage;
    }
    accept(handler: Department): void {
      handler.visit(this);
    }
  }

  function clientCode(): void {
    const fadepartment = new FADepartment();
    const hrdepartment = new HRDepartment();

    const employee1 = new FulltimeEmployee("张三", 3200, 45);
    const employee2 = new PartimeEmployee("李四", 20, 40);
    employee1.accept(fadepartment);
    employee1.accept(hrdepartment);
    employee2.accept(fadepartment);
    employee2.accept(hrdepartment);
  }

  clientCode();
}
