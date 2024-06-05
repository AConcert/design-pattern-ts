namespace Strategy_Pattern {
  // 策略模式
  // 环境类
  class ArrayHandler {
    sortObj?: Sort;
    setSort(sortObj: Sort): void {
      this.sortObj = sortObj;
    }
    sort(arr: number[]): number[] {
      return this.sortObj?.sort(arr) || [];
    }
  }
  // 抽象策略类
  interface Sort {
    sort(arr: number[]): number[];
  }
  // 具体策略类
  class BubbleSort implements Sort {
    sort(arr: number[]): number[] {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            // Swap elements
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      console.log("BubbleSort");
      return arr;
    }
  }
  // 具体策略类
  class SelectionSort implements Sort {
    sort(arr: number[]): number[] {
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
          if (arr[j] < arr[min]) {
            min = j;
          }
        }
        if (min !== i) {
          let temp = arr[i];
          arr[i] = arr[min];
          arr[min] = temp;
        }
      }
      console.log("SelectionSort");
      return arr;
    }
  }
  // 具体策略类
  class InsertionSort implements Sort {
    sort(arr: number[]): number[] {
      for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = current;
      }
      console.log("InsertionSort");
      return arr;
    }
  }

  function clientCode(sort: Sort, arr: number[]): void {
    const arrayHandler = new ArrayHandler();
    arrayHandler.setSort(sort); //设置具体策略
    console.log(arrayHandler.sort(arr));
  }

  clientCode(new BubbleSort(), [3, 2, 1]);
}
