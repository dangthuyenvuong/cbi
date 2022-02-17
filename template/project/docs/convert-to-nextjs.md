# Convert to Nextjs

1. Không sử dụng hook từ react-router-dom thay vào đó sử dụng useURL để thay thế

    > `const { navigate, path, updateQuery, query, queryString, goBack } = useURL()`

    1. `navigate`: thay thế cho history.push

    2. `path`: url hiện tại

    3. `query`: query url dạng object

    4. `queryString`: query url dạng string

    5. `updateQuery`: update query url hiện tại

    6. `goBack`: quay trở về trang trước

2. Sử dụng `withAuth` hoặc `withNoAuth` để bảo vệ page khi có hoặc không có authen

3. Sử dụng thẻ atoms/Link thay cho Link của react-router-dom

