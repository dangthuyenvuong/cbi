# Giới thiệu Redux

    - Redux :
        + Là một thư viện để quản lý state cho JS App.
        + Có thể dự đoán được các state.
        + Sử dụng kiến trúc uni-directional data flow (luồng của data chỉ đi theo 1 chiều).
        + Redux chỉ sử 1 store duy nhất để làm Single Source of Truth.
        + Redux state là Read-only. Muốn thay đổi state phải dispatch một action(JS object).
        + Những thay đổi của redux state được thực hiện bởi pure functions (reducer).
    - Redux middleware :
        + Cung cấp một tầng đứng giữa việc dispatch action và gửi lên reducer.
        + Thường sử dụng dùng trong việc logging, reporting, async API và routing...
    - Một số middleware của redux:
        + Redux Thunk
        + Redux Saga
        + Redux Logger.
        +...
    - Redux saga là một middleware của thư viện Redux. Nó dùng để quản lý các side-effects.

# Các thành phần

    - Các thuật ngữ cần phải nắm trong redux saga:
        + Effect : Là một javascript object chứa thông tin để saga middleware biết cần phải làm gì.
        + Task : Là một chương trình chạy ngầm, có thể có nhiều task chạy song song với nhau, khi nào chạy xong sẽ thông báo.
        + Blocking/Non-blocking call:
            -> Blocking call: Đợi thực hiện xong mới thực hiện lệnh tiếp theo.
            -> Non-blocking call: Không cần đợi thực hiện xong để chạy lệnh tiếp theo.
        + Watcher/worker: Theo dõi action để thực hiện một công việc yêu cầu của action đó.
    - Middleware API :
        + createSagaMiddleware():  Tạo ra saga middleware để đăng ký vào redux store.
    - Effect Creator:
        + TakeEvery(pattern,saga,...args): Chạy saga mỗi lần khi có action pattern được dispatch, dispatch bao nhiều lần sẽ chạy bấy nhiêu saga.
        + TakeLatest(pattern,saga,...args): Chạy saga nhưng khi có action pattern mới được dispatch, thì cái saga trước đó sẽ bị cancel.
        + TakeLeading(pattern,saga,...args): Chạy saga khi pattern được dispatch, những action tiếp theo sẽ bị cancel cho đến khi saga trước đó chạy xong.
        + Put(action): Dispatch một action từ saga.
        + Call(fn,...args): Gọi hàm fn và truyền tham số args vào hàm đó.
        + All([...effects]): Chạy tất cả các effects cùng một lúc.
        + Take(pattern) and fork(fn, ...args): Mô hình watcher/worker, đợi dispatch action pattern thì sẽ thực hiện một cái nhiệm vụ nào đó.
        + Retry(maxTries, delay, fn, ...args): Cố gắng gọi hàm fn nếu lỗi, sau mỗi delay (ms) và tối đa maxTries - 1 lần.
        + Select (state): Chạy một selector function để lấy dữ liệu từ state (tương tự useSelector của hook).
        + Delay(time): Dùng để trì hoãn quá trình thực thi trong saga.

# Cài đặt

        import { createStore, applyMiddleware } from 'redux'
        import createSagaMiddleware from 'redux-saga'


        import { rootSaga } from './sagas' // Nơi chứa các saga con, tương tự rootReducer.

        const sagaMiddleware = createSagaMiddleware()
        const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
        )
        sagaMiddleware.run(rootSaga) //Chạy rootSaga sau khi khai báo sagaMiddleware vào store.
# Quy chuẩn
