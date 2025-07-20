// #_promiseState adding '#' before any data member or method means that
// data member or method of the class is private

// enum for promise states
const promiseStateEnum = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #_promiseState = promiseStateEnum.PENDING;
  #_promiseSuccessHandlers = [];
  #_resolveValue = undefined;
  #_rejectReason = undefined;
  #_promiseFailuresHandlers = [];
  #_finallyCallbackHandler = undefined;
  // the following has been added so that if both resolve and reject are called only one is run, and if reject is called first then only catch runs with 'reason' runs and resolve does not, keeping resolveValue state as undefined only
  #_hasResolveOrRejectAlreadyRun = false;

  constructor(executor) {
    executor(this.#_resolve.bind(this), this.#_reject.bind(this));
  }

  #_resolve(value) {
    // if already either resolve or reject has run in the past (promise is not pending) then return
    // as only one of then should run even if both called
    if (this.#isPromiseSettled()) return;

    if (this.#_promiseState === promiseStateEnum.FULFILLED) return;

    this.#_promiseState = promiseStateEnum.FULFILLED;
    this.#_resolveValue = value;
    this.#_hasResolveOrRejectAlreadyRun = true;

    // call all the _promiseSuccessHandlers callbacks
    this.#_promiseSuccessHandlers.forEach((cb) =>
      // to mimic async behaviour
      setTimeout(() => cb(value), 0)
    );

    // after executing all, call finally
    if (this.#_finallyCallbackHandler) this.#_finallyCallbackHandler();
  }

  #_reject(reason) {
    // if already either resolve or reject has run in the past (promise is not pending) then return
    // as only one of then should run even if both called
    if (this.#isPromiseSettled()) return;

    if (this.#_promiseState === promiseStateEnum.REJECTED) return;

    // mark the promise state as rejected
    this.#_promiseState = promiseStateEnum.REJECTED;
    this.#_rejectReason = reason;
    this.#_hasResolveOrRejectAlreadyRun = true;

    // execute all the failure handlers callbacks
    this.#_promiseFailuresHandlers.forEach((failureHandler) =>
      // to mimic async behaviour
      setTimeout(() => failureHandler(reason), 0)
    );

    // after executing all, call finally
    if (this.#_finallyCallbackHandler) this.#_finallyCallbackHandler();
  }

  then(callBack) {
    if (this.#_promiseState === promiseStateEnum.FULFILLED) {
      // to mimic async behaviour
      setTimeout(() => callBack(this.#_resolveValue), 0);
    }
    // register the callback in then's _promiseSuccessHandlers array (will be called afterrwards when delay is over)
    else this.#_promiseSuccessHandlers.push(callBack);
    return this;
  }

  catch(callBack) {
    if (this.#_promiseState === promiseStateEnum.REJECTED) {
      // to mimic async behaviour
      setTimeout(() => callBack(this.#_rejectReason), 0);
    }

    // register this callback in failure callbacks _promiseFailuresHandlers array (will be called afterrwards when delay is over)
    else this.#_promiseFailuresHandlers.push(callBack);
    return this;
  }
  // todo: fix
  finally(callBack) {
    if (this.#_promiseState !== promiseStateEnum.PENDING) return;
    else this.#_finallyCallbackHandler = callBack;

    return this;
  }

  #isPromiseSettled() {
    return this.#_hasResolveOrRejectAlreadyRun;
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => reject(69), 5000);
  setTimeout(() => resolve(69), 5000);
  //   reject("Meri marzi krdia reject");
  //   resolve(69);
})
  .then((value) => {
    console.log("then ki value: ", value);
  })
  .catch((e) => {
    console.log("error in promise: ", e);
  })
  .finally(() => {
    console.log("This is inside the finally block");
  });

console.log(1);

new Promise((resolve, reject) => {
  setTimeout(() => reject(69), 5000);
  setTimeout(() => resolve(69), 5000);
  //   reject("Meri marzi krdia reject");
  //   resolve(69);
})
  .then((value) => {
    console.log("og then ki value: ", value);
  })
  .catch((e) => {
    console.log("error in og promise: ", e);
  })
  .finally(() => {
    console.log("og finally block");
  });

console.log(2);
