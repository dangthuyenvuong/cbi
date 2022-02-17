# stripe

## stripe là gì 
    stripe là nền tảng thanh toán trực tuyến, hiện stripe đang hỗ trợ hơn 18
    kiểu toán khác nhau, và chia làm 7 nhóm chính: 
    -   Cards
    -   Bank debits
    -   Bank redirects
    -   Bank transfers
    -   Buy now, pay later
    -   Vouchers
    -   Wallets

## cách stripe hoạt động 

    1   Khi người bán tạo 1 tài khoản stripe sẽ kết nối đến trang thanh toán của shop
    người bán 
    
    2   Người bán nhập thông tin thanh toán ở trang mua (vd: thông tin thẻ) 

    3   Thông tin sẽ được gửi và trang web thông qua phần mềm stripe sẽ kiểm tra
    rằng thanh toán hợp lệ trước khi chuyển tiền qua tài khoản người bán

    4   Người bán nhận được tiền, và thông tin xác nhận việc mua hàng sẽ được
    gửi cho cả người bán và người mua 


## Cách cài đặt stripe trong reactjs

    tham khảo từ trang chủ ở đây: https://stripe.com/docs/stripe-js/react 
    Hiện tại hướng dẫn trên ở trang chủ chỉ có cho component tổng quát nhất (đầy
    đủ 18 methods - paymentElementComponent), còn trong docs này sẽ đưa ra cách cài cho phương pháp dùng thẻ thanh toán
    
    Cài đặt: thư viện:

    ```bash
        yarn add --save @stripe/react-stripe-js @stripe/stripe-js
    ```
    
    Phải bọc comp <Elements> của thư việc stripe ở App để có Context cho các
    Element Form của stripe (CardElement, PaymentElement...) có thể sử dụng
    được. Lưu ý biến publishableKey sẽ được cấp khi tạo tài khoản trên stripe và
    phải để ở ngoài scope của App để tránh khi re-render thì nó lại tạo lại.
    
   ```tsx
const publishableKey = "pk_test_51Jex8JIub2RNmWLMzutVV6fT10rlNXOnjk1YxfjaPKsO1KciL5Fl26YvcK3X17rkgN2bwaB7BzP0f78tIjG3RhVV00yYDfcNnh"
const stripePromise = loadStripe(publishableKey);

const App: React.FC<CheckoutProp> = () => {

    return ( 

        <Elements stripe={stripePromise}>
            <App />
        </Elements>

    )
}
   
   ```
   
   Tiếp theo, có thể dùng Element có sẵn của stripe (Form thanh toán mẫu của
   stripe) hoặc có thể tích hợp nó và material UI với trick (sẽ để chi tiết ở phần lưu
   ý), ví dụ ở duới đa  tích hợp 3 element của
   Cardstripe(number, expired date, cvv) để tạo form theo design       
   
   ```tsx
   <form  className="flex-col gap-12 m-h-50" onSubmit={submit}>
       <PaymentCardGroup className="flex justify-between m-t-25" />
       <StripeTextFieldNumber />

       <div className="flex gap-30">
       <StripeTextFieldExpiry />    
       <StripeTextFieldCVC />
       </div>

       <Checkbox 
       icon={<IconEmptyCheckBox />} 
       checkedIcon={<IconCheckedCheckBox/>}
       > 
       Save for later
       </Checkbox>
   </form>

   ```
   
    Cài đặt hàm submit 
    khi đa có clientSecret từ việc gọi API(post/orders), lúc này phải tạo biến cardElement như bên dưới để stripe có thể gọi phương thức confirmCardPayment tiến hành xử lý (lưu ý lúc tạp cardElement
    
    Stripe sẽ tự động bắt xuống phần JSX return (...) để kiếm tra có element component của stripe, 
    
    Trong 1 form chỉ duy nhất được sử dụng 1 component element thanh toán của stripe (ở ví dụ ta thấy có tới 3 component, nhưng nó đều phục vụ cho kiểu thanh toán thông tin card - trường hợp ngoại lệ, để styling cho giống design), 

    Nếu sử dụng 2 phương thức thanh toán khác nhau trong 1 form  thì stripe sẽ báo lỗi, và nên dùng <PaymentElement /> (để xử lý 1 form có nhiều phương thức thanh toán khác nhau )
    
    ```tsx
    const stripe = useStripe();
    const elements = useElements();

    const submit =  async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) { return; }
        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {console.log("noCardFound"); return;}
         const {error, paymentIntent } = await stripe!.confirmCardPayment(
            clientSecret,
            { 
                payment_method: {
                    card: cardElement
                } 
            }
         );
        //console.log(paymentIntent);
        if (paymentIntent?.status === "succeeded") {
            console.log(`Payment successful`);
            history.push(generatePath(url.checkoutSuccessfully, { id: orderId }))
        }
        else alert(`Payment failed!`);
    }
    ```

## Lưu ý    
stripe không khuyến khích việc tích hợp các thư viện giao diện khác vào vì lý do an toàn thông tin , nếu muốn style form theo design thì phải dựa trên document của stripe

Link tham khảo cách gắn stripe vào materialUI: 
https://github.com/mui-org/material-ui/issues/16037#issuecomment-894593627


